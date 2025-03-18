import { Component, Input } from '@angular/core';
import { Message } from '../../shared/models/message.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
})
export class MessageComponent {
  @Input() message: Message = new Message();

}
