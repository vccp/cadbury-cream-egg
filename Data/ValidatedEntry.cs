using System.ComponentModel.DataAnnotations;
using AspNetCore.ReCaptcha;
using Cadbury.CremeEgg.Quiz.Data;
using MiniValidation;

public class ValidatedEntry : Entry, IAsyncValidatableObject
{
    public async Task<IEnumerable<ValidationResult>> ValidateAsync(ValidationContext validationContext)
    {
        await Task.Yield();

        List<ValidationResult>? errors = null;
        var recaptcha = validationContext.GetRequiredService<IReCaptchaService>();
        var result = await recaptcha.VerifyAsync(RecaptchaResponse);
        if (!result)
        {
            errors ??= [];
            errors.Add(new ValidationResult($"The {nameof(RecaptchaResponse)} failed to validate.", new[] { nameof(RecaptchaResponse) }));
            return errors;
        }

        
        var db = validationContext.GetRequiredService<ApplicationDbContext>();
        var existing = db.Entries.Any(x => x.Market == Market && x.Email == Email);
        if (existing)
        {
            errors ??= [];
            errors.Add(new ValidationResult($"This email address has already registered.", new[] { nameof(Email) }));
        }

        return errors ?? Enumerable.Empty<ValidationResult>();
    }
}