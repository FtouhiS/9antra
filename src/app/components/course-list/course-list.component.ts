import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { Course } from 'src/app/models/course'; // Adjust import path as per your project structure
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  courseForm: FormGroup;
  selectedCourse: Course | null = null;
  imageFile: File | null = null;
  confirmDeleteMessage = false; // Flag to toggle delete confirmation message
  courseIdToDelete: number | null = null; // Track the course ID pending deletion

  constructor(private courseService: CourseService, private fb: FormBuilder, private router: Router) { 
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      coursePrice: ['', Validators.required],
      courseImage: ['']
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

  toggleConfirmDelete(courseId: number): void {
    this.confirmDeleteMessage = !this.confirmDeleteMessage;
    this.courseIdToDelete = this.confirmDeleteMessage ? courseId : null; // Set course ID to delete
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.imageFile = event.target.files[0];
    }
  }

  addCourse(): void {
    if (this.courseForm.valid) {
      const courseData = this.courseForm.value;
      this.courseService.addCourse(courseData, this.imageFile).subscribe(
        (response) => {
          console.log('Course added successfully:', response);
          this.resetFormAndReload();
        },
        error => {
          console.error('Error adding course:', error);
        }
      );
    } else {
      console.error('Invalid form data.');
    }
  }

  updateCourse(): void {
    if (this.selectedCourse) {
      this.courseService.updateCourse(this.selectedCourse.idCourse, this.selectedCourse).subscribe(
        (response) => {
          console.log('Course updated successfully:', response);
          this.resetFormAndReload();
        },
        error => {
          console.error('Error updating course:', error);
        }
      );
    } else {
      console.error('No course selected for update.');
    }
  }

  deleteCourse(): void {
    if (this.courseIdToDelete) {
      this.courseService.deleteCourse(this.courseIdToDelete).subscribe(
        () => {
          console.log('Course deleted successfully:', this.courseIdToDelete);
          // Filter out the deleted course from the courses array
          this.courses = this.courses.filter(course => course.idCourse !== this.courseIdToDelete);
          this.resetConfirmDelete(); // Reset confirmation message state
        },
        error => {
          console.error('Error deleting course:', error);
        }
      );
    }
  }

  navigateToUpdateCourse(courseId: number): void {
    this.router.navigate(['/update-course', courseId]);
  }

  selectCourse(course: Course): void {
    this.selectedCourse = course;
    this.courseForm.patchValue({
      courseName: course.courseName,
      coursePrice: course.coursePrice
    });
  }

  resetFormAndReload(): void {
    this.courseForm.reset();
    this.imageFile = null;
    this.selectedCourse = null;
    this.loadCourses();
  }

  navigateToAddCourse(): void {
    this.router.navigate(['/add-course']);
  }

  getImageUrl(imageFile: string): string {
    return `http://localhost:8089/image/${imageFile}`;
  }

  resetConfirmDelete(): void {
    this.confirmDeleteMessage = false;
    this.courseIdToDelete = null;
  }
}
