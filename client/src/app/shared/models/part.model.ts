export class Part {
  id?: string;
  type?: 'link' | 'text' | 'image';
  content?: string|Blob = '';

}
