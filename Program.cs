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
        builder.Services.AddHttpContextAccessor();
        builder.Services.AddTransient<IMarketIdentifier, DomainTldMarketIdentifier>();
        builder.Services.AddTransient(typeof(IRepository<>), typeof(EntityRepository<>));

        builder.Services.AddEndpointsApiExplorer();
        #if DEBUG
        builder.Services.AddOpenApiDocument();
        #endif

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
                if (app.Environment.IsProduction())
                {
                    ctx.Context.Response.Headers.Append("Cache-Control", "public,max-age=604800");
                }
            }
        });

        app.MapEntity<Entry>();

        app.MapFallbackToFile("index.html");

        await app.Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.MigrateAsync();

        await app.RunAsync();
    }

}

public static class WebApplicationSubmissionExtensions
{
    public static RouteHandlerBuilder MapEntity<T>(this WebApplication app, string? path = null) where T : EntityBase
    {
        // Get
        // PATCH
        // DELETE
        return app.MapPost(path ?? $"/api/{typeof(T).Name}", HandleSubmit<T>);
    }
    private static async Task<IResult> HandleSubmit<T>(
            HttpContext context,
            [FromServices] IMarketIdentifier market,
            [FromServices] IRepository<T> db,
            [FromBody] T entry) where T : EntityBase
    {
        entry.Market = market.GetMarket();

        var (isValid, errors) = await MiniValidator.TryValidateAsync(entry, context.RequestServices, true);
        if (!isValid)
        {
            return Results.ValidationProblem(errors);
        }

        await db.AddAsync(entry);
        return Results.Created();

    }
}