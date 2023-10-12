import { Module } from "@nestjs/common";
import { TasksModule } from "./tasks/tasks.module";
import { MongooseModule } from "@nestjs/mongoose";
import { IsExistConstraint } from "../common/validators/exist.constraint";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    MongooseModule.forRoot(
      "mongodb+srv://llianandr94:GFQdMGOYLkTkkaCQ@task-service.qgbtwle.mongodb.net/",
      //TODO get url from .env
    ),
    AuthModule,
    UserModule,
    TasksModule,
  ],
  controllers: [],
  providers: [IsExistConstraint],
})
export class AppModule {}
