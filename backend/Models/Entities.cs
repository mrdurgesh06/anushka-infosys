namespace AnushkaInfosys.Models;

public class Course
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ShortName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string Eligibility { get; set; } = string.Empty;
    public string Syllabus { get; set; } = string.Empty; // JSON array stored as string
    public string Outcomes { get; set; } = string.Empty; // JSON array stored as string
    public decimal Fee { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class Testimonial
{
    public int Id { get; set; }
    public string StudentName { get; set; } = string.Empty;
    public string Course { get; set; } = string.Empty;
    public string Review { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string? PhotoUrl { get; set; }
    public string? CompanyPlaced { get; set; }
    public bool IsActive { get; set; } = true;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}

public class ContactEnquiry
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Course { get; set; } = string.Empty;
    public string Message { get; set; } = string.Empty;
    public bool IsRead { get; set; } = false;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
