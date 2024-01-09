using System.ComponentModel.DataAnnotations;
using System.Linq.Expressions;
using Cadbury.CremeEgg.Quiz.Data;

public class UniqueByAttribute<T>(params string[] properties) : ValidationAttribute where T : class
{
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var db = validationContext.GetRequiredService<ApplicationDbContext>();
        var instance = (T)validationContext.ObjectInstance;

        var filter = GenerateEntityFilter(properties, instance);

        var existing = db.Set<T>().Any(filter);
        if (existing)
        {
            return new ValidationResult($"This email address has already registered.", new[] { validationContext.MemberName! });
        }

        return ValidationResult.Success;
    }

    private static Func<T, bool> GenerateEntityFilter(string[] properties, T instance)
    {
        var filters = properties.Select(x => new
        {
            ColumnName = x,
            Value = typeof(T).GetProperty(x)!.GetValue(instance)
        }).ToList();
        var parameter = Expression.Parameter(typeof(T), "record");
        Expression? filterExpression = null;
        foreach (var filter in filters)
        {
            var property = Expression.Property(parameter, filter.ColumnName);
            var constant = Expression.Constant(filter.Value);
            Expression comparison;

            comparison = Expression.Equal(property, Expression.Constant(filter.Value));

            filterExpression = filterExpression == null
                ? comparison
                : Expression.And(filterExpression, comparison);
        }
        var lambda = Expression.Lambda<Func<T, bool>>(filterExpression!, parameter);
        var func = lambda.Compile();
        return func;
    }

    public override bool RequiresValidationContext => true;
}