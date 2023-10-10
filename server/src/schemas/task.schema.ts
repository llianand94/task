import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from "mongoose";
import { EStatus } from "../../common/enum";

export type TaskDocument = HydratedDocument<Task>;

@Schema()
export class Task {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ default: ""})
  description: string;

  @Prop({ default: null })
  userId: mongoose.Types.ObjectId;

  @Prop({ default: EStatus.NEW, enum: EStatus })
  status: EStatus;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ default: new Date()})
  createdAt: Date;

  @Prop({ default: null })
  updatedAt: Date;
}


export const TaskSchema = SchemaFactory.createForClass(Task);
