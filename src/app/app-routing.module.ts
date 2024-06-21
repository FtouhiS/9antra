// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { HomeComponent } from './home/home.component';
import { UpdateCourseComponent } from './update-course/update-course.component';


const routes: Routes = [
  { path: '',component:HomeComponent },
  { path: 'courses', component: CourseListComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'update-course/:id', component: UpdateCourseComponent },

  // Add more routes as needed
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  { path: '**', redirectTo: '/courses' }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
