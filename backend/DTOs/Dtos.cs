using System.ComponentModel.DataAnnotations;

namespace AnushkaInfosys.DTOs;

// Course DTOs
public class CourseDto
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string ShortName { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Duration { get; set; } = string.Empty;
    public string Eligibility { get; set; } = string.Empty;
    public List<string> Syllabus { get; set; } = new();
    public List<string> Outcomes { get; set; } = new();
    public decimal Fee { get; set; }
}

public class CreateCourseDto
{
    [Required] public string Name { get; set; } = string.Empty;
    [Required] public string ShortName { get; set; } = string.Empty;
    [Required] public string Description { get; set; } = string.Empty;
    [Required] public string Duration { get; set; } = string.Empty;
    [Required] public string Eligibility { get; set; } = string.Empty;
    public List<string> Syllabus { get; set; } = new();
    public List<string> Outcomes { get; set; } = new();
    public decimal Fee { get; set; }
}

// Testimonial DTOs
public class TestimonialDto
{
    public int Id { get; set; }
    public string StudentName { get; set; } = string.Empty;
    public string Course { get; set; } = string.Empty;
    public string Review { get; set; } = string.Empty;
    public int Rating { get; set; }
    public string? PhotoUrl { get; set; }
    public string? CompanyPlaced { get; set; }
}

public class CreateTestimonialDto
{
    [Required] public string StudentName { get; set; } = string.Empty;
    [Required] public string Course { get; set; } = string.Empty;
    [Required] public string Review { get; set; } = string.Empty;
    [Range(1, 5)] public int Rating { get; set; }
    public string? PhotoUrl { get; set; }
    public string? CompanyPlaced { get; set; }
}

// Contact DTOs
public class ContactEnquiryDto
{
    [Required, MinLength(2)] public string Name { get; set; } = string.Empty;
    [Required, Phone] public string Phone { get; set; } = string.Empty;
    [Required, EmailAddress] public string Email { get; set; } = string.Empty;
    [Required] public string Course { get; set; } = string.Empty;
    [Required, MinLength(10)] public string Message { get; set; } = string.Empty;
}

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; } = string.Empty;
    public T? Data { get; set; }

    public static ApiResponse<T> Ok(T data, string message = "Success") =>
        new() { Success = true, Message = message, Data = data };

    public static ApiResponse<T> Fail(string message) =>
        new() { Success = false, Message = message };
}
