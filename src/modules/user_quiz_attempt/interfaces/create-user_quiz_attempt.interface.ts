export declare interface UserAnswers {
    question_id: string;
    answer_id: string;
}

export declare interface CreateUserQuizAttemptInterface {
    quiz_id: string;
    answers: UserAnswers[]
}