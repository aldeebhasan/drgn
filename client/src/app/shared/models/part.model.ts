import { Message } from "./message.model";

export class Part {
  id?: string;
  type?: 'link' | 'text' | 'image' | 'message';
  content?: string = '';

}
