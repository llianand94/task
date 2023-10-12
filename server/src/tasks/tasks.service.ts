import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Task } from "../schemas/task.schema";
import { EditTaskDto, CreateTaskDto } from "./dtos";
import { PaginationDto } from "./dtos/pagination.dto";

@Injectable()
export class TasksService {
  private commonProjection = { __v: 0 };
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async createTask(dto: CreateTaskDto) {
    try {
      return await this.taskModel.create({ ...dto, createdAt: new Date() });
    } catch (e) {
      throw new BadRequestException(e.message);
    }
  }

  async getListOfTasks(dto: PaginationDto) {
    return (
      this.taskModel.find({}, this.commonProjection, {
        limit: dto.limit,
        skip: dto.offset,
        sort: { createdAt: -1 },
      }) || []
    );
  }

  async getCount() {
    return this.taskModel.count({});
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
