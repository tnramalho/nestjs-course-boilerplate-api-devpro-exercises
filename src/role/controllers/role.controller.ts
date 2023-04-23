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
import { RoleService } from '../domain/services/role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@ApiTags('Role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  public async create(@Body() createRoleDto: CreateRoleDto): Promise<RoleDto> {
    return this.roleService.create(createRoleDto);
  }

  @Get()
  public async findAll(): Promise<RoleDto[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  public async findById(
    @Param('id', UuidValidator) id: string,
  ): Promise<RoleDto> {
    return this.roleService.findById(id);
  }

  @Delete(':id')
  public async delete(@Param('id', UuidValidator) id: string) {
    return this.roleService.delete(id);
  }

  @Patch(':id')
  public async update(
    @Param('id', UuidValidator) id: string,
    @Body() updateRoleDto: UpdateRoleDto,
  ) {
    return this.roleService.update(id, updateRoleDto);
  }
}
