import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent {
  @ViewChild('courseForm') courseForm!: NgForm;
  selectedFile: File | undefined;
  imageUrl: string | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  submitForm(): void {
    if (this.courseForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append('courseName', this.courseForm.value.courseName);
      formData.append('coursePrice', this.courseForm.value.coursePrice);
      formData.append('imageFile', this.selectedFile, this.selectedFile.name);

      this.http.post<any>('http://localhost:8089/course/addCourse', formData)
        .subscribe(
          response => {
            console.log('Course added successfully!', response);
            this.courseForm.resetForm();
            this.selectedFile = undefined; // Reset file input
            this.imageUrl = response.imageUrl; // Assuming the backend returns imageUrl
            this.router.navigate(['/courses']); // Navigate to /courses route
          },
          (error: HttpErrorResponse) => {
            console.error('Error adding course:', error.message); // Log the error message
            alert('Error adding course: ' + error.message); // Display a user-friendly error message
          }
        );
    } else {
      console.error('Form is invalid or file is not selected.');
      alert('Form is invalid or file is not selected.');
    }
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }
}
