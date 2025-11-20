import { LessonResponse } from "./lessonInfo-response";
import { StudentResponse } from "./student-response";

export class ExamResultResponse{
    id!: 0;
      lesson!:LessonResponse
      student!:StudentResponse
      examDate!: Date;
      examValue!: number;
}