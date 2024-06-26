-- CreateTable
CREATE TABLE "quiz" (
    "id" UUID NOT NULL DEFAULT GEN_RANDOM_UUID(),
    "name" VARCHAR NOT NULL,
    "description" VARCHAR NOT NULL,
    "number" INTEGER NOT NULL,
    "course_order" INTEGER NOT NULL,
    "min_pas_score" INTEGER NOT NULL,
    "is_pass_required" BOOLEAN NOT NULL DEFAULT true,
    "course_id" UUID NOT NULL,

    CONSTRAINT "quiz_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "quiz" ADD CONSTRAINT "quiz_course_id_fkey" FOREIGN KEY ("course_id") REFERENCES "course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
