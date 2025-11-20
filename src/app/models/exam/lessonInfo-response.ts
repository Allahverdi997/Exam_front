export class LessonInfoResponse{
    id!: number;
    lesson?: LessonResponse;
    class?: number;
    teacher?:TeacherResponse;
}

export class TeacherResponse{
    id!: number;
    name!: string;
    surname!: string;
}

export class LessonResponse{
    id!: number;
    code?: string;
    name!: string;
}