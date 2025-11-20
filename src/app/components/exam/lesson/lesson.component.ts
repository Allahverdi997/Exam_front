import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExamService } from 'src/app/services/exam-service';
import { BaseResponse } from 'src/app/models/base-response';
import Swal from 'sweetalert2';
import { PagingRequest } from 'src/app/models/paging-request';
import { LessonInfoResponse, LessonResponse, TeacherResponse } from 'src/app/models/exam/lessonInfo-response';
import { LessonInfoRequest } from 'src/app/models/exam/lessonInfo-request';

declare var bootstrap: any;

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {

  lessons: LessonInfoResponse[] = [];
  lessonForm: FormGroup;
  isEditMode: boolean = false;
  editIndex: number = -1;
  isLoading: boolean = false;

  pagingRequest:PagingRequest=new PagingRequest();

  lessonModal: any;

  constructor(private fb: FormBuilder, private examService: ExamService) {
    this.lessonForm = this.fb.group({
      id: [0],
      code: ['', [Validators.required, Validators.maxLength(3)]],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      class: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      teacherName: ['', [Validators.required, Validators.maxLength(20)]],
      teacherSurname: ['', [Validators.required, Validators.maxLength(20)]]
    });
  }

  ngOnInit(): void {
    this.getLessons();

    const modalEl = document.getElementById('lessonModal');
    if (modalEl) this.lessonModal = new bootstrap.Modal(modalEl);
  }

  openAddModal() {
    this.isEditMode = false;
    this.lessonForm.reset({ id: 0 });
    this.lessonModal.show();
  }

  submit() {
    debugger;
    if (this.lessonForm.invalid) return;

    this.isLoading = true;
   
    const formValue = this.lessonForm.value;

  const request: LessonInfoRequest = {
    id: formValue.id ?? 0,
    class: formValue.class,
    lesson: {
      code: formValue.code,
      name: formValue.name
    } as LessonResponse,
    teacher: {
      name: formValue.teacherName,
      surname: formValue.teacherSurname
    } as TeacherResponse
  };

    request.id = request.id ?? 0;

    this.examService.save<BaseResponse<LessonResponse>, LessonInfoRequest>(request, "Lesson").subscribe(
      (resp) => {
        this.isLoading = false;
        if (resp.success) {
          this.lessonModal.hide();
          this.resetForm();
          this.getLessons();
        }
      },
      (err) => {
        this.isLoading = false;
        this.showError(err.message);
      }
    );
  }
  totalCount: number = 0;
  getLessons() {
    this.isLoading = true;
    this.examService.getExamEntities<LessonResponse>(this.pagingRequest, "Lesson").subscribe(
      (resp) => {
        this.isLoading = false;
        if (resp.success) {
          this.lessons = resp.data!;
          this.totalCount = resp.pagingResponse?.DataCount ?? resp.data!.length;
        }
      },
      (err) => {
        this.isLoading = false;
        this.showError(err.message);
      }
    );
  }

  resetForm() {
    this.lessonForm.reset({ id: 0 });
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

  onPageChange(newPage: number) {
  this.pagingRequest.pageNumber = newPage;
  this.getLessons();
}
}
