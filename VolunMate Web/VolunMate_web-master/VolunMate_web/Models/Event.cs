namespace VolunMate_web.Models
{
    public class Event
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public int OrganizerId { get; set; }  // Foreign Key
        public User? Organizer { get; set; }
    }
}
