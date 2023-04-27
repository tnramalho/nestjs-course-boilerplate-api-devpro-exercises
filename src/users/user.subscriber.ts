import { User } from './entities/user.entity';
import {
  EntitySubscriberInterface,
  Equal,
  EventSubscriber,
  InsertEvent,
  Not,
  UpdateEvent,
} from 'typeorm';
import { FindOperator } from 'typeorm/find-options/FindOperator';
import * as bcrypt from 'bcrypt';
import { BadRequestException } from '@nestjs/common';
//import { UserRole } from '../user-role/user-role.entity';
//import { Role } from '../role/role.entity';
//import { AppRole } from '../../app.acl';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo() {
    return User;
  }

  async beforeInsert(event: InsertEvent<User>) {
    await Promise.all([
      this.checkEmailUniqueness(event),
      this.checkUsernameUniqueness(event),
      this.hashInsertedPassword(event),
    ]);
  }

  async beforeUpdate(event: UpdateEvent<User>) {
    await Promise.all([
      this.checkEmailUniqueness(event),
      this.checkUsernameUniqueness(event),
      this.hashUpdatedPassword(event),
    ]);
  }

  async _hashPassword(user: User) {
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
  }

  private async hashInsertedPassword(event: InsertEvent<User>) {
    const user = event.entity;
    await this._hashPassword(user);
    return;
  }

  private async hashUpdatedPassword(event: UpdateEvent<User>) {
    const user = event.entity as User;
    const currentRecord = await event.manager.findOne(User, {
      where: {
        id: user.id,
      },
    });

    if (
      currentRecord?.password &&
      user?.password &&
      user.password !== currentRecord.password
    ) {
      await this._hashPassword(user);
    }

    return;
  }

  private async checkEmailUniqueness(
    event: InsertEvent<User> | UpdateEvent<User>,
  ) {
    const user = event.entity;

    if (user?.email) {
      const criteria: {
        where: {
          id?: FindOperator<string>;
          email: FindOperator<string>;
        };
      } = {
        where: {
          email: Equal(user.email),
        },
      };
      if (user.id) {
        criteria.where.id = Not(user.id);
      }
      const count = await event.manager.count(User, criteria);
      if (count > 0) {
        throw new BadRequestException('Email address already exists.');
      } else {
        return;
      }
    } else {
      return;
    }
  }

  private async checkUsernameUniqueness(
    event: InsertEvent<User> | UpdateEvent<User>,
  ) {
    const user = event.entity;
    if (user?.username) {
      const criteria: {
        where: {
          id?: FindOperator<string>;
          username: FindOperator<string>;
        };
      } = {
        where: {
          username: Equal(user.username),
        },
      };
      if (user.id) {
        criteria.where.id = Not(user.id);
      }
      const count = await event.manager.count(User, criteria);
      if (count > 0) {
        throw new BadRequestException('username already exists.');
      } else {
        return;
      }
    } else {
      return;
    }
  }
}
