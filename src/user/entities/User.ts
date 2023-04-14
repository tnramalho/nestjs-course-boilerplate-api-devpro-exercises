import { randomUUID } from 'crypto';
import { UserInterface } from '../shared/interfaces/user.interface';

export class User implements UserInterface {
  private id: string;
  name: string;
  lastName: string;
  email: string;
  age: number;
  username: string;

  public setId(): void {
    this.id = randomUUID();
  }

  public get getId() {
    return this.id;
  }
}