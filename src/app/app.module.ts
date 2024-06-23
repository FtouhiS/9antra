import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CourseListComponent } from './components/course-list/course-list.component';
import { HomeComponent } from './home/home.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { UpdateCourseComponent } from './components/update-course/update-course.component';

@NgModule({
  declarations: [
    AppComponent,
    CourseListComponent,
    HomeComponent,
    AddCourseComponent,
    UpdateCourseComponent,

    
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule, 
    FormsModule, // Add FormsModule here
    // Add this line to import ReactiveFormsModule
    HttpClientModule,
    AppRoutingModule // Ensure AppRoutingModule is imported here

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
