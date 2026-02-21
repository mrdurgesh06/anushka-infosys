using AnushkaInfosys.Models;

namespace AnushkaInfosys.Interfaces;

public interface ICourseRepository
{
    Task<IEnumerable<Course>> GetAllAsync();
    Task<Course?> GetByIdAsync(int id);
    Task<Course> CreateAsync(Course course);
    Task<bool> UpdateAsync(Course course);
    Task<bool> DeleteAsync(int id);
}

public interface ITestimonialRepository
{
    Task<IEnumerable<Testimonial>> GetAllActiveAsync();
    Task<Testimonial?> GetByIdAsync(int id);
    Task<Testimonial> CreateAsync(Testimonial testimonial);
}

public interface IContactEnquiryRepository
{
    Task<ContactEnquiry> CreateAsync(ContactEnquiry enquiry);
    Task<IEnumerable<ContactEnquiry>> GetAllAsync();
}

// Service Interfaces
public interface ICourseService
{
    Task<IEnumerable<DTOs.CourseDto>> GetAllCoursesAsync();
    Task<DTOs.CourseDto?> GetCourseByIdAsync(int id);
    Task<DTOs.CourseDto> CreateCourseAsync(DTOs.CreateCourseDto dto);
}

public interface ITestimonialService
{
    Task<IEnumerable<DTOs.TestimonialDto>> GetAllTestimonialsAsync();
    Task<DTOs.TestimonialDto> CreateTestimonialAsync(DTOs.CreateTestimonialDto dto);
}

public interface IContactEnquiryService
{
    Task<bool> SubmitEnquiryAsync(DTOs.ContactEnquiryDto dto);
    Task<IEnumerable<ContactEnquiry>> GetAllEnquiriesAsync();
}
