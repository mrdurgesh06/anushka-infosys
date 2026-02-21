import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Testimonial } from '../core/api.service';

@Component({
  selector: 'app-testimonials',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a routerLink="/">Home</a> / Testimonials</div>
        <h1>Student Success Stories</h1>
        <p>Real reviews from students who transformed their careers at Anushka Infosys</p>
      </div>
    </section>

    <section class="testimonials-page">
      <div class="container">
        <div class="loading" *ngIf="loading()">
          <div class="spinner"></div>
          <p>Loading testimonials...</p>
        </div>

        <div class="stats-bar" *ngIf="!loading()">
          <div class="stat"><span class="num">{{ testimonials().length }}+</span><span>Reviews</span></div>
          <div class="stat"><span class="num">4.9/5</span><span>Average Rating</span></div>
          <div class="stat"><span class="num">95%</span><span>Placement Rate</span></div>
          <div class="stat"><span class="num">5000+</span><span>Happy Students</span></div>
        </div>

        <div class="testimonials-grid" *ngIf="!loading() && testimonials().length > 0">
          <div class="testimonial-card" *ngFor="let t of testimonials()">
            <div class="card-top">
              <div class="stars">{{ '★'.repeat(t.rating) }}{{ '☆'.repeat(5 - t.rating) }}</div>
              <div class="rating-num">{{ t.rating }}.0</div>
            </div>
            <p class="review">"{{ t.review }}"</p>
            <div class="student-info">
              <div class="avatar">{{ t.studentName.charAt(0) }}</div>
              <div class="student-details">
                <div class="name">{{ t.studentName }}</div>
                <div class="course-tag">{{ t.course }}</div>
                <div class="company" *ngIf="t.companyPlaced">🏢 {{ t.companyPlaced }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="empty" *ngIf="!loading() && testimonials().length === 0">
          <div class="empty-icon">💬</div>
          <h3>No testimonials yet</h3>
          <p>Check back soon!</p>
        </div>
      </div>
    </section>

    <section class="cta">
      <div class="container">
        <h2>Ready to Write Your Own Success Story?</h2>
        <p>Join Anushka Infosys and take the first step toward your dream career.</p>
        <a routerLink="/contact" class="btn-primary">Get Free Counselling</a>
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
    .testimonials-page { padding: 80px 0; background: #f8fbff; }
    .loading { text-align: center; padding: 80px; }
    .spinner { width: 44px; height: 44px; border: 3px solid #e3f2fd; border-top-color: #1e88e5; border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 16px; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .stats-bar { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; background: white; border-radius: 16px; padding: 28px; margin-bottom: 48px; border: 1px solid #e3f2fd; box-shadow: 0 4px 16px rgba(30,136,229,0.08); }
    .stat { text-align: center; }
    .num { display: block; font-size: 32px; font-weight: 800; color: #1e88e5; }
    .stat span:last-child { color: #90a4ae; font-size: 14px; }
    .testimonials-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .testimonial-card { background: white; border-radius: 16px; padding: 28px; border: 1px solid #e3f2fd; transition: all 0.3s; box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
    .testimonial-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(30,136,229,0.12); border-color: #90caf9; }
    .card-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
    .stars { color: #ffc107; font-size: 20px; letter-spacing: 2px; }
    .rating-num { background: #fff8e1; color: #f57f17; padding: 4px 10px; border-radius: 8px; font-weight: 700; font-size: 14px; }
    .review { color: #37474f; font-size: 15px; line-height: 1.8; margin-bottom: 20px; font-style: italic; }
    .student-info { display: flex; align-items: center; gap: 14px; border-top: 1px solid #f0f4f8; padding-top: 16px; }
    .avatar { width: 48px; height: 48px; border-radius: 50%; background: linear-gradient(135deg, #1e88e5, #00bcd4); display: flex; align-items: center; justify-content: center; color: white; font-size: 20px; font-weight: 700; flex-shrink: 0; }
    .name { color: #0d2461; font-weight: 700; font-size: 15px; }
    .course-tag { display: inline-block; background: #e3f2fd; color: #1565c0; padding: 2px 10px; border-radius: 10px; font-size: 12px; font-weight: 600; margin-top: 4px; }
    .company { color: #78909c; font-size: 13px; margin-top: 4px; }
    .empty { text-align: center; padding: 80px; }
    .empty-icon { font-size: 60px; margin-bottom: 16px; }
    .empty h3 { color: #0d2461; font-size: 22px; margin-bottom: 8px; }
    .empty p { color: #90a4ae; }
    .cta { background: linear-gradient(135deg, #0a2463, #1565c0); padding: 80px 0; text-align: center; }
    .cta h2 { color: white; font-size: 36px; font-weight: 700; margin-bottom: 12px; }
    .cta p { color: rgba(255,255,255,0.75); font-size: 18px; margin-bottom: 32px; }
    .btn-primary { display: inline-block; background: linear-gradient(135deg, #1e88e5, #00bcd4); color: white; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; transition: all 0.3s; }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,188,212,0.4); }
    @media (max-width: 900px) { .testimonials-grid { grid-template-columns: 1fr 1fr; } .stats-bar { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 600px) { .testimonials-grid { grid-template-columns: 1fr; } }
  `]
})
export class TestimonialsComponent implements OnInit {
  private api = inject(ApiService);
  testimonials = signal<Testimonial[]>([]);
  loading = signal(true);

  ngOnInit() {
    this.api.getTestimonials().subscribe({
      next: (data) => { this.testimonials.set(data); this.loading.set(false); },
      error: () => this.loading.set(false)
    });
  }
}
