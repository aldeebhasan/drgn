import { Component, Input } from '@angular/core';
import { Message } from '../../shared/models/message.model';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-message',
  imports: [CommonModule],
  templateUrl: './message.component.html',
})
export class MessageComponent {
  @Input() message: Message = new Message();

  constructor(private authService: AuthService) {
  }

  symbol(name: string | undefined): string {
    return name?.slice(0, 2).toUpperCase() || 'KW';
  }

  isLocal(): boolean {
    return this.message.sender?.id === this.authService.user()?.id;
  }

}
