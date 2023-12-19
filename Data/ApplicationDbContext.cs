using Microsoft.EntityFrameworkCore;

namespace Cadbury.CremeEgg.Quiz.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {

    }
}
