using Microsoft.EntityFrameworkCore;
using Cadbury.CremeEgg.Quiz.Data;
using Microsoft.AspNetCore.Mvc;
using AspNetCore.ReCaptcha;
using MiniValidation;

namespace Cadbury.CremeEgg.Quiz;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
        {
            options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
        });
        builder.Services.AddReCaptcha(builder.Configuration.GetSection("ReCaptcha"));
        builder.Services.AddResponseCompression(x =>
        {
            x.EnableForHttps = true;
        });
        builder.Services.AddResponseCaching();
        
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddOpenApiDocument();

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
        }
        else
        {
            // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
            app.UseHsts();
        }

        app.UseHttpsRedirection();
        app.UseResponseCompression();
        app.UseResponseCaching();
        app.UseStaticFiles(new StaticFileOptions
        {
            OnPrepareResponse = ctx =>
            {
                ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=604800");
            }
        });

        app.MapPost("/api/submit", HandleSubmit);

        app.MapFallbackToFile("index.html");

        await app.Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.MigrateAsync();

        await app.RunAsync();
    }

    private static async Task<IResult> HandleSubmit(
            HttpContext context,
            [FromServices] ApplicationDbContext db,
            [FromBody] ValidatedEntry entry)
    {
        entry.Market = context.Request.Host.Host.EndsWith(".ie", StringComparison.InvariantCultureIgnoreCase) ? 2 : 1; // Horrible, but it works.

        var validation = await MiniValidator.TryValidateAsync(entry, context.RequestServices);
        if (!validation.IsValid)
        {
            return Results.ValidationProblem(validation.Errors);
        }

        try
        {
            await db.Entries.AddAsync(entry);
            await db.SaveChangesAsync();
            return Results.Created();
        }
        catch
        {
            return Results.StatusCode(StatusCodes.Status500InternalServerError);
        }

    }
}
