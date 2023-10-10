import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, EditTaskDto } from "./dtos";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  async getListOfTasks() {
    return await this.taskService.getListOfTasks();
  }

  @Post()
  async createTask(@Body() dto: CreateTaskDto) {
    return await this.taskService.createTask(dto);
  }

  @Patch()
  async editTask(@Body() dto: EditTaskDto) {
    return await this.taskService.editTask(dto);
  }

  @Delete(":id")
  async deleteTask(@Param("id") id: string) {
    return await this.taskService.deleteTask(id);
  }
}
