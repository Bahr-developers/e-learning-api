-- CreateTable
CREATE TABLE "quiz_question" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "title" VARCHAR NOT NULL,
    "quiz_id" UUID NOT NULL,

    CONSTRAINT "quiz_question_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz_question" ADD CONSTRAINT "quiz_question_quiz_id_fkey" FOREIGN KEY ("quiz_id") REFERENCES "quiz"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
