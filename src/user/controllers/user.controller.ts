import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from '../entities/User';
import { UserService } from '../services/user.service';
import { UuidValidator } from '../shared/validators/uuid.validator';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): User {
    return this.userService.create(createUserDto);
  }

  @Get()
  public findAllUsers(): User[] {
    return this.userService.findAll();
  }

  @Get(':id')
  public findUserById(@Param('id', UuidValidator) id: string): User {
    return this.userService.findOneById(id);
  }

  @Patch(':id')
  public updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): User {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  public deleteUser(@Param('id') id: string): string {
    return this.userService.delete(id);
  }
}
