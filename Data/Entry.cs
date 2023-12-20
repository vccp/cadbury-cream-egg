using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;

[Index(nameof(OptIn))]
[Index(nameof(Answers))]
[Index(nameof(Market), nameof(Email))]
[Index(nameof(Market))]
public class Entry
{
    [Key, JsonIgnore]
    public int Id { get; set; }

    [NotMapped, Required]
    public string RecaptchaResponse { get; set; }

    [Required, EmailAddress, MaxLength(128)]
    public string Email { get; set; }
    [Required, MaxLength(64)]
    public string FirstName { get; set; }

    [Required, MaxLength(64)]
    public string LastName { get; set; }

    [Required, MinLength(5), MaxLength(5), RegularExpression("[0-9]{5}")]
    public string Answers { get; set; }

    [Required, AllowedValues(true)]
    public bool TermsAndConditions { get; set; }
    public bool OptIn { get; set; }

    [JsonIgnore]
    public DateTimeOffset CreationsDate { get; set; }
    [JsonIgnore]
    public int Market { get; set; }
}
