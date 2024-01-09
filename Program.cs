using Microsoft.EntityFrameworkCore;
using Cadbury.CremeEgg.Quiz.Data;
using AspNetCore.ReCaptcha;
using System.Runtime.CompilerServices;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace Cadbury.CremeEgg.Quiz;

// public class MarketOption {
//     public string Name { get; set; }
//     public List<Uri> Domains { get; set; }
//     public List<PhaseOption> Phases { get; set; }
//     public Uri RedirectionUri { get; set; }
// }

// public class PhaseOption {
//     public string Name { get; set; }
//     public DateTimeOffset EndDate { get; set; }

//     public bool RedirectAllRequests { get; set; }

// }
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
        //builder.Services.AddTransient<Market>(sp => sp.GetRequiredService<IMarketIdentifier>().GetMarket());
        builder.Services.AddTransient(typeof(IRepository<>), typeof(EntityRepository<>));
        // builder.Services.AddOptions<List<MarketOption>>().BindConfiguration("Markets");
        // builder.Services.AddTransient<MarketOption>((x) => {
        //     var allOptions = x.GetRequiredService<List<MarketOption>>();
        //     var market = x.GetRequiredService<IMarketIdentifier>().GetMarket();
        //     return allOptions.Single(x => x.Name == market.ToString());
        // });

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

        var live = DateTimeOffset.Parse("2023-02-10");

        //app.Run(CheckPhase);

        app.MapEntityApi<Entry>();

        app.MapFallbackToFile("index.html");

        await app.MigrateContext<ApplicationDbContext>();

        await app.RunAsync();
    }

    // private static async Task CheckPhase(HttpContext context)
    // {
    //     var options = context.RequestServices.GetRequiredService<MarketOption>();

    //     var activePhase = options.Phases.Where(x => x.EndDate < DateTimeOffset.UtcNow).OrderBy(x => x.EndDate).First();

    //     if (activePhase.RedirectAllRequests) {
    //         context.Response.Redirect(options.RedirectionUri.ToString(), false, false);
    //     }
    // }
}
