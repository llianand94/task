import mongoose from "mongoose";
import { EStatus } from "common/enum";
import { Type } from "class-transformer";
import {
  IsEnum,
  IsArray,
  IsString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { IsExist } from "common/decorators/exist.decorator";
import { Task } from "../../schemas/task.schema";

export class EditTaskDto {
  @IsMongoId()
  @IsNotEmpty()
  @IsExist({ model: Task })
  id: string;

  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsMongoId()
  @IsOptional()
  userId: mongoose.Types.ObjectId;

  @IsEnum(EStatus)
  @IsOptional()
  status: EStatus;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  tags: string[]; //TODO may to create tags collection
}
