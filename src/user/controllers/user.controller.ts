import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UuidValidator } from '../../shared/validators/uuid.validator';
import { UserService } from '../domain/services/user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UserDto } from './dtos/user.dto';

@ApiTags('User')
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  public createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.userService.create(createUserDto);
  }

  @Get()
  public findAllUsers(): Promise<UserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  public findUserById(
    @Param('id', UuidValidator) id: string,
  ): Promise<UserDto> {
    return this.userService.findById(id);
  }

  @Patch(':id')
  public updateUser(
    @Param('id', UuidValidator) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  public deleteUser(@Param('id', UuidValidator) id: string): Promise<string> {
    return this.userService.delete(id);
  }
}
