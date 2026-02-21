import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Course {
  id: number;
  name: string;
  shortName: string;
  description: string;
  duration: string;
  eligibility: string;
  syllabus: string[];
  outcomes: string[];
  fee: number;
}

export interface Testimonial {
  id: number;
  studentName: string;
  course: string;
  review: string;
  rating: number;
  photoUrl?: string;
  companyPlaced?: string;
}

export interface ContactForm {
  name: string;
  phone: string;
  email: string;
  course: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCourses(): Observable<Course[]> {
    return this.http.get<ApiResponse<Course[]>>(`${this.apiUrl}/courses`).pipe(
      map(res => res.data)
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<ApiResponse<Course>>(`${this.apiUrl}/courses/${id}`).pipe(
      map(res => res.data)
    );
  }

  getTestimonials(): Observable<Testimonial[]> {
    return this.http.get<ApiResponse<Testimonial[]>>(`${this.apiUrl}/testimonials`).pipe(
      map(res => res.data)
    );
  }

  submitContact(form: ContactForm): Observable<ApiResponse<null>> {
    return this.http.post<ApiResponse<null>>(`${this.apiUrl}/contact`, form);
  }
}
