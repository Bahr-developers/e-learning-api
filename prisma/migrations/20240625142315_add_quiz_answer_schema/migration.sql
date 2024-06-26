-- CreateTable
CREATE TABLE "quiz_answer" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "answer_text" VARCHAR NOT NULL,
    "is_correct" BOOLEAN NOT NULL DEFAULT false,
    "question_id" UUID NOT NULL,

    CONSTRAINT "quiz_answer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz_answer" ADD CONSTRAINT "quiz_answer_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "quiz_question"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
