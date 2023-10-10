import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { IsExistConstraint } from '../common/validators/exist.constraint';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://llianandr94:GFQdMGOYLkTkkaCQ@task-service.qgbtwle.mongodb.net/',
      //TODO get url from .env
    ),
    TasksModule,
  ],
  controllers: [],
  providers: [IsExistConstraint],
})
export class AppModule {}
