import { ApiProperty } from '@nestjs/swagger/dist';
import { Exclude } from 'class-transformer';
import { UserInterface } from '../interfaces';

export class UserDto implements UserInterface {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;

  @Exclude()
  createdAt: Date;
  @Exclude()
  updatedAt: Date;
  @Exclude()
  password: string;
  @Exclude()
  salt: string;
}
