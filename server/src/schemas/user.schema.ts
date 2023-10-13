import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {

  _id: string;
  
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  hash: string;

  @Prop()
  createdAt: Date;

  @Prop({ default: null })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
