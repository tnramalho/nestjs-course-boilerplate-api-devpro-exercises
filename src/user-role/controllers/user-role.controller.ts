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
import { UserRoleService } from '../domain/services/user-role.service';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UpdateUserRoleDto } from './dto/update-user-role.dto';
import { UserRoleDto } from './dto/user-role.dto';

@ApiTags('UserRole')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}
  @Post()
  public async create(
    @Body() createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRoleDto> {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  public async findAll(): Promise<UserRoleDto[]> {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  public async findById(
    @Param('id', UuidValidator) id: string,
  ): Promise<UserRoleDto> {
    return this.userRoleService.findById(id);
  }

  @Delete(':id')
  public async delete(@Param('id', UuidValidator) id: string) {
    return this.userRoleService.delete(id);
  }

  @Patch(':id')
  public async update(
    @Param('id', UuidValidator) id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    return this.userRoleService.update(id, updateUserRoleDto);
  }
}
