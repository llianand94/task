import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { FilterQuery, Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { User, UserDocument } from "src/schemas/user.schema";
import { CreateUserDto } from "./dtos/createUser.dto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(dto: CreateUserDto) {
    const { password, email } = dto;
    const newHash = await bcrypt.hash(password, bcrypt.genSaltSync(10));

    return await this.userModel.create({
      hash: newHash,
      email,
      createdAt: new Date(),
    });
  }

  async findUserById(id: string) {
    return await this.userModel.findById(id);
  }

  async findUser(filter: FilterQuery<User>): Promise<Array<User>> {
    return await this.userModel.find(filter);
  }
}
