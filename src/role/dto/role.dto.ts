import { CommonEntityDto } from './../../common/dto/common-entity.dto';
import { RoleInterface } from '../interfaces';
import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

@Exclude()
export class RoleDto extends CommonEntityDto implements RoleInterface {
  @ApiProperty({
    type: 'string',
    description: 'Name of the role',
    example: 'admin',
  })
  @IsString()
  @IsNotEmpty()
  @Expose()
  name!: string;
}
