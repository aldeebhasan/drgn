import { User } from './user.model';
import { Part } from './part.model';

export class Message {
  id?: string;
  parts: Array<Part> = [];
  sender?: User;
  createdAt?: string;
  type?: string = "user";
}
