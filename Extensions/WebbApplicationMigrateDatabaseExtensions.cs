using Microsoft.EntityFrameworkCore;

namespace Cadbury.CremeEgg.Quiz;

public static class WebbApplicationMigrateDatabaseExtensions
{
    public static async Task MigrateContext<T>(this WebApplication app) where T : DbContext
    {
        using var scope = app.Services.CreateScope();
        await scope.ServiceProvider.GetRequiredService<T>().Database.MigrateAsync();
    }
}
