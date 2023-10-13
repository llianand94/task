import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { CreateTaskDto, EditTaskDto } from "./dtos";
import { PaginationDto } from "./dtos/pagination.dto";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}
  @Get()
  @UseGuards(AuthGuard)
  async getListOfTasks(@Query() query: PaginationDto) {
    return await this.taskService.getListOfTasks(query);
  }

  @Get("count")
  async getCount() {
    return await this.taskService.getCount();
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
