using AnushkaInfosys.DTOs;
using AnushkaInfosys.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AnushkaInfosys.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CoursesController : ControllerBase
{
    private readonly ICourseService _service;
    public CoursesController(ICourseService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var courses = await _service.GetAllCoursesAsync();
        return Ok(ApiResponse<IEnumerable<CourseDto>>.Ok(courses));
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var course = await _service.GetCourseByIdAsync(id);
        if (course == null) return NotFound(ApiResponse<CourseDto>.Fail("Course not found"));
        return Ok(ApiResponse<CourseDto>.Ok(course));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateCourseDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var course = await _service.CreateCourseAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = course.Id },
            ApiResponse<CourseDto>.Ok(course, "Course created successfully"));
    }
}

[ApiController]
[Route("api/[controller]")]
public class TestimonialsController : ControllerBase
{
    private readonly ITestimonialService _service;
    public TestimonialsController(ITestimonialService service) => _service = service;

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var items = await _service.GetAllTestimonialsAsync();
        return Ok(ApiResponse<IEnumerable<TestimonialDto>>.Ok(items));
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateTestimonialDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        var testimonial = await _service.CreateTestimonialAsync(dto);
        return Ok(ApiResponse<TestimonialDto>.Ok(testimonial, "Testimonial added successfully"));
    }
}

[ApiController]
[Route("api/[controller]")]
public class ContactController : ControllerBase
{
    private readonly IContactEnquiryService _service;
    public ContactController(IContactEnquiryService service) => _service = service;

    [HttpPost]
    public async Task<IActionResult> Submit([FromBody] ContactEnquiryDto dto)
    {
        if (!ModelState.IsValid) return BadRequest(ModelState);
        await _service.SubmitEnquiryAsync(dto);
        return Ok(ApiResponse<object>.Ok(null!, "Your enquiry has been submitted. We will contact you soon!"));
    }

    [HttpGet("enquiries")]
    public async Task<IActionResult> GetAll()
    {
        var enquiries = await _service.GetAllEnquiriesAsync();
        return Ok(ApiResponse<object>.Ok(enquiries));
    }
}
