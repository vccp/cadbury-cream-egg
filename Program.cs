using Microsoft.EntityFrameworkCore;
using Cadbury.CremeEgg.Quiz.Data;
using AspNetCore.ReCaptcha;

namespace Cadbury.CremeEgg.Quiz;

public static class CustomEnvironments
{
    public static readonly string Local = "Local";
}
public static class WorkingEnvironmentExtensions
{
    public static bool IsLocal(this IHostEnvironment hostEnvironment)
    {
        ArgumentNullException.ThrowIfNull(hostEnvironment);

        return hostEnvironment.IsEnvironment(CustomEnvironments.Local);
    }
}
public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
        {
            if (!builder.Environment.IsLocal())
            {
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
                return;
            }
#if DEBUG
            options.UseSqlite("local.sqlite3");
#endif
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

#if DEBUG
        builder.Services.AddEndpointsApiExplorer();
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

        app.MapEntityApi<Entry>();

        app.MapFallbackToFile("index.html");

        await app.MigrateContext<ApplicationDbContext>();

        await app.RunAsync();
    }

}
