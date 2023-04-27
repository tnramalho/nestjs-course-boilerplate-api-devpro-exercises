import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateUserRoleDto } from './dto/create-user-role.dto';
import { UserRoleDto } from './dto/user-role.dto';

import { UserRoleService } from './user-role.service';

@ApiTags('user-role')
@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Post()
  @ApiOperation({
    operationId: 'userRole_create',
    description: 'Endpoint to create a new userUserRole',
  })
  @ApiOkResponse({
    description: 'Success userUserRole created',
  })
  async create(
    @Body() createUserRoleDto: CreateUserRoleDto,
  ): Promise<UserRoleDto> {
    return this.userRoleService.create(createUserRoleDto);
  }

  @Get()
  @ApiOperation({
    operationId: 'userRole_findAll',
    description: 'Endpoint to find all',
  })
  async findAll(): Promise<UserRoleDto[]> {
    return this.userRoleService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    operationId: 'userRole_findOne',
    description: 'Endpoint to create a new userUserRole',
  })
  @ApiOkResponse({
    description: 'Success userUserRole created',
  })
  @ApiNotFoundResponse({
    description: 'Was not able to find userUserRole',
  })
  async findOne(@Param('id') id: string) {
    return this.userRoleService.findOne(id);
  }

  @ApiOperation({
    operationId: 'userRole_delete',
    description: 'Endpoint to delete all',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.userRoleService.remove(id);
  }
}
