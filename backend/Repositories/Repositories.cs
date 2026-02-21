using AnushkaInfosys.Data;
using AnushkaInfosys.Interfaces;
using AnushkaInfosys.Models;
using Microsoft.EntityFrameworkCore;

namespace AnushkaInfosys.Repositories;

public class CourseRepository : ICourseRepository
{
    private readonly AppDbContext _context;
    public CourseRepository(AppDbContext context) => _context = context;

    public async Task<IEnumerable<Course>> GetAllAsync() =>
        await _context.Courses.Where(c => c.IsActive).OrderBy(c => c.Id).ToListAsync();

    public async Task<Course?> GetByIdAsync(int id) =>
        await _context.Courses.FirstOrDefaultAsync(c => c.Id == id && c.IsActive);

    public async Task<Course> CreateAsync(Course course)
    {
        _context.Courses.Add(course);
        await _context.SaveChangesAsync();
        return course;
    }

    public async Task<bool> UpdateAsync(Course course)
    {
        _context.Courses.Update(course);
        return await _context.SaveChangesAsync() > 0;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var course = await GetByIdAsync(id);
        if (course == null) return false;
        course.IsActive = false;
        return await _context.SaveChangesAsync() > 0;
    }
}

public class TestimonialRepository : ITestimonialRepository
{
    private readonly AppDbContext _context;
    public TestimonialRepository(AppDbContext context) => _context = context;

    public async Task<IEnumerable<Testimonial>> GetAllActiveAsync() =>
        await _context.Testimonials.Where(t => t.IsActive).OrderByDescending(t => t.CreatedAt).ToListAsync();

    public async Task<Testimonial?> GetByIdAsync(int id) =>
        await _context.Testimonials.FirstOrDefaultAsync(t => t.Id == id);

    public async Task<Testimonial> CreateAsync(Testimonial testimonial)
    {
        _context.Testimonials.Add(testimonial);
        await _context.SaveChangesAsync();
        return testimonial;
    }
}

public class ContactEnquiryRepository : IContactEnquiryRepository
{
    private readonly AppDbContext _context;
    public ContactEnquiryRepository(AppDbContext context) => _context = context;

    public async Task<ContactEnquiry> CreateAsync(ContactEnquiry enquiry)
    {
        _context.ContactEnquiries.Add(enquiry);
        await _context.SaveChangesAsync();
        return enquiry;
    }

    public async Task<IEnumerable<ContactEnquiry>> GetAllAsync() =>
        await _context.ContactEnquiries.OrderByDescending(c => c.CreatedAt).ToListAsync();
}
