namespace Cadbury.CremeEgg.Quiz;

public interface IRepository<T> where T : EntityBase {
    public Task AddAsync(T entity);
}
