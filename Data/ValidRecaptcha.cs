using System.ComponentModel.DataAnnotations;
using AspNetCore.ReCaptcha;

public class ValidRecaptcha : ValidationAttribute {
    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        var recaptcha = validationContext.GetRequiredService<IReCaptchaService>();
        var result = recaptcha.VerifyAsync(value as string).Result;
        if (!result)
        {
            return new ValidationResult($"The {validationContext.DisplayName} failed to validate.", new[] { validationContext.MemberName! });
        }
        return base.IsValid(value, validationContext);
    }
    public override bool RequiresValidationContext => true;
}
