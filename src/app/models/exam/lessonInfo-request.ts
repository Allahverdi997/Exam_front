import { LessonResponse, TeacherResponse } from "./lessonInfo-response";

export class LessonInfoRequest{
        id!: number;
        lesson?: LessonResponse;
        class?: number;
        teacher?:TeacherResponse;
}