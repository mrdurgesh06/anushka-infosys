import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'courses',
    loadComponent: () => import('./courses/courses.component').then(m => m.CoursesComponent)
  },
  {
    path: 'courses/dca',
    loadComponent: () => import('./courses/dca/dca.component').then(m => m.DcaComponent)
  },
  {
    path: 'courses/adca',
    loadComponent: () => import('./courses/adca/adca.component').then(m => m.AdcaComponent)
  },
  {
    path: 'courses/cca',
    loadComponent: () => import('./courses/cca/cca.component').then(m => m.CcaComponent)
  },
  {
    path: 'courses/tally',
    loadComponent: () => import('./courses/tally/tally.component').then(m => m.TallyComponent)
  },
  {
    path: 'testimonials',
    loadComponent: () => import('./testimonials/testimonials.component').then(m => m.TestimonialsComponent)
  },
  {
    path: 'gallery',
    loadComponent: () => import('./gallery/gallery.component').then(m => m.GalleryComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
