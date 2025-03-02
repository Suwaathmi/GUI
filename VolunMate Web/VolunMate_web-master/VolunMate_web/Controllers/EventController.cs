using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using VolunMate_web.DTOs;
using VolunMate_web.Models;
using VolunMate_web.Models.DTOs;

namespace VolunMate_web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventController : ControllerBase
    {
        private readonly VoluntDbContext _context;

        public EventController(VoluntDbContext context)
        {
            _context = context;
        }

        // GET: api/Event (Get all events)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventResponseDTO>>> GetEvents()
        {
            var events = await _context.Events.Include(e => e.Organizer).ToListAsync();
            return events.Select(e => new EventResponseDTO
            {
                Id = e.Id,
                Title = e.Title,
                Description = e.Description,
                Date = e.Date,
                Location = e.Location,
                OrganizerId = e.OrganizerId,
                OrganizerName = e.Organizer != null ? e.Organizer.Name : "Unknown"
            }).ToList();
        }

        // GET: api/Event/{id} (Get event by ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<EventResponseDTO>> GetEvent(int id)
        {
            var e = await _context.Events.Include(e => e.Organizer).FirstOrDefaultAsync(e => e.Id == id);

            if (e == null)
                return NotFound("Event not found.");

            return new EventResponseDTO
            {
                Id = e.Id,
                Title = e.Title,
                Description = e.Description,
                Date = e.Date,
                Location = e.Location,
                OrganizerId = e.OrganizerId,
                OrganizerName = e.Organizer != null ? e.Organizer.Name : "Unknown"
            };
        }

        // POST: api/Event (Create a new event)
        [HttpPost]
        public async Task<ActionResult<EventResponseDTO>> CreateEvent(CreateEventDTO createEventDto)
        {
            var user = await _context.Users.FindAsync(createEventDto.OrganizerId);
            if (user == null)
                return BadRequest("Organizer not found.");

            var newEvent = new Event
            {
                Title = createEventDto.Title,
                Description = createEventDto.Description,
                Date = createEventDto.Date,
                Location = createEventDto.Location,
                OrganizerId = createEventDto.OrganizerId,
                Organizer = user
            };

            _context.Events.Add(newEvent);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetEvent), new { id = newEvent.Id }, new EventResponseDTO
            {
                Id = newEvent.Id,
                Title = newEvent.Title,
                Description = newEvent.Description,
                Date = newEvent.Date,
                Location = newEvent.Location,
                OrganizerId = newEvent.OrganizerId,
                OrganizerName = user.Name
            });
        }

        // PUT: api/Event/{id} (Update an event)
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEvent(int id, UpdateEventDTO updateEventDto)
        {
            var eventToUpdate = await _context.Events.FindAsync(id);
            if (eventToUpdate == null)
                return NotFound("Event not found.");

            eventToUpdate.Title = updateEventDto.Title;
            eventToUpdate.Description = updateEventDto.Description;
            eventToUpdate.Date = updateEventDto.Date;
            eventToUpdate.Location = updateEventDto.Location;

            await _context.SaveChangesAsync();
            return Ok("Event updated successfully.");
        }

        // DELETE: api/Event/{id} (Delete an event)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvent(int id)
        {
            var eventToDelete = await _context.Events.FindAsync(id);
            if (eventToDelete == null)
                return NotFound("Event not found.");

            _context.Events.Remove(eventToDelete);
            await _context.SaveChangesAsync();

            return Ok("Event deleted successfully.");
        }

        [HttpPost("Register")]
        public async Task<IActionResult> RegisterForEvent([FromBody] EventRegistrationDto request)
        {
            // Validate the event exists
            var eventExists = await _context.Events.AnyAsync(e => e.Id == request.EventId);
            if (!eventExists)
                return NotFound(new { message = "Event not found" });

            // Validate the volunteer exists
            var volunteerExists = await _context.Users.AnyAsync(u => u.Id == request.VolunteerId);
            if (!volunteerExists)
                return NotFound(new { message = "Volunteer not found" });

            // Check if the volunteer is already registered for the event
            var alreadyRegistered = await _context.VolunteerRegistrations
                .AnyAsync(r => r.EventId == request.EventId && r.VolunteerId == request.VolunteerId);

            if (alreadyRegistered)
                return BadRequest(new { message = "Volunteer is already registered for this event" });

            // Register the volunteer
            var registration = new VolunteerRegistration
            {
                EventId = request.EventId,
                VolunteerId = request.VolunteerId
            };

            _context.VolunteerRegistrations.Add(registration);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Successfully registered for the event" });
        }

        [HttpGet("registered")]
        public async Task<IActionResult> GetRegisteredEvents([FromQuery] string userRole, [FromQuery] int userId)
        {
            if (string.IsNullOrEmpty(userRole))
            {
                return BadRequest("User role is required.");
            }

            List<EventDto> registeredEvents;

            if (userRole.ToLower() != "volunteer")
            {
                // Admins and other roles see all registered event details
                registeredEvents = await _context.VolunteerRegistrations
                    .Include(vr => vr.Event)
                    .Select(vr => new EventDto
                    {
                        Title = vr.Event.Title,
                        Description = vr.Event.Description,
                        Date = vr.Event.Date,
                        Location = vr.Event.Location,
                        Name=vr.Volunteer.Name
                    })
                    .Distinct()
                    .ToListAsync();
            }
            else
            {
                // Volunteers only see events they registered for
                registeredEvents = await _context.VolunteerRegistrations
                    .Where(vr => vr.VolunteerId == userId)
                    .Include(vr => vr.Event)
                    .Select(vr => new EventDto
                    {
                        Title = vr.Event.Title,
                        Description = vr.Event.Description,
                        Date = vr.Event.Date,
                        Location = vr.Event.Location,
                        Name = vr.Volunteer.Name
                    })
                    .Distinct()
                    .ToListAsync();
            }

            return Ok(registeredEvents);
        }
    }
}

