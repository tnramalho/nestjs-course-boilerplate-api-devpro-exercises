import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { AuthLoginInterface } from '../interfaces/auth-login.interface';

@Exclude()
export class AuthLoginDto implements AuthLoginInterface {
  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Username',
    example: 'Jihgs',
  })
  @IsString()
  username!: string;

  @Expose()
  @ApiProperty({
    type: 'string',
    description: 'Password',
    example: 'sA109283',
  })
  @IsString()
  password!: string;
}
