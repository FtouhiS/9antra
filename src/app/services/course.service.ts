import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course'; // Adjust the path as per your project structure

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private baseUrl = 'http://localhost:8089/course'; // Adjust URL based on your backend API

  constructor(private http: HttpClient) { }

  getAllCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(`${this.baseUrl}/getAll`);
  }

  addCourse(course: Course, imageFile: File | null): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('courseName', course.courseName);
    formData.append('coursePrice', course.coursePrice.toString());
    if (imageFile) {
      formData.append('imageFile', imageFile, imageFile.name);
    }

    return this.http.post(`${this.baseUrl}/addCourse`, formData);
  }
  getCourseById(idCourse: number): Observable<Course> {
    return this.http.get<Course>(`${this.baseUrl}/${idCourse}`);
  }

  updateCourse(idCourse: number, course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.baseUrl}/update/${idCourse}`, course);
  }
 
  deleteCourse(idCourse: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/deleteCourse/${idCourse}`);
  }
}
