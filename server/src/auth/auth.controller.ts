import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { SignInDto } from "./dtos/signIn.dto";

@Controller("")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("sign-in")
  async login(@Body() dto: SignInDto) {
    return await this.authService.signIn(dto);
  }

  @Post("sign-up")
  async registration(@Body() dto: SignInDto) {
    return await this.authService.signUp(dto);
  }
}