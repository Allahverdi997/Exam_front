import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./components/auth/auth.module').then(m => m.AuthModule) },
  { path: 'exam', loadChildren: () => import('./components/exam/exam.module').then(m => m.ExamModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes),HttpClientModule,],
  exports: [RouterModule]
})
export class AppRoutingModule { }
