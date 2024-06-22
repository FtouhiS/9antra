import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  courses: Course[] = [];
  courseForm: FormGroup;
  selectedCourse: Course | null = null;
  imageFile: File | null = null;

  constructor(private courseService: CourseService, private fb: FormBuilder) { 
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      coursePrice: ['', Validators.required],
      imageFile: ['']
    });
  }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (data: Course[]) => {
        this.courses = data;
      },
      error => {
        console.error('Error fetching courses:', error);
      }
    );
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  getImageUrl(imageFile: string): string {
    return `assets/${imageFile}`;
  }
  
  }

 