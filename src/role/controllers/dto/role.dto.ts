import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { BaseDto } from '../../../shared/controllers/dto/base.dto';

@Exclude()
export class RoleDto extends BaseDto {
  @ApiProperty()
  @IsString()
  @Expose()
  name: string;
}
