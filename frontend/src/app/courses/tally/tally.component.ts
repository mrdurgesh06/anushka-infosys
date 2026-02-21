import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tally',
  standalone: true,
  imports: [RouterLink, CommonModule],
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a routerLink="/">Home</a> / <a routerLink="/courses">Courses</a> / Tally</div>
        <div class="hero-content">
          <div class="course-badge-big">📊</div>
          <h1>TALLY</h1>
          <p>Accounting with Tally ERP & GST</p>
          <div class="meta-chips">
            <span>⏱ 3 Months</span><span>📋 12th Commerce</span><span>💰 ₹5,000</span><span>🏆 Certified</span>
          </div>
          <a routerLink="/contact" class="btn-enroll">Enroll Now →</a>
        </div>
      </div>
    </section>
    <section class="course-detail">
      <div class="container">
        <div class="detail-grid">
          <div class="main-content">
            <div class="section-block">
              <h2>Course Overview</h2>
              <p>The Accounting with Tally ERP course is a specialized 3-month program designed for commerce students and aspiring accountants. You will master Tally Prime, GST filing, payroll management, and financial reporting. This course is highly in demand by small businesses, CA firms, and corporate finance departments across India.</p>
            </div>
            <div class="section-block">
              <h2>📚 Syllabus</h2>
              <div class="syllabus-grid">
                <div class="syllabus-item" *ngFor="let item of syllabus; let i = index">
                  <span class="syl-num">{{ i + 1 }}</span><span>{{ item }}</span>
                </div>
              </div>
            </div>
            <div class="section-block">
              <h2>🎯 Career Outcomes</h2>
              <div class="outcomes-list">
                <div class="outcome" *ngFor="let out of outcomes"><span class="check">✓</span>{{ out }}</div>
              </div>
            </div>
          </div>
          <div class="sidebar">
            <div class="enroll-card">
              <div class="fee">₹5,000</div>
              <div class="fee-label">Course Fee</div>
              <div class="info-rows">
                <div class="info-row"><span>Duration</span><span>3 Months</span></div>
                <div class="info-row"><span>Eligibility</span><span>12th Commerce</span></div>
                <div class="info-row"><span>Mode</span><span>Classroom</span></div>
                <div class="info-row"><span>Software</span><span>Tally Prime + ERP9</span></div>
                <div class="info-row"><span>Placement</span><span>100% Support</span></div>
              </div>
              <a routerLink="/contact" class="btn-enroll-full">Apply Now</a>
              <a href="tel:+919876543210" class="btn-call">📞 Call for Details</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-hero { background: linear-gradient(135deg, #43a047, #2e7d32); padding: 120px 0 60px; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .breadcrumb { color: rgba(255,255,255,0.6); font-size: 14px; margin-bottom: 24px; }
    .breadcrumb a { color: #c8e6c9; text-decoration: none; }
    .hero-content { text-align: center; }
    .course-badge-big { font-size: 64px; margin-bottom: 8px; }
    .page-hero h1 { color: white; font-size: 56px; font-weight: 900; margin-bottom: 8px; }
    .page-hero p { color: rgba(255,255,255,0.8); font-size: 20px; margin-bottom: 24px; }
    .meta-chips { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-bottom: 28px; }
    .meta-chips span { background: rgba(255,255,255,0.15); color: white; padding: 8px 18px; border-radius: 20px; font-size: 14px; }
    .btn-enroll { display: inline-block; background: white; color: #2e7d32; padding: 14px 36px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 16px; }
    .course-detail { padding: 80px 0; background: #f8fbff; }
    .detail-grid { display: grid; grid-template-columns: 1fr 340px; gap: 40px; align-items: start; }
    .section-block { background: white; border-radius: 16px; padding: 32px; margin-bottom: 24px; border: 1px solid #e8f5e9; }
    .section-block h2 { color: #0d2461; font-size: 22px; font-weight: 700; margin-bottom: 16px; }
    .section-block p { color: #546e7a; line-height: 1.8; }
    .syllabus-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .syllabus-item { display: flex; align-items: center; gap: 12px; background: #e8f5e9; border-radius: 8px; padding: 12px 16px; }
    .syl-num { width: 28px; height: 28px; background: #43a047; border-radius: 6px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 13px; flex-shrink: 0; }
    .syllabus-item span:last-child { color: #37474f; font-size: 14px; font-weight: 500; }
    .outcomes-list { display: flex; flex-direction: column; gap: 12px; }
    .outcome { display: flex; align-items: center; gap: 12px; color: #37474f; font-size: 15px; }
    .check { color: #43a047; font-weight: 700; font-size: 16px; }
    .enroll-card { background: white; border-radius: 16px; padding: 28px; border: 1px solid #e8f5e9; position: sticky; top: 90px; }
    .fee { font-size: 40px; font-weight: 800; color: #0d2461; }
    .fee-label { color: #90a4ae; font-size: 14px; margin-bottom: 24px; }
    .info-rows { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .info-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #f0f4f8; font-size: 14px; }
    .info-row span:first-child { color: #90a4ae; }
    .info-row span:last-child { color: #0d2461; font-weight: 600; }
    .btn-enroll-full { display: block; background: linear-gradient(135deg, #43a047, #2e7d32); color: white; padding: 14px; border-radius: 8px; text-decoration: none; font-weight: 600; text-align: center; margin-bottom: 12px; }
    .btn-call { display: block; border: 2px solid #43a047; color: #43a047; padding: 12px; border-radius: 8px; text-decoration: none; font-weight: 600; text-align: center; }
    @media (max-width: 900px) { .detail-grid { grid-template-columns: 1fr; } }
    @media (max-width: 600px) { .syllabus-grid { grid-template-columns: 1fr; } }
  `]
})
export class TallyComponent {
  syllabus = ['Accounting Fundamentals', 'Tally Prime (Latest)', 'GST Filing & Returns', 'Payroll Management', 'Bank Reconciliation', 'Balance Sheet & P&L', 'Inventory Management', 'MIS Reports & Analytics'];
  outcomes = ['Accountant', 'GST Practitioner', 'Tally Operator', 'Finance Executive', 'Bookkeeper', 'CA Firm Assistant'];
}
