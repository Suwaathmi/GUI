using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;
using VolunMate_web.Models;
using VolunMate_web.Models.DTOs;

namespace VolunMate_web.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly VoluntDbContext _context;

        public AuthController(VoluntDbContext context)
        {
            _context = context;
        }

        // Helper method to hash passwords
        private string HashPassword(string password)
        {
            using (SHA256 sha256 = SHA256.Create())
            {
                byte[] bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
                return Convert.ToBase64String(bytes);
            }
        }

        // POST: api/auth/signup (Register a new user)
        [HttpPost("signup")]
        public async Task<IActionResult> Signup([FromBody] SignupDTO userDto)
        {
            if (await _context.Users.AnyAsync(u => u.Email == userDto.Email))
                return BadRequest(new { message = "Email already registered" });

            // ✅ Convert SignupDTO to User entity
            var user = new User
            {
                Name = userDto.Name,
                Email = userDto.Email,
                PasswordHash = HashPassword(userDto.PasswordHash), // Hash password before storing
                Role = userDto.Role ?? "Volunteer" // Default role if not provided
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(new { message = "User registered successfully" });
        }


        // POST: api/auth/login (User login)
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDTO user)
        {
            var existingUser = await _context.Users.FirstOrDefaultAsync(u => u.Email == user.Email);
            if (existingUser == null || existingUser.PasswordHash != HashPassword(user.PasswordHash))
                return Unauthorized(new { message = "Invalid email or password" });

            // Store user session
            HttpContext.Session.SetInt32("UserId", existingUser.Id);
            HttpContext.Session.SetString("UserRole", existingUser.Role);
            return Ok(new { message = "Login successful", role = existingUser.Role,name=existingUser.Name,id=existingUser.Id });
        }

        // POST: api/auth/logout (User logout)
        [HttpPost("logout")]
        public IActionResult Logout()
        {
            HttpContext.Session.Clear(); // Clear session data
            return Ok(new { message = "Logout successful" });
        }
    }
}
