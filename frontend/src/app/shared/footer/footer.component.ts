import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer>
      <div class="footer-main">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-brand">
              <div class="logo-wrap">
                <img src="assets/images/logo.png" alt="Anushka Infosys Logo" class="logo-img">
                <div>
                  <div class="brand-name">Anushka Infosys Pvt. Ltd.</div>
                  <div class="brand-sub">Complete IT Solution</div>
                  </div>
                </div>
              <p>Empowering students with industry-relevant computer skills for a brighter future. Your success is our mission.</p>
              <div class="social-links">
                <a href="#" aria-label="Facebook">f</a>
                <a href="#" aria-label="Instagram">in</a>
                <a href="#" aria-label="YouTube">▶</a>
                <a href="#" aria-label="WhatsApp">w</a>
              </div>
            </div>

            <div class="footer-links">
              <h4>Quick Links</h4>
              <nav>
                <a routerLink="/">Home</a>
                <a routerLink="/about">About Us</a>
                <a routerLink="/courses">Courses</a>
                <a routerLink="/testimonials">Testimonials</a>
                <a routerLink="/gallery">Gallery</a>
                <a routerLink="/contact">Contact</a>
              </nav>
            </div>

            <div class="footer-courses">
              <h4>Our Courses</h4>
              <nav>
                <a routerLink="/courses/dca">DCA – Diploma in Computer Applications</a>
                <a routerLink="/courses/adca">ADCA – Advanced Diploma</a>
                <a routerLink="/courses/cca">CCA – Certificate Course</a>
                <a routerLink="/courses/tally">Accounting with Tally</a>
              </nav>
            </div>

            <div class="footer-contact">
              <h4>Contact Info</h4>
              <div class="contact-item">
                <span class="icon">📍</span>
                <span>123, Main Road, City Center,<br>Noida U.P – 201301</span>
              </div>
              <div class="contact-item">
                <span class="icon">📞</span>
                <a href="tel:+919876543210">+91 98765 43210</a>
              </div>
              <div class="contact-item">
                <span class="icon">✉</span>
                <a href="mailto:info@anushkainfosys.com">info&#64;anushkainfosys.com</a>
              </div>
              <div class="contact-item">
                <span class="icon">🕐</span>
                <span>Mon–Sat: 9:00 AM – 7:00 PM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          <p>Powered by Yash infosoft © 2011/Yash infosoft Private Limited © 2026</p>
          <p>Designed with ❤ for quality education</p>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    footer {
      background: #051a52;
      color: #b0bec5;
    }
    .footer-main { padding: 60px 0 40px; }
    .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1.4fr 1.4fr;
      gap: 40px;
    }
    .logo-wrap { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }

    .logo-img {
      width: 48px;
      height: 48px;
      object-fit: contain;
      border-radius: 8px;
      background: white;
      padding: 3px;
    }
    .brand-name { color: white; font-weight: 700; font-size: 15px; }
    .brand-sub { color: #90caf9; font-size: 11px; }
    .footer-brand p { font-size: 14px; line-height: 1.7; margin-bottom: 20px; }
    .social-links { display: flex; gap: 10px; }
    .social-links a {
      width: 36px; height: 36px;
      background: rgba(30,136,229,0.2);
      border: 1px solid rgba(30,136,229,0.3);
      border-radius: 8px;
      display: flex; align-items: center; justify-content: center;
      color: #90caf9; text-decoration: none;
      font-size: 14px; font-weight: 700;
      transition: all 0.2s;
    }
    .social-links a:hover { background: #1e88e5; color: white; transform: translateY(-2px); }
    h4 { color: white; font-size: 16px; font-weight: 600; margin-bottom: 16px; position: relative; padding-bottom: 10px; }
    h4::after { content: ''; position: absolute; bottom: 0; left: 0; width: 30px; height: 2px; background: #1e88e5; border-radius: 2px; }
    nav { display: flex; flex-direction: column; gap: 10px; }
    nav a { color: #90a4ae; text-decoration: none; font-size: 14px; transition: color 0.2s; }
    nav a:hover { color: #90caf9; padding-left: 4px; }
    .contact-item { display: flex; align-items: flex-start; gap: 12px; margin-bottom: 12px; font-size: 14px; }
    .icon { font-size: 16px; flex-shrink: 0; margin-top: 2px; }
    .contact-item a { color: #90a4ae; text-decoration: none; }
    .contact-item a:hover { color: #90caf9; }
    .footer-bottom {
      border-top: 1px solid rgba(30,136,229,0.2);
      padding: 20px 0;
    }
    .footer-bottom .container {
      display: flex; justify-content: space-between; align-items: center;
      font-size: 13px;
    }
    @media (max-width: 1024px) {
      .footer-grid { grid-template-columns: 1fr 1fr; }
    }
    @media (max-width: 600px) {
      .footer-grid { grid-template-columns: 1fr; }
      .footer-bottom .container { flex-direction: column; gap: 8px; text-align: center; }
    }
  `]
})
export class FooterComponent {}
