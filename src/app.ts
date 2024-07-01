import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { databaseConfig } from './config';
import { jwtConfig } from './config/jwt.config';
import { minioConfig } from './config/minio.config';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { CourseModule } from './modules/course/course.module';
import { CourseIntendModule } from './modules/course_intend/course_intend.module';
import { EnrollmentModule } from './modules/enrollment/enrollment.module';
import { LanguageModule } from './modules/language/language.module';
import { LessonModule } from './modules/lesson/lesson.module';
import { ModelModule } from './modules/model/model.module';
import { ModuleModule } from './modules/module/module.module';
import { PermissionModule } from './modules/permission/permission.module';
import { QuizModule } from './modules/quiz/quiz.module';
import { QuizAnswerModule } from './modules/quiz_answer/quiz_answer.module';
import { QuizQuestionModule } from './modules/quiz_question/quiz-question.module';
import { ResourceModule } from './modules/resource/resource.module';
import { RoleModule } from './modules/role/role.module';
import { TranslateModule } from './modules/translate/translate.module';
import { UserModule } from './modules/user/user.module';
import { UserQuizAttemptModule } from './modules/user_quiz_attempt/user_quiz_attempt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, minioConfig, jwtConfig],
    }),
    LanguageModule,
    TranslateModule,
    CategoryModule,
    CourseModule,
    CourseIntendModule,
    LessonModule,
    ModuleModule,
    UserModule,
    AuthModule,
    RoleModule,
    PermissionModule,
    ModelModule,
    ResourceModule,
    QuizModule,
    QuizQuestionModule,
    QuizAnswerModule,
    EnrollmentModule,
    UserQuizAttemptModule,
  ],
})
export class AppModule {}
