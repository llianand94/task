import * as bcrypt from "bcrypt";
import { HttpException, Injectable } from "@nestjs/common";
import { UserService } from "src/user/user.service";
import { SignInDto } from "./dtos/signIn.dto";

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signIn(dto: SignInDto) {
    const users = await this.userService.findUser({
      email: dto.email,
    });
    const user = users.length ? users[0] : null;
    const isMatched = user && (await bcrypt.compare(dto.password, user.hash));
    if (!user || !isMatched) throw new HttpException("Unauthorized", 401);
    return user;
  }

  async signUp(dto: SignInDto) {
    const users = await this.userService.findUser({ email: dto.email });
    if (users.length)
      throw new HttpException(
        `User with ${dto.email} email already exists`,
        400,
      );
    return await this.userService.createUser(dto);
  }
}
