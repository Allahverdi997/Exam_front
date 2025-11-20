import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from 'src/app/services/exam-service';
import { BaseResponse } from 'src/app/models/base-response';
import { StudentResponse } from 'src/app/models/exam/student-response';
import Swal from 'sweetalert2';
import { ExamResultResponse } from 'src/app/models/exam/examResult-response';
import { LessonInfoResponse, LessonResponse } from 'src/app/models/exam/lessonInfo-response';
import { ExamResultRequest } from 'src/app/models/exam/examResult-request';
import { PagingRequest } from 'src/app/models/paging-request';

declare var bootstrap: any;

@Component({
  selector: 'app-exam-result',
  templateUrl: './exam-result.component.html',
  styleUrls: ['./exam-result.component.css']
})
export class ExamResultComponent implements OnInit {

  examResults: ExamResultResponse[] = [];
  students: StudentResponse[] = [];
  lessonInfos: LessonInfoResponse[] = [];
  
  examForm: FormGroup;
  isEditMode: boolean = false;
  editIndex: number = -1;
  isLoading: boolean = false;

  pagingRequest:PagingRequest=new PagingRequest();

  examModal: any;

  constructor(private fb: FormBuilder, private examService: ExamService) {
    this.examForm = this.fb.group({
      id: [0],
      lessonId: [null, Validators.required],
      studentId: [null, Validators.required],
      examDate: [null, Validators.required],
      examValue: [null, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
    this.getExamResults();
    this.getStudents();
    this.getLessons();

    const modalEl = document.getElementById('examModal');
    if (modalEl) this.examModal = new bootstrap.Modal(modalEl);
  }

  openAddModal() {
    this.isEditMode = false;
    this.examForm.reset({ id: 0 });
    this.examModal.show();
  }

  submit() {

    debugger;
    if (this.examForm.invalid) return;

    this.isLoading = true;

    const formValue = this.examForm.value;
    const request: ExamResultRequest = {
      id: formValue.id ?? 0,
      lessonId: formValue.lessonId,
      studentId: formValue.studentId,
      examDate: formValue.examDate,
      examValue: formValue.examValue
    };

    this.examService.save<BaseResponse<ExamResultResponse>, ExamResultRequest>(request, "ExamResult")
      .subscribe(resp => {
        this.isLoading = false;
        if (resp.success) {
          this.examModal.hide();
          this.resetForm();
          this.getExamResults();
        }
      }, err => {
        this.isLoading = false;
        this.showError(err.message);
      });
  }
totalCount: number = 0;
  getExamResults() {

    debugger;
    this.isLoading = true;
    this.examService.getExamEntities<ExamResultResponse>(this.pagingRequest, "ExamResult").subscribe(resp => {
      this.isLoading = false;
      if (resp.success) 
        {
          this.examResults = resp.data!;
        }
    }, err => {
      this.isLoading = false;
      this.showError(err.message);
    });
  }

  getStudents() {
    this.examService.getExamEntities<StudentResponse>(this.pagingRequest, "Student").subscribe(resp => {
      if (resp.success) this.students = resp.data!;
    });
  }

  getLessons() {
    this.examService.getExamEntities<LessonInfoResponse>(this.pagingRequest, "Lesson").subscribe(resp => {
      if (resp.success) this.lessonInfos = resp.data!;
    });
  }

  resetForm() {
    this.examForm.reset({ id: 0 });
    this.isEditMode = false;
    this.editIndex = -1;
  }

  showError(error: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error || 'Unknown error',
      confirmButtonText: 'OK'
    });
  }
}
