import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Room } from '../../shared/models/room.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-room',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room.component.html'
})
export class RoomComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService, private chatService: ChatService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });

    chatService.onError().subscribe((error) => {
      alert(error.message);
    })
  }

  async submitForm(event: any) {
    if (this.form?.valid) {
      const room: Room = new Room(this.form.value['name'], this.form.value['password']);

      let response = undefined;
      if (event.submitter.value === 'create') {
        response = await this.chatService.createRoom(this.authService.user(), room);
      } else {
        response = await this.chatService.joinChat(this.authService.user(), room);
      }
      if (response && response.success) {
        this.authService.setRoom(response.data)
        this.chatService.clear();
        this.router.navigateByUrl('chat');
      }
    }
  }
}
