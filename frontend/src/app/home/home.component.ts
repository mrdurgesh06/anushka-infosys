import { Component, OnInit, OnDestroy, signal, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, Testimonial } from '../core/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- HERO -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container">
        <div class="hero-content">
          <div class="hero-badge">🎓 Premier IT Training Institute</div>
          <h1>Shape Your Future with<br><span class="gradient-text">Digital Excellence</span></h1>
          <p>Anushka Infosys Pvt. Ltd. offers industry-aligned computer courses with expert faculty, modern labs, and 100% placement support. Your career transformation starts here.</p>
          <div class="hero-cta">
            <a routerLink="/courses" class="btn-primary">Explore Courses</a>
            <a routerLink="/contact" class="btn-outline">Free Counselling</a>
          </div>
          <div class="hero-stats">
            <div class="stat"><span class="stat-num">5000+</span><span>Students Trained</span></div>
            <div class="stat-div"></div>
            <div class="stat"><span class="stat-num">15+</span><span>Years Experience</span></div>
            <div class="stat-div"></div>
            <div class="stat"><span class="stat-num">95%</span><span>Placement Rate</span></div>
          </div>
        </div>
        <div class="hero-visual">
          <div class="hero-card card-1">
            <div class="card-icon">💻</div>
            <div class="card-text">ADCA Program</div>
            <div class="card-sub">12 Month Course</div>
          </div>
          <div class="hero-card card-2">
            <div class="card-icon">📊</div>
            <div class="card-text">Tally Expert</div>
            <div class="card-sub">GST + Payroll</div>
          </div>
          <div class="hero-card card-3">
            <div class="card-icon">🏆</div>
            <div class="card-text">Certified</div>
            <div class="card-sub">Govt. Recognized</div>
          </div>
          <div class="hero-glow"></div>
        </div>
      </div>
    </section>

    <!-- ABOUT SNIPPET -->
    <section class="about-snippet">
      <div class="container">
        <div class="about-grid">
          <div class="about-image-wrap">
            <div class="about-img-placeholder">
              <div class="img-icon">🏢</div>
              <div class="img-text">Our Institute</div>
            </div>
            <div class="experience-badge">
              <span class="exp-num">15+</span>
              <span class="exp-text">Years of Excellence</span>
            </div>
          </div>
          <div class="about-content">
            <div class="section-badge">About Us</div>
            <h2>Building Careers Through <span class="highlight">Quality Education</span></h2>
            <p>Anushka Infosys Pvt. Ltd. has been at the forefront of IT education for over 15 years. We combine industry-relevant curriculum with practical hands-on training to ensure our students are job-ready from day one.</p>
            <p>Our state-of-the-art computer labs, experienced faculty, and dedicated placement cell have helped thousands of students achieve their career goals in the competitive IT landscape.</p>
            <div class="feature-list">
              <div class="feature"><span class="check">✓</span> Government Recognized Certifications</div>
              <div class="feature"><span class="check">✓</span> Modern Computer Labs</div>
              <div class="feature"><span class="check">✓</span> Experienced Industry Experts</div>
              <div class="feature"><span class="check">✓</span> 100% Placement Assistance</div>
            </div>
            <a routerLink="/about" class="btn-primary">Know More About Us</a>
          </div>
        </div>
      </div>
    </section>

    <!-- COURSES -->
    <section class="courses-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">Our Programs</div>
          <h2>Popular Courses</h2>
          <p>Choose from our carefully designed programs to kickstart or advance your career in IT</p>
        </div>
        <div class="courses-grid">
          <div class="course-card" *ngFor="let course of featuredCourses">
            <div class="course-icon">{{ course.icon }}</div>
            <div class="course-badge">{{ course.duration }}</div>
            <h3>{{ course.shortName }}</h3>
            <p>{{ course.name }}</p>
            <div class="course-desc">{{ course.desc }}</div>
            <a [routerLink]="course.link" class="course-link">Learn More →</a>
          </div>
        </div>
        <div class="view-all">
          <a routerLink="/courses" class="btn-outline-dark">View All Courses</a>
        </div>
      </div>
    </section>

    <!-- WHY CHOOSE US -->
    <section class="why-us">
      <div class="container">
        <div class="section-header light">
          <div class="section-badge alt">Why Choose Us</div>
          <h2>What Makes Us Different</h2>
          <p>We go beyond teaching — we invest in your future</p>
        </div>
        <div class="why-grid">
          <div class="why-card" *ngFor="let item of whyUs">
            <div class="why-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ACHIEVEMENTS -->
    <section class="achievements">
      <div class="container">
        <div class="achievements-grid">
          <div class="achievement" *ngFor="let item of achievements">
            <div class="ach-num">{{ item.value }}</div>
            <div class="ach-label">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- TESTIMONIALS -->
    <section class="testimonials-section">
      <div class="container">
        <div class="section-header">
          <div class="section-badge">Student Reviews</div>
          <h2>Success Stories</h2>
          <p>Hear from our students who transformed their careers with Anushka Infosys</p>
        </div>
        <div class="testimonials-slider" *ngIf="testimonials().length > 0">
          <div class="testimonial-track" [style.transform]="'translateX(-' + (currentSlide() * 100) + '%)'">
            <div class="testimonial-card" *ngFor="let t of testimonials()">
              <div class="stars">{{ '★'.repeat(t.rating) }}{{ '☆'.repeat(5 - t.rating) }}</div>
              <p class="review">"{{ t.review }}"</p>
              <div class="student-info">
                <div class="avatar">{{ t.studentName.charAt(0) }}</div>
                <div>
                  <div class="student-name">{{ t.studentName }}</div>
                  <div class="student-course">{{ t.course }}
                    <span *ngIf="t.companyPlaced"> · {{ t.companyPlaced }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="slider-dots">
            <button *ngFor="let t of testimonials(); let i = index"
                    [class.active]="i === currentSlide()"
                    (click)="goToSlide(i)"></button>
          </div>
        </div>
        <div class="loading-state" *ngIf="testimonials().length === 0">
          <div class="spinner"></div>
          <p>Loading testimonials...</p>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2>Ready to Start Your IT Career?</h2>
          <p>Join thousands of successful students. Get free career counselling today.</p>
          <div class="cta-buttons">
            <a routerLink="/contact" class="btn-primary large">Book Free Counselling</a>
            <a href="tel:+919876543210" class="btn-outline large">📞 Call Now: +91 98765 43210</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    /* Hero */
    .hero {
      position: relative;
      min-height: 100vh;
      background: linear-gradient(135deg, #0a2463 0%, #1a3a8c 50%, #0d47a1 100%);
      display: flex;
      align-items: center;
      overflow: hidden;
      padding-top: 10px;
    }
    .hero-bg {
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse at 70% 50%, rgba(0,188,212,0.15) 0%, transparent 60%),
                  radial-gradient(ellipse at 20% 80%, rgba(30,136,229,0.2) 0%, transparent 50%);
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; position: relative; z-index: 1; }
    .hero .container { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; padding: 80px 20px; }
    .hero-badge {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(30,136,229,0.2); border: 1px solid rgba(30,136,229,0.4);
      color: #90caf9; padding: 8px 16px; border-radius: 20px;
      font-size: 13px; font-weight: 500; margin-bottom: 24px;
    }
    .hero-content h1 { color: white; font-size: clamp(36px, 4vw, 54px); font-weight: 800; line-height: 1.15; margin-bottom: 20px; }
    .gradient-text { background: linear-gradient(135deg, #1e88e5, #00bcd4); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero-content p { color: #b3d4f5; font-size: 17px; line-height: 1.7; margin-bottom: 36px; }
    .hero-cta { display: flex; gap: 16px; margin-bottom: 48px; flex-wrap: wrap; }
    .btn-primary {
      background: linear-gradient(135deg, #1e88e5, #00bcd4);
      color: white; padding: 14px 32px; border-radius: 8px;
      text-decoration: none; font-weight: 600; font-size: 15px;
      transition: all 0.3s; display: inline-block;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,188,212,0.4); }
    .btn-primary.large { padding: 16px 36px; font-size: 16px; }
    .btn-outline {
      background: transparent; color: white;
      border: 2px solid rgba(255,255,255,0.4); padding: 12px 28px;
      border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;
      transition: all 0.3s; display: inline-block;
    }
    .btn-outline:hover { border-color: white; background: rgba(255,255,255,0.1); }
    .btn-outline.large { padding: 14px 32px; }
    .hero-stats { display: flex; align-items: center; gap: 24px; }
    .stat { display: flex; flex-direction: column; }
    .stat-num { color: white; font-size: 28px; font-weight: 800; }
    .stat span:last-child { color: #90caf9; font-size: 13px; }
    .stat-div { width: 1px; height: 40px; background: rgba(255,255,255,0.2); }
    .hero-visual { position: relative; height: 400px; }
    .hero-glow {
      position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);
      width: 300px; height: 300px;
      background: radial-gradient(circle, rgba(0,188,212,0.3), transparent 70%);
      border-radius: 50%;
    }
    .hero-card {
      position: absolute; background: rgba(13, 50, 128, 0.8);
      backdrop-filter: blur(12px); border: 1px solid rgba(30,136,229,0.3);
      border-radius: 16px; padding: 20px 24px;
      text-align: center; animation: float 6s ease-in-out infinite;
    }
    .card-1 { top: 10%; left: 5%; animation-delay: 0s; }
    .card-2 { top: 40%; right: 0%; animation-delay: 2s; }
    .card-3 { bottom: 10%; left: 20%; animation-delay: 4s; }
    .card-icon { font-size: 32px; margin-bottom: 8px; }
    .card-text { color: white; font-weight: 600; font-size: 14px; }
    .card-sub { color: #90caf9; font-size: 12px; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }

    /* Sections */
    section { padding: 80px 0; }
    .section-header { text-align: center; margin-bottom: 56px; }
    .section-header h2 { font-size: clamp(28px, 3vw, 38px); color: #0d2461; font-weight: 700; margin-bottom: 12px; }
    .section-header p { color: #607d8b; font-size: 17px; max-width: 560px; margin: 0 auto; }
    .section-header.light h2 { color: white; }
    .section-header.light p { color: rgba(255,255,255,0.7); }
    .section-badge {
      display: inline-block; background: linear-gradient(135deg, rgba(30,136,229,0.15), rgba(0,188,212,0.15));
      color: #1565c0; border: 1px solid rgba(30,136,229,0.3);
      padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600;
      margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;
    }
    .section-badge.alt { background: rgba(255,255,255,0.15); color: white; border-color: rgba(255,255,255,0.3); }
    .highlight { color: #1e88e5; }

    /* About */
    .about-snippet { background: #f8fbff; }
    .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: center; }
    .about-image-wrap { position: relative; }
    .about-img-placeholder {
      height: 380px; background: linear-gradient(135deg, #0a2463, #1565c0);
      border-radius: 20px; display: flex; flex-direction: column;
      align-items: center; justify-content: center; gap: 12px;
    }
    .img-icon { font-size: 64px; }
    .img-text { color: rgba(255,255,255,0.7); font-size: 18px; }
    .experience-badge {
      position: absolute; bottom: -20px; right: -20px;
      background: linear-gradient(135deg, #1e88e5, #00bcd4);
      border-radius: 16px; padding: 20px 24px; text-align: center;
      box-shadow: 0 8px 24px rgba(30,136,229,0.4);
    }
    .exp-num { display: block; color: white; font-size: 36px; font-weight: 800; line-height: 1; }
    .exp-text { color: rgba(255,255,255,0.85); font-size: 13px; }
    .about-content .section-badge { margin-bottom: 16px; }
    .about-content h2 { font-size: 32px; color: #0d2461; font-weight: 700; margin-bottom: 16px; }
    .about-content p { color: #546e7a; line-height: 1.8; margin-bottom: 16px; }
    .feature-list { margin: 24px 0; display: flex; flex-direction: column; gap: 10px; }
    .feature { display: flex; align-items: center; gap: 10px; color: #37474f; font-size: 15px; }
    .check { color: #1e88e5; font-weight: 700; font-size: 16px; }

    /* Courses */
    .courses-section { background: white; }
    .courses-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .course-card {
      background: white; border: 1px solid #e3f2fd; border-radius: 16px;
      padding: 28px 24px; position: relative; overflow: hidden;
      transition: all 0.3s; cursor: pointer;
    }
    .course-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
      background: linear-gradient(135deg, #1e88e5, #00bcd4);
    }
    .course-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(30,136,229,0.15); border-color: #90caf9; }
    .course-icon { font-size: 40px; margin-bottom: 12px; }
    .course-badge {
      display: inline-block; background: #e3f2fd; color: #1565c0;
      padding: 4px 10px; border-radius: 12px; font-size: 12px; font-weight: 600;
      margin-bottom: 12px;
    }
    .course-card h3 { color: #1e88e5; font-size: 22px; font-weight: 800; margin-bottom: 4px; }
    .course-card p { color: #0d2461; font-size: 14px; font-weight: 600; margin-bottom: 10px; }
    .course-desc { color: #607d8b; font-size: 13px; line-height: 1.6; margin-bottom: 20px; }
    .course-link { color: #1e88e5; text-decoration: none; font-size: 14px; font-weight: 600; }
    .course-link:hover { color: #00bcd4; }
    .view-all { text-align: center; margin-top: 40px; }
    .btn-outline-dark {
      border: 2px solid #1e88e5; color: #1e88e5; padding: 12px 32px;
      border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;
      transition: all 0.3s; display: inline-block;
    }
    .btn-outline-dark:hover { background: #1e88e5; color: white; }

    /* Why Us */
    .why-us { background: linear-gradient(135deg, #0a2463, #1a3a8c); }
    .why-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
    .why-card {
      background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
      border-radius: 16px; padding: 32px 28px; text-align: center;
      transition: all 0.3s;
    }
    .why-card:hover { background: rgba(30,136,229,0.2); border-color: rgba(30,136,229,0.4); transform: translateY(-4px); }
    .why-icon { font-size: 48px; margin-bottom: 16px; }
    .why-card h3 { color: white; font-size: 18px; font-weight: 600; margin-bottom: 12px; }
    .why-card p { color: rgba(255,255,255,0.65); font-size: 14px; line-height: 1.7; }

    /* Achievements */
    .achievements { background: linear-gradient(135deg, #1e88e5, #00bcd4); padding: 48px 0; }
    .achievements-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }
    .achievement { text-align: center; }
    .ach-num { color: white; font-size: 44px; font-weight: 800; }
    .ach-label { color: rgba(255,255,255,0.85); font-size: 15px; margin-top: 4px; }

    /* Testimonials */
    .testimonials-section { background: #f8fbff; overflow: hidden; }
    .testimonials-slider { overflow: hidden; border-radius: 16px; }
    .testimonial-track { display: flex; transition: transform 0.5s ease; }
    .testimonial-card {
      min-width: 100%; background: white; border-radius: 16px;
      padding: 40px; border: 1px solid #e3f2fd;
      box-shadow: 0 4px 20px rgba(30,136,229,0.08);
    }
    .stars { color: #ffc107; font-size: 24px; margin-bottom: 20px; letter-spacing: 2px; }
    .review { color: #37474f; font-size: 18px; line-height: 1.8; margin-bottom: 24px; font-style: italic; }
    .student-info { display: flex; align-items: center; gap: 16px; }
    .avatar {
      width: 52px; height: 52px; border-radius: 50%;
      background: linear-gradient(135deg, #1e88e5, #00bcd4);
      display: flex; align-items: center; justify-content: center;
      color: white; font-size: 20px; font-weight: 700;
    }
    .student-name { color: #0d2461; font-weight: 700; font-size: 16px; }
    .student-course { color: #78909c; font-size: 14px; margin-top: 2px; }
    .slider-dots { display: flex; justify-content: center; gap: 8px; margin-top: 24px; }
    .slider-dots button {
      width: 8px; height: 8px; border-radius: 50%; border: none;
      background: #90caf9; cursor: pointer; transition: all 0.3s;
    }
    .slider-dots button.active { background: #1e88e5; width: 24px; border-radius: 4px; }
    .loading-state { text-align: center; padding: 60px; color: #90a4ae; }
    .spinner {
      width: 40px; height: 40px; border: 3px solid #e3f2fd;
      border-top-color: #1e88e5; border-radius: 50%;
      animation: spin 0.8s linear infinite; margin: 0 auto 16px;
    }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* CTA */
    .cta-section { background: linear-gradient(135deg, #0d2461, #1565c0); padding: 80px 0; }
    .cta-content { text-align: center; }
    .cta-content h2 { color: white; font-size: 38px; font-weight: 700; margin-bottom: 16px; }
    .cta-content p { color: rgba(255,255,255,0.75); font-size: 18px; margin-bottom: 36px; }
    .cta-buttons { display: flex; justify-content: center; gap: 16px; flex-wrap: wrap; }

    /* Responsive */
    @media (max-width: 1024px) {
      .hero .container { grid-template-columns: 1fr; text-align: center; }
      .hero-visual { display: none; }
      .hero-cta, .hero-stats { justify-content: center; }
      .about-grid { grid-template-columns: 1fr; }
      .courses-grid { grid-template-columns: 1fr 1fr; }
      .why-grid { grid-template-columns: 1fr 1fr; }
      .achievements-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 600px) {
      .hero-stats { flex-direction: column; gap: 12px; }
      .stat-div { width: 40px; height: 1px; }
      .courses-grid { grid-template-columns: 1fr; }
      .why-grid { grid-template-columns: 1fr; }
      .achievements-grid { grid-template-columns: 1fr 1fr; }
      .experience-badge { bottom: -10px; right: 10px; }
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  private api = inject(ApiService);
  testimonials = signal<Testimonial[]>([]);
  currentSlide = signal(0);
  private sliderInterval?: ReturnType<typeof setInterval>;

  featuredCourses = [
    { icon: '💻', shortName: 'DCA', name: 'Diploma in Computer Applications', duration: '6 Months', desc: 'Master office tools, internet, and fundamental computer skills.', link: '/courses/dca' },
    { icon: '🚀', shortName: 'ADCA', name: 'Advanced Diploma in Computer Applications', duration: '12 Months', desc: 'Programming, web design, database management and more.', link: '/courses/adca' },
    { icon: '📜', shortName: 'CCA', name: 'Certificate in Computer Applications', duration: '3 Months', desc: 'Quick certification for office and basic digital literacy.', link: '/courses/cca' },
    { icon: '📊', shortName: 'TALLY', name: 'Accounting with Tally ERP', duration: '3 Months', desc: 'GST, payroll, and complete accounting with Tally Prime.', link: '/courses/tally' }
  ];

  whyUs = [
    { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'Learn from certified industry professionals with years of real-world experience.' },
    { icon: '🖥️', title: 'Modern Labs', desc: 'Practice on latest hardware and software with 1:1 student-computer ratio.' },
    { icon: '📜', title: 'Government Certified', desc: 'Receive nationally recognized certificates accepted by top employers.' },
    { icon: '💼', title: 'Placement Support', desc: 'Dedicated placement cell with 95% placement record through our industry network.' },
    { icon: '📚', title: 'Updated Curriculum', desc: 'Industry-aligned syllabus updated regularly to match current job market demands.' },
    { icon: '💰', title: 'Affordable Fees', desc: 'Quality education at pocket-friendly fees with flexible EMI options available.' }
  ];

  achievements = [
    { value: '5000+', label: 'Students Trained' },
    { value: '500+', label: 'Companies Tied Up' },
    { value: '15+', label: 'Years of Excellence' },
    { value: '95%', label: 'Placement Rate' }
  ];

  ngOnInit() {
    this.api.getTestimonials().subscribe({
      next: (data) => {
        this.testimonials.set(data);
        this.startSlider();
      }
    });
  }

  startSlider() {
    this.sliderInterval = setInterval(() => {
      const next = (this.currentSlide() + 1) % this.testimonials().length;
      this.currentSlide.set(next);
    }, 4000);
  }

  goToSlide(index: number) {
    this.currentSlide.set(index);
  }

  ngOnDestroy() {
    clearInterval(this.sliderInterval);
  }
}
