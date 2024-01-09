using Cadbury.CremeEgg.Quiz.Data;

namespace Cadbury.CremeEgg.Quiz;

public class EntityRepository<T> : IRepository<T> where T : EntityBase  {
    private readonly ApplicationDbContext db;

    public EntityRepository(ApplicationDbContext db)
    {
        this.db = db;
    }

    public async Task AddAsync(T entity) {
        await db.Set<T>().AddAsync(entity);
        await db.SaveChangesAsync();
    }
}
