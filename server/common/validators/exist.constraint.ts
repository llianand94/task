import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { Connection } from "mongoose";
import { IExistOptions } from "../decorators/exist.decorator";

@ValidatorConstraint({ async: true })
@Injectable()
export class IsExistConstraint implements ValidatorConstraintInterface {
  @InjectConnection() private connection: Connection;

  async validate(
    entityId: string,
    args: ValidationArguments,
  ): Promise<boolean> {
    const { model } = args.constraints[0] as IExistOptions;
    if (!entityId) return false;
    const repo = this.connection.model(model.name);
    try {
      const entity = await repo.findOne({
        _id: entityId,
      });
      if (!entity) return false;
    } catch (e) {}
    return true;
  }

  defaultMessage(validationArguments?: ValidationArguments): string {
    const { property, value } = validationArguments;
    return `${property}: ${value} IS_NOT_EXIST`;
  }
}
