import { User } from './user.model';

export class Message {
  sender?: User;

  constructor(public id: string, public content: string = '') {
  }
}
