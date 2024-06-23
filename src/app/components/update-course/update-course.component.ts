import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-update-course',
  templateUrl: './update-course.component.html',
  styleUrls: ['./update-course.component.css']
})
export class UpdateCourseComponent implements OnInit {
  courseForm!: FormGroup;
  idCourse!: number;
  course: Course = new Course();
  successMessage: string = '';
  errorMessage: string = '';
  selectedFile: File | undefined;
  imageUrl: string | ArrayBuffer | null = null; // Correct type for imageUrl
  imageFile: File | undefined;
  message: string | undefined;
  imagePath: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      courseName: ['', Validators.required],
      coursePrice: ['', Validators.required],
      courseImage: ['']
    });

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.idCourse = Number(idParam);
        if (!isNaN(this.idCourse)) {
          this.loadCourse(this.idCourse);
        } else {
          console.error('Invalid course ID: Not a number');
        }
      } else {
        console.error('Invalid course ID: Parameter missing');
      }
    });
  }

  loadCourse(idCourse: number): void {
    this.courseService.getCourseById(idCourse).subscribe(
      (course: Course) => {
        if (course) {
          this.course = course;
          this.courseForm.patchValue({
            courseName: course.courseName,
            coursePrice: course.coursePrice,
            // courseImage: course.courseImage // Assuming courseImage is a field in Course
          });
        } else {
          console.error('Course not found.');
        }
      },
      error => {
        console.error('Error fetching course:', error);
      }
    );
  }

  updateCourse(): void {
    if (this.courseForm.valid) {
      const updatedCourse: Course = {
        idCourse: this.idCourse,
        courseName: this.courseForm.value.courseName,
        coursePrice: this.courseForm.value.coursePrice,
        imageFile: this.courseForm.value.imageFile
      };

      this.courseService.updateCourse(this.idCourse, updatedCourse).subscribe(
        () => {
          console.log('Course updated successfully');
          this.successMessage = 'Course updated successfully';
          setTimeout(() => {
            this.router.navigate(['/courses'], { queryParams: { updated: 'true' } });
          }, 2000); // Navigate to /courses after 2 seconds
        },
        error => {
          console.error('Error updating course:', error);
          this.errorMessage = 'Failed to update course. Please try again.';
        }
      );
    } else {
      console.error('Invalid form data.');
    }
  }
  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.selectedFile = file;
  
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.imageUrl = reader.result as string; // Update imageUrl for preview
      };
    }
  
  }
}