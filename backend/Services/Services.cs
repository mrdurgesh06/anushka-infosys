using AnushkaInfosys.DTOs;
using AnushkaInfosys.Interfaces;
using AnushkaInfosys.Models;
using System.Text.Json;

namespace AnushkaInfosys.Services;

public class CourseService : ICourseService
{
    private readonly ICourseRepository _repo;
    public CourseService(ICourseRepository repo) => _repo = repo;

    public async Task<IEnumerable<CourseDto>> GetAllCoursesAsync()
    {
        var courses = await _repo.GetAllAsync();
        return courses.Select(MapToDto);
    }

    public async Task<CourseDto?> GetCourseByIdAsync(int id)
    {
        var course = await _repo.GetByIdAsync(id);
        return course == null ? null : MapToDto(course);
    }

    public async Task<CourseDto> CreateCourseAsync(CreateCourseDto dto)
    {
        var course = new Course
        {
            Name = dto.Name,
            ShortName = dto.ShortName,
            Description = dto.Description,
            Duration = dto.Duration,
            Eligibility = dto.Eligibility,
            Syllabus = JsonSerializer.Serialize(dto.Syllabus),
            Outcomes = JsonSerializer.Serialize(dto.Outcomes),
            Fee = dto.Fee
        };
        var created = await _repo.CreateAsync(course);
        return MapToDto(created);
    }

    private static CourseDto MapToDto(Course c) => new()
    {
        Id = c.Id,
        Name = c.Name,
        ShortName = c.ShortName,
        Description = c.Description,
        Duration = c.Duration,
        Eligibility = c.Eligibility,
        Fee = c.Fee,
        Syllabus = JsonSerializer.Deserialize<List<string>>(c.Syllabus) ?? new(),
        Outcomes = JsonSerializer.Deserialize<List<string>>(c.Outcomes) ?? new()
    };
}

public class TestimonialService : ITestimonialService
{
    private readonly ITestimonialRepository _repo;
    public TestimonialService(ITestimonialRepository repo) => _repo = repo;

    public async Task<IEnumerable<TestimonialDto>> GetAllTestimonialsAsync()
    {
        var items = await _repo.GetAllActiveAsync();
        return items.Select(t => new TestimonialDto
        {
            Id = t.Id,
            StudentName = t.StudentName,
            Course = t.Course,
            Review = t.Review,
            Rating = t.Rating,
            PhotoUrl = t.PhotoUrl,
            CompanyPlaced = t.CompanyPlaced
        });
    }

    public async Task<TestimonialDto> CreateTestimonialAsync(CreateTestimonialDto dto)
    {
        var testimonial = new Testimonial
        {
            StudentName = dto.StudentName,
            Course = dto.Course,
            Review = dto.Review,
            Rating = dto.Rating,
            PhotoUrl = dto.PhotoUrl,
            CompanyPlaced = dto.CompanyPlaced
        };
        var created = await _repo.CreateAsync(testimonial);
        return new TestimonialDto
        {
            Id = created.Id,
            StudentName = created.StudentName,
            Course = created.Course,
            Review = created.Review,
            Rating = created.Rating,
            PhotoUrl = created.PhotoUrl,
            CompanyPlaced = created.CompanyPlaced
        };
    }
}

public class ContactEnquiryService : IContactEnquiryService
{
    private readonly IContactEnquiryRepository _repo;
    public ContactEnquiryService(IContactEnquiryRepository repo) => _repo = repo;

    public async Task<bool> SubmitEnquiryAsync(ContactEnquiryDto dto)
    {
        var enquiry = new ContactEnquiry
        {
            Name = dto.Name,
            Phone = dto.Phone,
            Email = dto.Email,
            Course = dto.Course,
            Message = dto.Message
        };
        await _repo.CreateAsync(enquiry);
        return true;
    }

    public async Task<IEnumerable<ContactEnquiry>> GetAllEnquiriesAsync() =>
        await _repo.GetAllAsync();
}
