using Microsoft.EntityFrameworkCore;
using Cadbury.CremeEgg.Quiz.Data;
using Microsoft.AspNetCore.Mvc;
using AspNetCore.ReCaptcha;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.AspNetCore.Http;
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
        app.UseStaticFiles();

        app.MapPost("/api/submit", HandleSubmit);

        app.MapFallbackToFile("index.html");

        await app.Services.CreateScope().ServiceProvider.GetRequiredService<ApplicationDbContext>().Database.MigrateAsync();

        await app.RunAsync();
    }

    private static async Task<IResult> HandleSubmit(
            HttpContext context,
            [FromServices] ApplicationDbContext db,
            [FromServices] IReCaptchaService recaptcha,
            [FromBody] Entry entry)
    {
        var validation = await MiniValidator.TryValidateAsync(entry);
        if (!validation.IsValid)
        {
            return Results.ValidationProblem(validation.Errors);
        }
        var result = await recaptcha.VerifyAsync(entry.RecaptchaResponse);
        if (!result)
        {
            return Results.ValidationProblem(new Dictionary<string, string[]>() { { "g-recaptcha-response", new[] { "The g-recaptcha-response failed to validate." } } });
        }

        var existing = db.Entries.Any(x => x.Email == entry.Email);
        if (existing)
        {
            return Results.Conflict();
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
