# Anushka Infosys Pvt. Ltd. – Complete Project Guide

## 📁 Project Structure

```
anushka-infosys/
├── backend/                    # ASP.NET Core 8 Web API
│   ├── Controllers/
│   │   └── Controllers.cs      # CourseController, TestimonialController, ContactController
│   ├── Services/
│   │   └── Services.cs         # Business logic layer
│   ├── Repositories/
│   │   └── Repositories.cs     # Data access layer
│   ├── Models/
│   │   └── Entities.cs         # Course, Testimonial, ContactEnquiry
│   ├── DTOs/
│   │   └── Dtos.cs             # Request/Response DTOs
│   ├── Interfaces/
│   │   └── IInterfaces.cs      # Service & Repository interfaces
│   ├── Data/
│   │   └── AppDbContext.cs     # EF Core DbContext + Seeder
│   ├── Program.cs
│   ├── appsettings.json
│   └── AnushkaInfosys.csproj
│
├── frontend/                   # Angular 19 SPA
│   └── src/
│       ├── app/
│       │   ├── core/
│       │   │   └── api.service.ts      # HTTP service for all API calls
│       │   ├── shared/
│       │   │   ├── header/             # Fixed navigation header
│       │   │   └── footer/             # Footer with contact info
│       │   ├── home/                   # Home page (hero, courses, testimonials)
│       │   ├── about/                  # About page
│       │   ├── courses/
│       │   │   ├── courses.component.ts
│       │   │   ├── dca/
│       │   │   ├── adca/
│       │   │   ├── cca/
│       │   │   └── tally/
│       │   ├── testimonials/           # Dynamic from API
│       │   ├── gallery/                # Grid + modal
│       │   ├── contact/                # Reactive form
│       │   ├── app.routes.ts           # Lazy-loaded routes
│       │   └── app.config.ts
│       ├── environments/
│       │   ├── environment.ts          # Dev: localhost:5000
│       │   └── environment.prod.ts     # Prod: your domain
│       ├── styles.css
│       ├── index.html
│       └── main.ts
│
└── docs/
    ├── database-schema.sql
    └── README.md (this file)
```

---

## 🚀 BACKEND SETUP

### Prerequisites
- .NET 8 SDK
- SQL Server 2019+ (or SQL Server Express)
- Visual Studio 2022 or VS Code

### Step 1: Database Setup

**Option A: Use EF Core Migrations (Recommended)**
```bash
cd backend
dotnet ef migrations add InitialCreate
dotnet ef database update
```

**Option B: Run SQL Script Directly**
```sql
-- Open SQL Server Management Studio
-- Run docs/database-schema.sql
```

### Step 2: Configure Connection String
Edit `backend/appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=YOUR_SERVER;Database=AnushkaInfosysDB;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

For SQL Authentication:
```json
"DefaultConnection": "Server=localhost;Database=AnushkaInfosysDB;User Id=sa;Password=YourPassword;TrustServerCertificate=True;"
```

### Step 3: Install NuGet Packages
```bash
cd backend
dotnet add package Microsoft.EntityFrameworkCore.SqlServer --version 8.0.0
dotnet add package Microsoft.EntityFrameworkCore.Tools --version 8.0.0
dotnet add package Swashbuckle.AspNetCore --version 6.5.0
```

### Step 4: Run the API
```bash
cd backend
dotnet run
```

API runs at: `http://localhost:5000`
Swagger UI: `http://localhost:5000/swagger`

---

## 🎨 FRONTEND SETUP

### Prerequisites
- Node.js 20+ (LTS)
- Angular CLI 19

### Step 1: Install Angular CLI
```bash
npm install -g @angular/cli@19
```

### Step 2: Install Dependencies
```bash
cd frontend
npm install
```

### Step 3: Configure API URL
Edit `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'  // Change to your API URL
};
```

### Step 4: Run Development Server
```bash
cd frontend
ng serve
```

App runs at: `http://localhost:4200`

---

## 🔌 API ENDPOINTS

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/courses | Get all active courses |
| GET | /api/courses/{id} | Get course by ID |
| POST | /api/courses | Add new course (admin) |
| GET | /api/testimonials | Get all testimonials |
| POST | /api/testimonials | Add testimonial (admin) |
| POST | /api/contact | Submit contact enquiry |
| GET | /api/contact/enquiries | Get all enquiries (admin) |

### Sample API Responses

**GET /api/courses**
```json
{
  "success": true,
  "message": "Success",
  "data": [
    {
      "id": 1,
      "name": "Diploma in Computer Applications",
      "shortName": "DCA",
      "description": "...",
      "duration": "6 Months",
      "eligibility": "10th Pass",
      "syllabus": ["Computer Fundamentals", "MS Office Suite"],
      "outcomes": ["Computer Operator", "Data Entry"],
      "fee": 6000
    }
  ]
}
```

**POST /api/contact**
```json
{
  "name": "Rahul Sharma",
  "phone": "+919876543210",
  "email": "rahul@example.com",
  "course": "ADCA",
  "message": "I am interested in the ADCA course. Please provide details."
}
```

**Response:**
```json
{
  "success": true,
  "message": "Your enquiry has been submitted. We will contact you soon!",
  "data": null
}
```

---

## 🏗️ PRODUCTION BUILD

### Backend (Publish)
```bash
cd backend
dotnet publish -c Release -o ./publish
```
Deploy the `./publish` folder to IIS or Azure App Service.

**IIS Setup:**
1. Install .NET 8 Hosting Bundle
2. Create an IIS site pointing to the publish folder
3. Set Application Pool to "No Managed Code"
4. Configure appsettings.json with production DB connection

### Frontend (Build)
```bash
cd frontend
ng build --configuration=production
```
Output is in `dist/anushka-infosys/browser/`.

**Deploy to IIS:**
1. Copy contents of `dist/anushka-infosys/browser/` to your IIS root
2. Add web.config for Angular routing:

```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <system.webServer>
    <rewrite>
      <rules>
        <rule name="Angular Routes" stopProcessing="true">
          <match url=".*" />
          <conditions logicalGrouping="MatchAll">
            <add input="{REQUEST_FILENAME}" matchType="IsFile" negate="true" />
            <add input="{REQUEST_FILENAME}" matchType="IsDirectory" negate="true" />
          </conditions>
          <action type="Rewrite" url="/index.html" />
        </rule>
      </rules>
    </rewrite>
  </system.webServer>
</configuration>
```

---

## 🎨 DESIGN SYSTEM

### Color Palette
| Token | Hex | Usage |
|-------|-----|-------|
| Navy Primary | `#0a2463` | Hero, header backgrounds |
| Navy Light | `#1a3a8c` | Section backgrounds |
| Blue | `#1e88e5` | Buttons, links, accents |
| Blue Dark | `#1565c0` | Hover states |
| Teal | `#00bcd4` | Gradients, highlights |
| Text | `#37474f` | Body text |
| Text Muted | `#78909c` | Captions, labels |
| Background | `#f8fbff` | Page backgrounds |
| Border | `#e3f2fd` | Card borders |

### Pages Summary
| Route | Component | API Used |
|-------|-----------|----------|
| `/` | HomeComponent | GET /testimonials |
| `/about` | AboutComponent | Static |
| `/courses` | CoursesComponent | Static |
| `/courses/dca` | DcaComponent | Static |
| `/courses/adca` | AdcaComponent | Static |
| `/courses/cca` | CcaComponent | Static |
| `/courses/tally` | TallyComponent | Static |
| `/testimonials` | TestimonialsComponent | GET /testimonials |
| `/gallery` | GalleryComponent | Static |
| `/contact` | ContactComponent | POST /contact |

---

## 🔧 COMMON ISSUES & FIXES

**CORS Error in Angular:**
Ensure backend CORS allows `http://localhost:4200`:
```csharp
policy.WithOrigins("http://localhost:4200", "https://yourdomain.com")
```

**EF Core Migration Error:**
```bash
dotnet tool install --global dotnet-ef
dotnet ef migrations add Init --project backend
```

**Angular Build Error – Module not found:**
```bash
rm -rf node_modules package-lock.json
npm install
```

**SQL Server Connection Error:**
- Ensure SQL Server Browser service is running
- Enable TCP/IP in SQL Server Configuration Manager
- Check firewall allows port 1433

---

## 📞 ADDING REAL IMAGES

Replace placeholder icons with real images in the Gallery component:
```typescript
// gallery.component.ts – change each item's icon to an img URL:
allItems = [
  { ..., imgUrl: 'assets/images/lab1.jpg', ... },
  // ...
];
```

In template:
```html
<img [src]="item.imgUrl" [alt]="item.title">
```

---

## 🛡️ SECURITY CHECKLIST FOR PRODUCTION

- [ ] Move connection string to environment variables / Azure Key Vault
- [ ] Add authentication to admin endpoints (`/api/contact/enquiries`, POST courses/testimonials)
- [ ] Enable HTTPS and redirect HTTP → HTTPS
- [ ] Add rate limiting to the contact form endpoint
- [ ] Configure production CORS to only your domain
- [ ] Enable SQL Server encryption

---

## 📊 EXTENDING THE PROJECT

### Add Admin Dashboard
1. Create `AdminModule` with login + JWT auth
2. Add `[Authorize]` attribute to admin endpoints
3. Build dashboard to manage enquiries, courses, testimonials

### Add Email Notifications
Install `MailKit` NuGet package and send email on enquiry submission:
```bash
dotnet add package MailKit
```

### Add Image Upload for Gallery
1. Add `IFormFile` endpoint in backend
2. Store images in `wwwroot/uploads/`
3. Serve static files and reference URLs in frontend

---

*Built with Angular 19 + ASP.NET Core 8 + SQL Server*
*Anushka Infosys Pvt. Ltd. © 2025*
