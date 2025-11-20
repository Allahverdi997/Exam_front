import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseResponse } from 'src/app/models/base-response';
import { StudentRequest } from 'src/app/models/exam/student-request';
import { StudentResponse } from 'src/app/models/exam/student-response';
import { PagingRequest } from 'src/app/models/paging-request';
import { ExamService } from 'src/app/services/exam-service';
import Swal from 'sweetalert2';

declare var bootstrap: any;
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: StudentResponse[] = [];
  studentForm: FormGroup;
  isEditMode: boolean = false;
  editIndex: number = -1;
  pagingRequest:PagingRequest=new PagingRequest();

  isLoading: boolean = false;

  studentModal: any;

  constructor(private fb: FormBuilder,private examService:ExamService) {
    this.studentForm = this.fb.group({
      id: [0],
      name: ['', [Validators.required, Validators.maxLength(30)]],
      surname: ['', [Validators.required, Validators.maxLength(30)]],
      class: [null, [Validators.required, Validators.min(1), Validators.max(99)]],
      number: [null, [Validators.required, Validators.min(1), Validators.max(9999)]],
    });
  }

  ngOnInit(): void {
    this.getStudents();

    const modalEl = document.getElementById('studentModal');
    if (modalEl) this.studentModal = new bootstrap.Modal(modalEl);
  }

   openAddModal() {
    this.isEditMode = false;
    this.studentForm.reset();
    this.studentModal.show();
  }

  submit() {

    debugger;
    if (this.studentForm.invalid) return;

      const request: StudentRequest = this.studentForm.value;

      request.id = request.id ?? 0;

    this.examService.save<BaseResponse<StudentResponse>,StudentRequest>(request,"Student").subscribe(
      (resp)=>{
        if(resp.success)
        {
this.studentModal.hide();
      this.resetForm();
      this.isLoading = false;

      this.getStudents();
        }
      
      }
    )

      
  }

  totalCount: number = 0;

  getStudents(){
    debugger;
    this.examService.getExamEntities<StudentResponse>(this.pagingRequest,"Student").subscribe(
      (resp)=>{
        debugger;
        if(resp.success)
        {
          this.students=resp.data!;
          this.isLoading = false;
          this.totalCount = resp.pagingResponse?.DataCount ?? resp.data!.length;
          return;
        }
      }
    )
  }

  resetForm() {
    this.studentForm.reset();
    this.isEditMode = false;
    this.editIndex = -1;
  }

  showError(error:string){
    Swal.fire({
          icon: 'error',
          title: 'Error',
          text:  error|| 'Unknown error',
          confirmButtonText: 'OK'
        });
  }

  onPageChange(newPage: number) {
  this.pagingRequest.pageNumber = newPage;
  this.getStudents();
}
}
