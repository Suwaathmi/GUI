namespace VolunMate_web.Models
{
    public class VolunteerRegistration
    {
        public int Id { get; set; }
        public int EventId { get; set; }
        public Event? Event { get; set; }
        public int VolunteerId { get; set; }
        public User? Volunteer { get; set; }
    }
}
