using AnushkaInfosys.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace AnushkaInfosys.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Course> Courses { get; set; }
    public DbSet<Testimonial> Testimonials { get; set; }
    public DbSet<ContactEnquiry> ContactEnquiries { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Course>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.ShortName).IsRequired().HasMaxLength(20);
            entity.Property(e => e.Description).IsRequired();
            entity.Property(e => e.Fee).HasColumnType("decimal(10,2)");
        });

        modelBuilder.Entity<Testimonial>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.StudentName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Course).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Review).IsRequired();
            entity.Property(e => e.Rating).IsRequired();
        });

        modelBuilder.Entity<ContactEnquiry>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Phone).IsRequired().HasMaxLength(15);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(150);
            entity.Property(e => e.Course).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Message).IsRequired();
        });
    }
}

public static class DbSeeder
{
    public static void Seed(AppDbContext context)
    {
        if (!context.Courses.Any())
        {
            var syllabusOpts = new JsonSerializerOptions();
            context.Courses.AddRange(
                new Course
                {
                    Name = "Diploma in Computer Applications",
                    ShortName = "DCA",
                    Description = "A comprehensive diploma program covering fundamental computer skills, office applications, and internet technologies.",
                    Duration = "6 Months",
                    Eligibility = "10th Pass or Equivalent",
                    Syllabus = JsonSerializer.Serialize(new[] {
                        "Computer Fundamentals", "MS Office (Word, Excel, PowerPoint)",
                        "Internet & Email", "Windows OS", "Data Entry", "Basic Troubleshooting"
                    }),
                    Outcomes = JsonSerializer.Serialize(new[] {
                        "Office Administration", "Data Entry Operator", "Computer Operator", "Front Desk Executive"
                    }),
                    Fee = 6000
                },
                new Course
                {
                    Name = "Advanced Diploma in Computer Applications",
                    ShortName = "ADCA",
                    Description = "An advanced program covering programming, web development, and professional software tools.",
                    Duration = "12 Months",
                    Eligibility = "12th Pass or Equivalent",
                    Syllabus = JsonSerializer.Serialize(new[] {
                        "Computer Fundamentals", "MS Office Advanced", "HTML & CSS",
                        "C Programming", "Database Management", "Tally ERP", "Internet Technologies", "Project Work"
                    }),
                    Outcomes = JsonSerializer.Serialize(new[] {
                        "Software Developer (Junior)", "Web Designer", "Accountant (Junior)", "Database Operator", "IT Executive"
                    }),
                    Fee = 12000
                },
                new Course
                {
                    Name = "Certificate in Computer Applications",
                    ShortName = "CCA",
                    Description = "A short-term certification course ideal for beginners wanting to learn computer basics quickly.",
                    Duration = "3 Months",
                    Eligibility = "8th Pass or Equivalent",
                    Syllabus = JsonSerializer.Serialize(new[] {
                        "Computer Basics", "MS Word", "MS Excel", "Internet Usage", "Email Communication"
                    }),
                    Outcomes = JsonSerializer.Serialize(new[] {
                        "Basic Computer User", "Office Helper", "Shop Assistant"
                    }),
                    Fee = 3000
                },
                new Course
                {
                    Name = "Accounting with Tally",
                    ShortName = "TALLY",
                    Description = "Master accounting principles and Tally ERP for real-world financial management and bookkeeping.",
                    Duration = "3 Months",
                    Eligibility = "12th Commerce or Equivalent",
                    Syllabus = JsonSerializer.Serialize(new[] {
                        "Accounting Fundamentals", "Tally ERP 9/Prime", "GST Filing",
                        "Payroll Management", "Balance Sheet", "Bank Reconciliation", "MIS Reports"
                    }),
                    Outcomes = JsonSerializer.Serialize(new[] {
                        "Accountant", "GST Practitioner", "Tally Operator", "Finance Executive"
                    }),
                    Fee = 5000
                }
            );
        }

        if (!context.Testimonials.Any())
        {
            context.Testimonials.AddRange(
                new Testimonial { StudentName = "Priya Sharma", Course = "ADCA", Review = "Excellent training! The faculty is very supportive and the curriculum is industry-relevant. I got placed within 2 months of completing the course.", Rating = 5, CompanyPlaced = "Infosys BPO" },
                new Testimonial { StudentName = "Rahul Verma", Course = "Accounting with Tally", Review = "The Tally course here is the best in the region. Very practical approach with live GST filing practice. Highly recommend!", Rating = 5, CompanyPlaced = "CA Firm, Pune" },
                new Testimonial { StudentName = "Sneha Patil", Course = "DCA", Review = "I was a complete beginner and now I work confidently with computers. The trainers are patient and knowledgeable.", Rating = 4, CompanyPlaced = "Government Office" },
                new Testimonial { StudentName = "Amit Kulkarni", Course = "CCA", Review = "Quick and effective course. Learned everything I needed for my office job in just 3 months.", Rating = 4 },
                new Testimonial { StudentName = "Kavya Nair", Course = "ADCA", Review = "Great infrastructure, updated syllabus, and excellent placement support. Anushka Infosys changed my career!", Rating = 5, CompanyPlaced = "TCS (Data Entry)" },
                new Testimonial { StudentName = "Suresh Gaikwad", Course = "Accounting with Tally", Review = "After doing Tally course from here, I started my own accounting firm. The practical training was exceptional.", Rating = 5 }
            );
        }

        context.SaveChanges();
    }
}
