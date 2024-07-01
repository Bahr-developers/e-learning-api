-- AddForeignKey
ALTER TABLE "user_lesson" ADD CONSTRAINT "user_lesson_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
