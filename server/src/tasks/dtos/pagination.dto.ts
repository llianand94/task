import { Transform } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  offset: number;

  @IsInt()
  @IsOptional()
  @Min(0)
  @Transform(({ value }) => Number(value))
  limit: number;
}
