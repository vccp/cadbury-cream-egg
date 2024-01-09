using Microsoft.AspNetCore.Mvc;
using MiniValidation;

namespace Cadbury.CremeEgg.Quiz;

public static class WebApplicationSubmissionExtensions
{
    public static RouteHandlerBuilder MapEntityApi<T>(this WebApplication app, string? path = null) where T : EntityBase
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