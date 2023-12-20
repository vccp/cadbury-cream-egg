using Microsoft.EntityFrameworkCore;

namespace Cadbury.CremeEgg.Quiz.Data;

public class ApplicationDbContext : DbContext
{
    public DbSet<Entry> Entries { get; set; }
    public ApplicationDbContext(DbContextOptions options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.Entity<Entry>().Property(x => x.CreationsDate).HasDefaultValueSql("getutcdate()");
    }
}
