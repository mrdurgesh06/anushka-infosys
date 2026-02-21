import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a routerLink="/">Home</a> / Courses</div>
        <h1>Our Courses</h1>
        <p>Industry-aligned programs designed to build your career</p>
      </div>
    </section>

    <section class="courses-list">
      <div class="container">
        <div class="courses-grid">
          <div class="course-card" *ngFor="let c of courses">
            <div class="card-header" [style.background]="c.color">
              <div class="course-icon">{{ c.icon }}</div>
              <div class="course-shortname">{{ c.shortName }}</div>
            </div>
            <div class="card-body">
              <h3>{{ c.name }}</h3>
              <p>{{ c.desc }}</p>
              <div class="meta">
                <div class="meta-item"><span>⏱</span> {{ c.duration }}</div>
                <div class="meta-item"><span>📋</span> {{ c.eligibility }}</div>
                <div class="meta-item"><span>💰</span> ₹{{ c.fee.toLocaleString() }}</div>
              </div>
              <div class="highlights">
                <span *ngFor="let h of c.highlights">{{ h }}</span>
              </div>
              <a [routerLink]="c.link" class="btn-view">View Full Details →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero { background: linear-gradient(135deg, #0a2463, #1565c0); padding: 120px 0 60px; text-align: center; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .breadcrumb { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 16px; }
    .breadcrumb a { color: #90caf9; text-decoration: none; }
    .page-hero h1 { color: white; font-size: 44px; font-weight: 800; margin-bottom: 12px; }
    .page-hero p { color: rgba(255,255,255,0.75); font-size: 18px; }
    .courses-list { padding: 80px 0; background: #f8fbff; }
    .courses-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; }
    .course-card { background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); transition: all 0.3s; border: 1px solid #e3f2fd; }
    .course-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(30,136,229,0.15); }
    .card-header { padding: 32px; display: flex; align-items: center; gap: 16px; }
    .course-icon { font-size: 48px; }
    .course-shortname { color: rgba(255,255,255,0.9); font-size: 32px; font-weight: 900; letter-spacing: -2px; }
    .card-body { padding: 28px; }
    .card-body h3 { color: #0d2461; font-size: 20px; font-weight: 700; margin-bottom: 12px; }
    .card-body p { color: #546e7a; font-size: 15px; line-height: 1.7; margin-bottom: 20px; }
    .meta { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
    .meta-item { display: flex; align-items: center; gap: 8px; color: #607d8b; font-size: 14px; }
    .meta-item span { font-size: 16px; }
    .highlights { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
    .highlights span { background: #e3f2fd; color: #1565c0; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600; }
    .btn-view { display: inline-block; background: linear-gradient(135deg, #1e88e5, #00bcd4); color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; transition: all 0.3s; }
    .btn-view:hover { transform: translateY(-2px); box-shadow: 0 6px 16px rgba(0,188,212,0.35); }
    @media (max-width: 768px) { .courses-grid { grid-template-columns: 1fr; } }
  `]
})
export class CoursesComponent {
  courses = [
    { icon: '💻', shortName: 'DCA', name: 'Diploma in Computer Applications', desc: 'Comprehensive 6-month program covering all fundamental computer skills required for office and administrative jobs.', duration: '6 Months', eligibility: '10th Pass', fee: 6000, color: 'linear-gradient(135deg, #1e88e5, #1565c0)', highlights: ['MS Office', 'Internet', 'Data Entry', 'Windows OS'], link: '/courses/dca' },
    { icon: '🚀', shortName: 'ADCA', name: 'Advanced Diploma in Computer Applications', desc: 'In-depth 12-month advanced program with programming, web design, database management and professional tools.', duration: '12 Months', eligibility: '12th Pass', fee: 12000, color: 'linear-gradient(135deg, #7c4dff, #3d5afe)', highlights: ['Programming', 'Web Design', 'Database', 'Tally'], link: '/courses/adca' },
    { icon: '📜', shortName: 'CCA', name: 'Certificate in Computer Applications', desc: 'Quick 3-month certification course ideal for beginners who want to learn basic computer skills rapidly.', duration: '3 Months', eligibility: '8th Pass', fee: 3000, color: 'linear-gradient(135deg, #00bcd4, #0097a7)', highlights: ['Computer Basics', 'MS Word', 'MS Excel', 'Email'], link: '/courses/cca' },
    { icon: '📊', shortName: 'TALLY', name: 'Accounting with Tally ERP', desc: 'Master accounting, GST filing, payroll, and business finance with Tally Prime in just 3 months.', duration: '3 Months', eligibility: '12th Commerce', fee: 5000, color: 'linear-gradient(135deg, #43a047, #2e7d32)', highlights: ['Tally Prime', 'GST Filing', 'Payroll', 'MIS Reports'], link: '/courses/tally' }
  ];
}
