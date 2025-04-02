import { Media } from "./media.model";
import { Message } from "./message.model";

export class Part {
  id?: string;
  type?: 'link' | 'text' | 'media' | 'message';
  content?: string| Message| Media;
}
