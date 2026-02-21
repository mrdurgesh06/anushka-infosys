-- ============================================================
-- Anushka Infosys Pvt. Ltd. – Database Schema
-- SQL Server 2019+ compatible
-- ============================================================

CREATE DATABASE AnushkaInfosysDB;
GO

USE AnushkaInfosysDB;
GO

-- Courses Table
CREATE TABLE Courses (
    Id          INT IDENTITY(1,1) PRIMARY KEY,
    Name        NVARCHAR(200)   NOT NULL,
    ShortName   NVARCHAR(20)    NOT NULL,
    Description NVARCHAR(MAX)   NOT NULL,
    Duration    NVARCHAR(50)    NOT NULL,
    Eligibility NVARCHAR(100)   NOT NULL,
    Syllabus    NVARCHAR(MAX)   NOT NULL,   -- JSON array
    Outcomes    NVARCHAR(MAX)   NOT NULL,   -- JSON array
    Fee         DECIMAL(10,2)   NOT NULL DEFAULT 0,
    IsActive    BIT             NOT NULL DEFAULT 1,
    CreatedAt   DATETIME2       NOT NULL DEFAULT GETUTCDATE()
);

-- Testimonials Table
CREATE TABLE Testimonials (
    Id            INT IDENTITY(1,1) PRIMARY KEY,
    StudentName   NVARCHAR(100)   NOT NULL,
    Course        NVARCHAR(100)   NOT NULL,
    Review        NVARCHAR(MAX)   NOT NULL,
    Rating        INT             NOT NULL CHECK (Rating BETWEEN 1 AND 5),
    PhotoUrl      NVARCHAR(500)   NULL,
    CompanyPlaced NVARCHAR(200)   NULL,
    IsActive      BIT             NOT NULL DEFAULT 1,
    CreatedAt     DATETIME2       NOT NULL DEFAULT GETUTCDATE()
);

-- ContactEnquiries Table
CREATE TABLE ContactEnquiries (
    Id        INT IDENTITY(1,1) PRIMARY KEY,
    Name      NVARCHAR(100)  NOT NULL,
    Phone     NVARCHAR(15)   NOT NULL,
    Email     NVARCHAR(150)  NOT NULL,
    Course    NVARCHAR(100)  NOT NULL,
    Message   NVARCHAR(MAX)  NOT NULL,
    IsRead    BIT            NOT NULL DEFAULT 0,
    CreatedAt DATETIME2      NOT NULL DEFAULT GETUTCDATE()
);

-- Indexes
CREATE INDEX IX_Courses_IsActive     ON Courses(IsActive);
CREATE INDEX IX_Testimonials_IsActive ON Testimonials(IsActive);
CREATE INDEX IX_Enquiries_CreatedAt  ON ContactEnquiries(CreatedAt DESC);
CREATE INDEX IX_Enquiries_IsRead     ON ContactEnquiries(IsRead);

-- Sample Seed Data
INSERT INTO Courses (Name, ShortName, Description, Duration, Eligibility, Syllabus, Outcomes, Fee) VALUES
(
    'Diploma in Computer Applications', 'DCA',
    'A comprehensive diploma program covering fundamental computer skills, office applications, and internet technologies.',
    '6 Months', '10th Pass or Equivalent',
    '["Computer Fundamentals", "MS Office Suite", "Internet & Email", "Windows OS", "Data Entry", "Basic Troubleshooting"]',
    '["Office Administration", "Data Entry Operator", "Computer Operator", "Front Desk Executive"]',
    6000.00
),
(
    'Advanced Diploma in Computer Applications', 'ADCA',
    'An advanced program covering programming, web development, and professional software tools.',
    '12 Months', '12th Pass or Equivalent',
    '["Computer Fundamentals", "MS Office Advanced", "HTML & CSS", "C Programming", "Database Management", "Tally ERP", "Internet Technologies", "Project Work"]',
    '["Software Developer (Junior)", "Web Designer", "Accountant (Junior)", "Database Operator", "IT Executive"]',
    12000.00
),
(
    'Certificate in Computer Applications', 'CCA',
    'A short-term certification course ideal for beginners wanting to learn computer basics quickly.',
    '3 Months', '8th Pass or Equivalent',
    '["Computer Basics", "MS Word", "MS Excel", "Internet Usage", "Email Communication"]',
    '["Basic Computer User", "Office Helper", "Shop Assistant"]',
    3000.00
),
(
    'Accounting with Tally', 'TALLY',
    'Master accounting principles and Tally ERP for real-world financial management and bookkeeping.',
    '3 Months', '12th Commerce or Equivalent',
    '["Accounting Fundamentals", "Tally ERP 9/Prime", "GST Filing", "Payroll Management", "Balance Sheet", "Bank Reconciliation", "MIS Reports"]',
    '["Accountant", "GST Practitioner", "Tally Operator", "Finance Executive"]',
    5000.00
);

INSERT INTO Testimonials (StudentName, Course, Review, Rating, CompanyPlaced) VALUES
('Priya Sharma',  'ADCA',    'Excellent training! The faculty is very supportive and the curriculum is industry-relevant. I got placed within 2 months of completing the course.', 5, 'Infosys BPO'),
('Rahul Verma',   'TALLY',   'The Tally course here is the best in the region. Very practical approach with live GST filing practice. Highly recommend!', 5, 'CA Firm, Pune'),
('Sneha Patil',   'DCA',     'I was a complete beginner and now I work confidently with computers. The trainers are patient and knowledgeable.', 4, 'Government Office'),
('Amit Kulkarni', 'CCA',     'Quick and effective course. Learned everything I needed for my office job in just 3 months.', 4, NULL),
('Kavya Nair',    'ADCA',    'Great infrastructure, updated syllabus, and excellent placement support. Anushka Infosys changed my career!', 5, 'TCS (Data Entry)'),
('Suresh Gaikwad','TALLY',   'After doing Tally course from here, I started my own accounting firm. The practical training was exceptional.', 5, NULL);

GO

-- Useful queries
-- Get all active courses
-- SELECT * FROM Courses WHERE IsActive = 1 ORDER BY Id;

-- Get unread enquiries
-- SELECT * FROM ContactEnquiries WHERE IsRead = 0 ORDER BY CreatedAt DESC;

-- Dashboard summary
-- SELECT
--   (SELECT COUNT(*) FROM Courses WHERE IsActive=1) AS TotalCourses,
--   (SELECT COUNT(*) FROM Testimonials WHERE IsActive=1) AS TotalTestimonials,
--   (SELECT COUNT(*) FROM ContactEnquiries) AS TotalEnquiries,
--   (SELECT COUNT(*) FROM ContactEnquiries WHERE IsRead=0) AS UnreadEnquiries;
