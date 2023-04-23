import { BadRequestException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import {
  EntitySubscriberInterface,
  Equal,
  EventSubscriber,
  InsertEvent,
  Not,
  UpdateEvent,
} from 'typeorm';
import { User } from '../../domain/entities/User.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  public listenTo() {
    return User;
  }

  public async beforeInsert(event: InsertEvent<User>): Promise<void> {
    await this.hashInsertedPassword(event);
    await this.checkUniqueness(event, 'email', 'Email address already exists');
    await this.checkUniqueness(event, 'username', 'Username already exists');
  }

  public async beforeUpdate(event: UpdateEvent<User>): Promise<void> {
    await this.hashUpdatedPassword(event);
    await this.checkUniqueness(event, 'email', 'Email address already exists');
    await this.checkUniqueness(event, 'username', 'Username already exists');
  }

  private async hashInsertedPassword(event: InsertEvent<User>): Promise<void> {
    const user = event.entity;
    await this.hashPassword(user);
  }

  private async hashUpdatedPassword(event: UpdateEvent<User>): Promise<void> {
    const user = event.entity as User;

    const currentUser = await event.manager.findOneBy(User, { id: user.id });

    if (
      currentUser?.password &&
      user?.password &&
      user.password === currentUser.password
    ) {
      await this.hashPassword(user);
    }
  }

  private async hashPassword(user: User): Promise<void> {
    user.salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, user.salt);
  }

  private async checkUniqueness(
    event: InsertEvent<User> | UpdateEvent<User>,
    fieldName: keyof User,
    errorMessage: string,
  ) {
    const user = event.entity;

    if (!user?.[fieldName]) {
      return;
    }

    const criteria: any = {
      [fieldName]: Equal(user[fieldName]),
    };
    if (user.id) {
      criteria.id = Not(user.id);
    }

    const count = await event.manager.count(User, {
      where: criteria,
    });

    if (count > 0) {
      throw new BadRequestException(errorMessage);
    }
  }
}
