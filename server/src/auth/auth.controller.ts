import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos/signIn.dto";
import { sign } from "jsonwebtoken";

@Controller("")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-in")
  async login(@Body() dto: SignInDto) {
    const user = await this.authService.signIn(dto);
    const token = sign({ id: user._id }, process.env.TOKEN_SECRET);

    return { user, token };
  }

  @Post("sign-up")
  async registration(@Body() dto: SignInDto) {
    return await this.authService.signUp(dto);
  }
}
