using System.ComponentModel.DataAnnotations;

namespace VolunMate_web.Models.DTOs
{
    public class SignupDTO
    {
        [Required]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty; // Hashed Password

        [Required]
        public string Role { get; set; } 
    }
}
