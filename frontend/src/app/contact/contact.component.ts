import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../core/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  template: `
    <section class="page-hero">
      <div class="container">
        <div class="breadcrumb"><a routerLink="/">Home</a> / Contact</div>
        <h1>Get In Touch</h1>
        <p>We're here to help you choose the right course and launch your career</p>
      </div>
    </section>

    <section class="contact-section">
      <div class="container">
        <div class="contact-grid">

          <!-- Contact Info -->
          <div class="contact-info">
            <h2>Contact Information</h2>
            <p>Reach out to us via any of the following channels. Our team is available Monday to Saturday, 9 AM to 7 PM.</p>

            <div class="info-cards">
              <div class="info-card" *ngFor="let info of contactInfo">
                <div class="info-icon">{{ info.icon }}</div>
                <div>
                  <div class="info-label">{{ info.label }}</div>
                  <div class="info-value" [innerHTML]="info.value"></div>
                </div>
              </div>
            </div>

            <div class="map-placeholder">
              <div class="map-icon">🗺️</div>
              <p>Visit us at our institute for a free campus tour and counselling session</p>
              <a href="https://maps.google.com" target="_blank" class="map-btn">Open in Google Maps →</a>
            </div>
          </div>

          <!-- Contact Form -->
          <div class="form-section">
            <h2>Send Us a Message</h2>
            <p>Fill in the form below and we'll get back to you within 24 hours.</p>

            <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" class="contact-form">

              <div class="form-row">
                <div class="field">
                  <label>Full Name <span class="req">*</span></label>
                  <input type="text" formControlName="name" placeholder="Your Full Name" [class.error]="isInvalid('name')">
                  <div class="error-msg" *ngIf="isInvalid('name')">Please enter your full name (min 2 chars)</div>
                </div>
                <div class="field">
                  <label>Phone Number <span class="req">*</span></label>
                  <input type="tel" formControlName="phone" placeholder="+91 XXXXXXXXXX" [class.error]="isInvalid('phone')">
                  <div class="error-msg" *ngIf="isInvalid('phone')">Please enter a valid 10-digit phone number</div>
                </div>
              </div>

              <div class="field">
                <label>Email Address <span class="req">*</span></label>
                <input type="email" formControlName="email" placeholder="yourname@email.com" [class.error]="isInvalid('email')">
                <div class="error-msg" *ngIf="isInvalid('email')">Please enter a valid email address</div>
              </div>

              <div class="field">
                <label>Course Interested In <span class="req">*</span></label>
                <select formControlName="course" [class.error]="isInvalid('course')">
                  <option value="">-- Select a Course --</option>
                  <option value="DCA">DCA – Diploma in Computer Applications</option>
                  <option value="ADCA">ADCA – Advanced Diploma</option>
                  <option value="CCA">CCA – Certificate Course</option>
                  <option value="Tally">Accounting with Tally</option>
                  <option value="Other">Other / Not Sure</option>
                </select>
                <div class="error-msg" *ngIf="isInvalid('course')">Please select a course</div>
              </div>

              <div class="field">
                <label>Your Message <span class="req">*</span></label>
                <textarea formControlName="message" rows="5" placeholder="Tell us about your background, goals, or any questions you have..." [class.error]="isInvalid('message')"></textarea>
                <div class="error-msg" *ngIf="isInvalid('message')">Please enter a message (min 10 characters)</div>
              </div>

              <div class="success-msg" *ngIf="submitted()">
                <span>✅</span>
                <div>
                  <strong>Thank you!</strong>
                  <p>{{ successMessage() }}</p>
                </div>
              </div>

              <div class="error-banner" *ngIf="error()">
                ⚠️ Something went wrong. Please try again or call us directly.
              </div>

              <button type="submit" class="btn-submit" [disabled]="loading()">
                <span *ngIf="!loading()">Send Message →</span>
                <span *ngIf="loading()" class="loading-text">⏳ Sending...</span>
              </button>
            </form>
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
    .contact-section { padding: 80px 0; background: #f8fbff; }
    .contact-grid { display: grid; grid-template-columns: 1fr 1.4fr; gap: 48px; }
    .contact-info h2, .form-section h2 { color: #0d2461; font-size: 26px; font-weight: 700; margin-bottom: 12px; }
    .contact-info p, .form-section > p { color: #607d8b; margin-bottom: 28px; line-height: 1.7; }
    .info-cards { display: flex; flex-direction: column; gap: 16px; margin-bottom: 32px; }
    .info-card { display: flex; gap: 16px; align-items: flex-start; background: white; border-radius: 12px; padding: 18px; border: 1px solid #e3f2fd; }
    .info-icon { font-size: 24px; flex-shrink: 0; }
    .info-label { color: #90a4ae; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; }
    .info-value { color: #0d2461; font-size: 15px; font-weight: 500; line-height: 1.6; }
    .map-placeholder { background: linear-gradient(135deg, #0a2463, #1565c0); border-radius: 16px; padding: 32px; text-align: center; }
    .map-icon { font-size: 48px; margin-bottom: 12px; }
    .map-placeholder p { color: rgba(255,255,255,0.8); font-size: 15px; margin-bottom: 16px; }
    .map-btn { display: inline-block; background: white; color: #1565c0; padding: 10px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; }
    .contact-form { background: white; border-radius: 20px; padding: 36px; border: 1px solid #e3f2fd; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
    .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .field { margin-bottom: 20px; }
    label { display: block; color: #37474f; font-size: 14px; font-weight: 600; margin-bottom: 8px; }
    .req { color: #e53935; }
    input, select, textarea {
      width: 100%; padding: 12px 16px; border: 2px solid #e3f2fd;
      border-radius: 10px; font-size: 15px; color: #37474f;
      background: #f8fbff; transition: all 0.2s; outline: none;
      font-family: inherit; box-sizing: border-box;
    }
    input:focus, select:focus, textarea:focus { border-color: #1e88e5; background: white; box-shadow: 0 0 0 4px rgba(30,136,229,0.1); }
    input.error, select.error, textarea.error { border-color: #ef5350; background: #fff5f5; }
    .error-msg { color: #e53935; font-size: 12px; margin-top: 6px; }
    textarea { resize: vertical; min-height: 120px; }
    .success-msg { display: flex; align-items: flex-start; gap: 12px; background: #e8f5e9; border: 1px solid #a5d6a7; border-radius: 10px; padding: 16px; margin-bottom: 20px; }
    .success-msg span { font-size: 20px; }
    .success-msg strong { color: #2e7d32; display: block; margin-bottom: 4px; }
    .success-msg p { color: #388e3c; margin: 0; font-size: 14px; }
    .error-banner { background: #fff3f3; border: 1px solid #ffcdd2; border-radius: 10px; padding: 14px 16px; color: #c62828; font-size: 14px; margin-bottom: 20px; }
    .btn-submit {
      width: 100%; background: linear-gradient(135deg, #1e88e5, #00bcd4);
      color: white; border: none; padding: 16px; border-radius: 10px;
      font-size: 16px; font-weight: 700; cursor: pointer; transition: all 0.3s; font-family: inherit;
    }
    .btn-submit:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,188,212,0.4); }
    .btn-submit:disabled { opacity: 0.7; cursor: not-allowed; }
    @media (max-width: 900px) { .contact-grid { grid-template-columns: 1fr; } }
    @media (max-width: 600px) { .form-row { grid-template-columns: 1fr; } .contact-form { padding: 24px; } }
  `]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private api = inject(ApiService);

  loading = signal(false);
  submitted = signal(false);
  error = signal(false);
  successMessage = signal('');

  contactForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    phone: ['', [Validators.required, Validators.pattern(/^[+]?[\d\s\-()]{10,15}$/)]],
    email: ['', [Validators.required, Validators.email]],
    course: ['', Validators.required],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  isInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && control.touched);
  }

  onSubmit() {
    this.contactForm.markAllAsTouched();
    if (this.contactForm.invalid) return;

    this.loading.set(true);
    this.error.set(false);
    this.submitted.set(false);

    const value = this.contactForm.value;
    this.api.submitContact({
      name: value.name!,
      phone: value.phone!,
      email: value.email!,
      course: value.course!,
      message: value.message!
    }).subscribe({
      next: (res) => {
        this.loading.set(false);
        this.submitted.set(true);
        this.successMessage.set(res.message || 'Your enquiry has been submitted. We will contact you soon!');
        this.contactForm.reset();
      },
      error: () => {
        this.loading.set(false);
        this.error.set(true);
      }
    });
  }

  contactInfo = [
    { icon: '📍', label: 'Address', value: '123, Main Road, City Center,<br>Noida U.P – 201301' },
    { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
    { icon: '✉️', label: 'Email', value: 'info@anushkainfosys.com' },
    { icon: '🕐', label: 'Office Hours', value: 'Monday – Saturday: 9:00 AM – 7:00 PM' }
  ];
}
