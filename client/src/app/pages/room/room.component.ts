import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ChatService } from '../../services/chat.service';
import { Room } from '../../shared/models/room.model';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-room',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './room.component.html'
})
export class RoomComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder, private router: Router,
    private authService: AuthService, private chatService: ChatService,
    private toastrService: ToastrService
  ) {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  async submitForm(event: any) {
    if (this.form?.valid) {
      const room: Room = new Room(this.form.value['name'], this.form.value['password']);

      if (event.submitter.value === 'create') {
        this.chatService.createRoom(this.authService.user(), room).then(response => {
          this.afterJoinOrCreate(response.data);
        }).catch(err => {
          this.toastrService.error(Object.values(err.errors).join(', ') ,err.message)
        });
      } else {
        this.chatService.joinChat(this.authService.user(), room).then(response => {
          this.afterJoinOrCreate(response.data);
        }).catch(err => {
          this.toastrService.error(Object.values(err.errors).join(', ') ,err.message)
        });
      }
    }
  }

  afterJoinOrCreate(room: Room) {
    this.authService.setRoom(room)
    this.chatService.clear();
    this.router.navigateByUrl('chat');
  }
}
