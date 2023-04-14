import { Injectable } from '@nestjs/common';
import { Builder } from 'builder-pattern';
import { CreateUserDto } from '../../dtos/create-user.dto';
import { User } from '../../entities/User';

@Injectable()
export class UserMapper {
  public mapCreateUserDtoToUser(createUserDto: CreateUserDto): User {
    return Builder(User)
      .name(createUserDto.name)
      .lastName(createUserDto.lastName)
      .email(createUserDto.email)
      .age(createUserDto.age)
      .username(createUserDto.username)
      .build();
  }
}