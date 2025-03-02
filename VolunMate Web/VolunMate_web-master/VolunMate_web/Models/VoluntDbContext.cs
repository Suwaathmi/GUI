using Microsoft.EntityFrameworkCore;

namespace VolunMate_web.Models
{
    public class VoluntDbContext : DbContext
    {
        public VoluntDbContext(DbContextOptions<VoluntDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<VolunteerRegistration> VolunteerRegistrations { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Event -> Organizer (User)
            modelBuilder.Entity<Event>()
                .HasOne(e => e.Organizer)
                .WithMany()
                .HasForeignKey(e => e.OrganizerId)
                .OnDelete(DeleteBehavior.NoAction);  // Prevent cascade delete

            // VolunteerRegistration -> Volunteer (User)
            modelBuilder.Entity<VolunteerRegistration>()
                .HasOne(vr => vr.Volunteer)
                .WithMany()
                .HasForeignKey(vr => vr.VolunteerId)
                .OnDelete(DeleteBehavior.NoAction); // Prevent cascade delete

            // VolunteerRegistration -> Event
            modelBuilder.Entity<VolunteerRegistration>()
                .HasOne(vr => vr.Event)
                .WithMany()
                .HasForeignKey(vr => vr.EventId)
                .OnDelete(DeleteBehavior.NoAction); // Prevent cascade delete
        }
    }
}
