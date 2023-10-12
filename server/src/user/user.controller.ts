import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dtos/createUser.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return await this.userService.createUser(dto);
  }
}
