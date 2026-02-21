import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  template: `
    <header [class.scrolled]="isScrolled()">
      <div class="container">
        <div class="logo">
          <a routerLink="/">
            <img src="assets/images/logo.png" alt="Anushka Infosys Logo" class="logo-img" width="44" height="44">
              <div class="logo-text">
                <span class="brand-name">Anushka Infosys</span>
                <span class="brand-tagline">Complete IT Solution</span>
              </div>
          </a>
        </div>

        <nav [class.open]="menuOpen()">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact:true}" (click)="closeMenu()">Home</a>
          <a routerLink="/about" routerLinkActive="active" (click)="closeMenu()">About</a>
          <div class="dropdown">
            <a routerLink="/courses" routerLinkActive="active" (click)="closeMenu()">Courses ▾</a>
            <div class="dropdown-menu">
              <a routerLink="/courses/dca" (click)="closeMenu()">DCA</a>
              <a routerLink="/courses/adca" (click)="closeMenu()">ADCA</a>
              <a routerLink="/courses/cca" (click)="closeMenu()">CCA</a>
              <a routerLink="/courses/tally" (click)="closeMenu()">Tally</a>
            </div>
          </div>
          <a routerLink="/testimonials" routerLinkActive="active" (click)="closeMenu()">Testimonials</a>
          <a routerLink="/gallery" routerLinkActive="active" (click)="closeMenu()">Gallery</a>
          <a routerLink="/contact" class="btn-contact" (click)="closeMenu()">Contact Us</a>
        </nav>

        <button class="hamburger" (click)="toggleMenu()" [class.active]="menuOpen()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  `,
  styles: [`
    header {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background: rgba(10, 36, 99, 0.95);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
      border-bottom: 2px solid transparent;
    }
    header.scrolled {
      background: #0a2463;
      border-bottom-color: #1e88e5;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    }
    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 70px;
    }
    .logo a {
      display: flex;
      align-items: center;
      gap: 12px;
      text-decoration: none;
    }
    .logo-img {
        width: 44px;
        height: 44px;
        object-fit: contain;
        border-radius: 8px;
        background: white;
        padding: 2px;
        image-rendering: auto;
    }
    .logo-text {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      color: white;
      font-weight: 700;
      font-size: 16px;
      line-height: 1.2;
    }
    .brand-tagline {
      color: #90caf9;
      font-size: 11px;
      letter-spacing: 1px;
    }
    nav {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    nav a {
      color: #e3f2fd;
      text-decoration: none;
      padding: 8px 14px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.2s;
    }
    nav a:hover, nav a.active {
      color: white;
      background: rgba(30, 136, 229, 0.25);
    }
    nav a.btn-contact {
      background: linear-gradient(135deg, #1e88e5, #00bcd4);
      color: white;
      padding: 9px 20px;
      margin-left: 8px;
      font-weight: 600;
    }
    nav a.btn-contact:hover {
      background: linear-gradient(135deg, #1565c0, #00acc1);
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(0,188,212,0.4);
    }
    .dropdown {
      position: relative;
    }
    .dropdown-menu {
      display: none;
      position: absolute;
      top: calc(100% + 8px);
      left: 0;
      background: #0d3280;
      border: 1px solid rgba(30,136,229,0.3);
      border-radius: 8px;
      padding: 8px;
      min-width: 140px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    }
    .dropdown:hover .dropdown-menu { display: flex; flex-direction: column; }
    .dropdown-menu a { border-radius: 4px; font-size: 13px; white-space: nowrap; }
    .hamburger {
      display: none;
      flex-direction: column;
      gap: 5px;
      cursor: pointer;
      background: none;
      border: none;
      padding: 4px;
    }
    .hamburger span {
      display: block;
      width: 24px;
      height: 2px;
      background: white;
      transition: all 0.3s;
      border-radius: 2px;
    }
    .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
    @media (max-width: 768px) {
      .hamburger { display: flex; }
      nav {
        display: none;
        position: fixed;
        top: 70px;
        left: 0;
        right: 0;
        background: #0a2463;
        flex-direction: column;
        padding: 20px;
        gap: 4px;
        border-top: 1px solid rgba(30,136,229,0.3);
      }
      nav.open { display: flex; }
      nav a { width: 100%; text-align: center; }
      .dropdown-menu { position: static; display: none; background: rgba(255,255,255,0.05); }
      .dropdown:hover .dropdown-menu { display: flex; }
    }
  `]
})
export class HeaderComponent {
  isScrolled = signal(false);
  menuOpen = signal(false);

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 30);
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }
}
