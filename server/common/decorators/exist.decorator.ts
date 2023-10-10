import { ClassConstructor } from "class-transformer";
import { registerDecorator, ValidationOptions } from "class-validator";
import { IsExistConstraint } from "../validators/exist.constraint";

export interface IExistOptions<T = any> {
  model: ClassConstructor<T>;
}

export function IsExist<T>(
  options: IExistOptions<T>,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isExist",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [options],
      validator: IsExistConstraint,
    });
  };
}
