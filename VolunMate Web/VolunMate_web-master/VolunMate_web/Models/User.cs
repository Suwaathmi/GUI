using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VolunMate_web.Models
{
    public class User
    {

        public int Id { get; set; }

        [Required]
        public string Name { get; set; } = string.Empty;

        [Required, EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string PasswordHash { get; set; } = string.Empty; // Hashed Password

        [Required]
        public string Role { get; set; } = "Volunteer"; // Default role is 'Volunteer'

    }
}
