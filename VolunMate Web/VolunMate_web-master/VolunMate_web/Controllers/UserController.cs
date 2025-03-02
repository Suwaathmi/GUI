using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VolunMate_web.Models;
using VolunMate_web.Models.DTOs;

namespace VolunMate_web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly VoluntDbContext _context;

        public UserController(VoluntDbContext context)
        {
            _context = context;
        }

        [HttpGet("{id}")]
        public IActionResult GetUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound("User not found.");

            return Ok(user);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] UpdateUserDTO updateUserDto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound("User not found.");

            user.Name = updateUserDto.Name;
            user.Email = updateUserDto.Email;
            user.Role = updateUserDto.Role;

            _context.SaveChanges();
            return Ok(user);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.FirstOrDefault(u => u.Id == id);
            if (user == null)
                return NotFound("User not found.");

            _context.Users.Remove(user);
            return Ok("User deleted successfully.");
        }
    }
}
