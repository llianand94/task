import mongoose from "mongoose";
import {
  IsArray,
  IsString,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
} from "class-validator";
import { Type } from "class-transformer";

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsOptional()
  @IsMongoId()
  userId: mongoose.Types.ObjectId;

  @IsArray()
  @Type(() => String)
  @IsOptional()
  tags: string[];
}
