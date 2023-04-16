import { Module } from '@nestjs/common';
import { UserController } from '../../user/controllers/user.controller';
import { UserMapper } from '../../user/shared/mappers/user.mapper';
import { UserRepository } from '../../user/repositories/user-repository';
import { UserService } from '../../user/services/user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    {
      provide: 'UserRepositoryInterface',
      useClass: UserRepository,
    },
    UserMapper,
  ],
})
export class UserModule {}
