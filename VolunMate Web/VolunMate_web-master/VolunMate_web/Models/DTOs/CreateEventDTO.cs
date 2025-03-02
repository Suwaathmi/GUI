namespace VolunMate_web.DTOs
{
    public class CreateEventDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public int OrganizerId { get; set; }  // Reference to the user who organizes the event
    }

    public class UpdateEventDTO
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
    }

    public class EventResponseDTO
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateTime Date { get; set; }
        public string Location { get; set; } = string.Empty;
        public int OrganizerId { get; set; }
        public string OrganizerName { get; set; } = string.Empty;
    }
}
