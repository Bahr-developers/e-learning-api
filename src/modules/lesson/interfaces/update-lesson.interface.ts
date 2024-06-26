export declare interface UpdateLessonInterface {
    id: string
    name?: string;
    number?: number;
    module_id?: string;
    lesson_details?: string;
    video?:any;
    course_order?: number;
    is_preview_lesson?: boolean
}