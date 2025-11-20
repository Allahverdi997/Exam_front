import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student/student.component';
import { LessonComponent } from './lesson/lesson.component';
import { ExamResultComponent } from './exam-result/exam-result.component';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'exam-results', component: ExamResultComponent },
      { path: 'students', component: StudentComponent },
      { path: 'lessons', component: LessonComponent },
      { path: '', redirectTo: 'exam-results', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    StudentComponent,
    LessonComponent,
    ExamResultComponent,
    SidebarComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ]
})
export class ExamModule { }
