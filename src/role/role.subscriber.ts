import { Role } from './role.entity';
import {
  EntitySubscriberInterface,
  Equal,
  EventSubscriber,
  InsertEvent,
  Not,
  UpdateEvent,
} from 'typeorm';
import { FindOperator } from 'typeorm/find-options/FindOperator';
import { BadRequestException } from '@nestjs/common';

@EventSubscriber()
export class RoleSubscriber implements EntitySubscriberInterface<Role> {
  listenTo() {
    return Role;
  }

  async beforeInsert(event: InsertEvent<Role>) {
    await this.checkNameUniqueness(event);
  }

  async beforeUpdate(event: UpdateEvent<Role>) {
    await this.checkNameUniqueness(event);
  }

  private async checkNameUniqueness(
    event: InsertEvent<Role> | UpdateEvent<Role>,
  ) {
    const role = event.entity;
    if (role?.name) {
      const criteria: {
        where: {
          id?: FindOperator<string>;
          name: FindOperator<string>;
        };
      } = {
        where: {
          name: Equal(role.name),
        },
      };
      if (role.id) {
        criteria.where.id = Not(role.id);
      }
      const count = await event.manager.count(Role, criteria);
      if (count > 0) {
        throw new BadRequestException(
          'name of the role already exists and needs to be unique.',
        );
      } else {
        return;
      }
    } else {
      return;
    }
  }
}
