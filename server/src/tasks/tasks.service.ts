import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "../schemas/task.schema";
import { EditTaskDto, CreateTaskDto } from "./dtos";

@Injectable()
export class TasksService {
  private commonProjection = { __v: 0 };
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(dto: CreateTaskDto) {
    return await this.taskModel.create(dto);
  }

  async getListOfTasks() {
    return this.taskModel.find({}, this.commonProjection) || [];
  }

  async editTask(dto: EditTaskDto) {
    return this.taskModel.updateOne(
      { _id: dto.id },
      { ...dto, $set: { updatedAt: new Date() } },
    );
  }

  async deleteTask(id: string) {
    await this.taskModel.deleteOne({ _id: id });
    return true;
  }
}
