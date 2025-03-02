using System.ComponentModel.DataAnnotations;

namespace VolunMate_web.Models.DTOs
{
    public class LoginDTO
    {
        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty; // Hashed Password
    }
}
