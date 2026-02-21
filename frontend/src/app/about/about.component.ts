import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <!-- Page Hero -->
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a routerLink="/">Home</a> / About Us</div>
        <h1>About Anushka Infosys</h1>
        <p>Empowering futures through quality IT education since 2005</p>
      </div>
    </section>

    <!-- Overview -->
    <section class="overview">
      <div class="container">
        <div class="overview-grid">
          <div class="content">
            <div class="badge">Company Overview</div>
            <h2>Who We Are</h2>
            <p>Anushka Infosys Pvt. Ltd. is a premier IT training institute established in 2005 with a mission to provide quality, affordable, and industry-relevant computer education to students across Maharashtra.</p>
            <p>Over the past 15+ years, we have trained more than 5,000 students and helped them build successful careers in the IT sector. Our institute is recognized by the government and affiliated with leading certification bodies.</p>
            <p>We believe that quality education should be accessible to everyone, regardless of their background or financial status. Our programs are designed to bridge the gap between academic knowledge and industry requirements.</p>
          </div>
          <div class="stats-panel">
            <div class="stat-item" *ngFor="let stat of stats">
              <div class="stat-icon">{{ stat.icon }}</div>
              <div class="stat-num">{{ stat.value }}</div>
              <div class="stat-label">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Vision -->
    <section class="mission-vision">
      <div class="container">
        <div class="mv-grid">
          <div class="mv-card mission">
            <div class="mv-icon">🎯</div>
            <h3>Our Mission</h3>
            <p>To provide world-class IT education at affordable costs, making every student technologically empowered and industry-ready through practical, hands-on learning experiences.</p>
          </div>
          <div class="mv-card vision">
            <div class="mv-icon">🔭</div>
            <h3>Our Vision</h3>
            <p>To be Maharashtra's most trusted IT training institute, known for producing competent professionals who contribute meaningfully to the digital economy and their communities.</p>
          </div>
          <div class="mv-card values">
            <div class="mv-icon">💎</div>
            <h3>Our Values</h3>
            <p>Quality, Integrity, Innovation, and Student-First approach in everything we do. We are committed to continuous improvement and excellence in education delivery.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- MD Message -->
    <section class="md-message">
      <div class="container">
        <div class="md-grid">
          <div class="md-photo">
            <div class="photo-placeholder">
              <span>👨‍💼</span>
              <div class="photo-name">Mr. Rajesh Anushka</div>
              <div class="photo-title">Managing Director</div>
            </div>
          </div>
          <div class="md-content">
            <div class="quote-icon">"</div>
            <h2>Message from the MD</h2>
            <p>When I founded Anushka Infosys in 2005, I had a simple dream — to give every young person in our community access to quality computer education that could transform their lives.</p>
            <p>Today, I am proud to see thousands of our alumni working at reputed companies, running their own businesses, and making their families proud. Each success story motivates us to raise our standards higher.</p>
            <p>At Anushka Infosys, we don't just teach — we mentor, guide, and support our students throughout their journey. Our doors are always open for those who dare to dream bigger.</p>
            <div class="md-signature">— Mr. Rajesh Anushka, MD & Founder</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Infrastructure -->
    <section class="infrastructure">
      <div class="container">
        <div class="section-header">
          <div class="badge">Our Facilities</div>
          <h2>World-Class Infrastructure</h2>
          <p>State-of-the-art facilities designed for the best learning experience</p>
        </div>
        <div class="infra-grid">
          <div class="infra-card" *ngFor="let item of infrastructure">
            <div class="infra-icon">{{ item.icon }}</div>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Placement -->
    <section class="placement">
      <div class="container">
        <div class="placement-content">
          <div class="section-header left">
            <div class="badge">Career Support</div>
            <h2>Placement Assistance</h2>
          </div>
          <div class="placement-grid">
            <div class="placement-point" *ngFor="let point of placements">
              <div class="point-icon">{{ point.icon }}</div>
              <div>
                <h4>{{ point.title }}</h4>
                <p>{{ point.desc }}</p>
              </div>
            </div>
          </div>
          <div class="placement-cta">
            <a routerLink="/contact" class="btn-primary">Talk to Our Career Advisor</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero {
      background: linear-gradient(135deg, #0a2463, #1565c0);
      padding: 120px 0 60px;
      text-align: center;
    }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .breadcrumb { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 16px; }
    .breadcrumb a { color: #90caf9; text-decoration: none; }
    .page-hero h1 { color: white; font-size: 44px; font-weight: 800; margin-bottom: 12px; }
    .page-hero p { color: rgba(255,255,255,0.75); font-size: 18px; }
    section { padding: 80px 0; }
    .badge {
      display: inline-block; background: rgba(30,136,229,0.12); color: #1565c0;
      border: 1px solid rgba(30,136,229,0.25); padding: 6px 16px; border-radius: 20px;
      font-size: 13px; font-weight: 600; margin-bottom: 12px; text-transform: uppercase; letter-spacing: 1px;
    }
    h2 { font-size: 32px; color: #0d2461; font-weight: 700; margin-bottom: 20px; }
    .section-header { text-align: center; margin-bottom: 48px; }
    .section-header h2 { font-size: 36px; }
    .section-header p { color: #607d8b; font-size: 16px; }
    .section-header.left { text-align: left; margin-bottom: 32px; }

    .overview { background: #f8fbff; }
    .overview-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 60px; align-items: start; }
    .content p { color: #546e7a; line-height: 1.8; margin-bottom: 16px; }
    .stats-panel {
      background: linear-gradient(135deg, #0a2463, #1565c0);
      border-radius: 20px; padding: 32px;
      display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
    }
    .stat-item { text-align: center; }
    .stat-icon { font-size: 28px; margin-bottom: 8px; }
    .stat-num { color: white; font-size: 32px; font-weight: 800; }
    .stat-label { color: rgba(255,255,255,0.7); font-size: 13px; margin-top: 4px; }

    .mission-vision { background: white; }
    .mv-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
    .mv-card {
      padding: 36px 28px; border-radius: 16px; border: 1px solid #e3f2fd;
      transition: all 0.3s;
    }
    .mv-card:hover { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(30,136,229,0.12); }
    .mission { border-top: 4px solid #1e88e5; }
    .vision { border-top: 4px solid #00bcd4; }
    .values { border-top: 4px solid #43a047; }
    .mv-icon { font-size: 40px; margin-bottom: 16px; }
    .mv-card h3 { color: #0d2461; font-size: 20px; font-weight: 700; margin-bottom: 12px; }
    .mv-card p { color: #546e7a; line-height: 1.7; font-size: 15px; }

    .md-message { background: #f0f7ff; }
    .md-grid { display: grid; grid-template-columns: 300px 1fr; gap: 60px; align-items: center; }
    .md-photo {
      background: linear-gradient(135deg, #0a2463, #1565c0);
      border-radius: 20px; padding: 40px 20px; text-align: center;
    }
    .photo-placeholder span { font-size: 80px; display: block; margin-bottom: 16px; }
    .photo-name { color: white; font-weight: 700; font-size: 18px; }
    .photo-title { color: #90caf9; font-size: 14px; margin-top: 4px; }
    .quote-icon { font-size: 80px; color: #90caf9; line-height: 0.8; margin-bottom: 16px; font-family: Georgia, serif; }
    .md-content p { color: #546e7a; line-height: 1.8; margin-bottom: 16px; }
    .md-signature { color: #1565c0; font-weight: 600; font-size: 16px; margin-top: 24px; font-style: italic; }

    .infrastructure { background: white; }
    .infra-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 24px; }
    .infra-card {
      background: #f8fbff; border-radius: 16px; padding: 28px;
      border: 1px solid #e3f2fd; transition: all 0.3s;
    }
    .infra-card:hover { background: white; box-shadow: 0 8px 24px rgba(30,136,229,0.1); border-color: #90caf9; }
    .infra-icon { font-size: 36px; margin-bottom: 12px; }
    .infra-card h3 { color: #0d2461; font-size: 17px; font-weight: 700; margin-bottom: 8px; }
    .infra-card p { color: #607d8b; font-size: 14px; line-height: 1.6; }

    .placement { background: linear-gradient(135deg, #0a2463, #1a3a8c); }
    .placement h2 { color: white; }
    .placement-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 40px; }
    .placement-point {
      display: flex; gap: 16px; align-items: flex-start;
      background: rgba(255,255,255,0.08); border-radius: 12px; padding: 20px;
      border: 1px solid rgba(255,255,255,0.12);
    }
    .point-icon { font-size: 28px; flex-shrink: 0; }
    .placement-point h4 { color: white; font-size: 16px; font-weight: 600; margin-bottom: 6px; }
    .placement-point p { color: rgba(255,255,255,0.65); font-size: 14px; line-height: 1.6; }
    .btn-primary {
      display: inline-block; background: linear-gradient(135deg, #1e88e5, #00bcd4);
      color: white; padding: 14px 32px; border-radius: 8px;
      text-decoration: none; font-weight: 600; transition: all 0.3s;
    }
    .btn-primary:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,188,212,0.4); }
    .placement-cta { margin-top: 8px; }

    @media (max-width: 900px) {
      .overview-grid, .md-grid { grid-template-columns: 1fr; }
      .mv-grid, .infra-grid { grid-template-columns: 1fr 1fr; }
      .placement-grid { grid-template-columns: 1fr; }
    }
    @media (max-width: 600px) {
      .mv-grid, .infra-grid { grid-template-columns: 1fr; }
      .stats-panel { grid-template-columns: 1fr 1fr; }
    }
  `]
})
export class AboutComponent {
  stats = [
    { icon: '🎓', value: '5000+', label: 'Students Trained' },
    { icon: '📅', value: '15+', label: 'Years Experience' },
    { icon: '💼', value: '95%', label: 'Placement Rate' },
    { icon: '🏆', value: '500+', label: 'Hiring Partners' }
  ];

  infrastructure = [
    { icon: '🖥️', title: '50-Seat Computer Lab', desc: 'Latest configuration computers with high-speed internet, available for practice sessions even after class hours.' },
    { icon: '📡', title: 'High-Speed Internet', desc: 'Dedicated broadband connection ensuring uninterrupted online learning, research, and practical work.' },
    { icon: '📽️', title: 'Smart Classrooms', desc: 'Digital projectors and interactive boards for enhanced visual learning and better understanding of concepts.' },
    { icon: '📚', title: 'Resource Library', desc: 'Comprehensive library with books, e-learning materials, and practice software for self-study.' },
    { icon: '♿', title: 'Accessible Facility', desc: 'Fully accessible building with comfortable seating, proper ventilation, and inclusive infrastructure.' },
    { icon: '🔒', title: 'Safe Environment', desc: 'CCTV-monitored campus with secure entry, creating a safe and focused learning environment.' }
  ];

  placements = [
    { icon: '📋', title: 'Resume Building', desc: 'Professional resume crafting workshops and one-on-one guidance from career counselors.' },
    { icon: '🎤', title: 'Interview Preparation', desc: 'Mock interviews, GD sessions, and communication skill workshops to boost confidence.' },
    { icon: '🤝', title: 'Industry Connections', desc: 'Direct tie-ups with 500+ companies across Maharashtra for campus placements.' },
    { icon: '💡', title: 'Career Counselling', desc: 'Free personalized career guidance to help students choose the right career path.' }
  ];
}
