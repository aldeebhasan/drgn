import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';
import { Message } from '../shared/models/message.model';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private socket: Socket;
  private readonly url: string = 'http://localhost:3000/chat'; // Replace with your backend URL

  constructor() {
    this.socket = io(this.url);
  }

  // Emit "join" event
  joinChat(user?: User): void {
    this.socket.emit('join', { user });
  }
  leaveChat(user?: User): void {
    this.socket.emit('leave', { user });
  }

  // Emit "message" event
  sendMessage(message: Message): void {
    this.socket.emit('message', { message });
  }

  // Listen for "message" events
  onMessage(): Observable<Message> {
    return new Observable((observer) => {
      this.socket.on('message', (data: Message) => observer.next(data));
    });
  }

  // Listen for "join" events
  onJoin(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('join', (message: string) => observer.next(message));
    });
  }

  onLeave(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('leave', (message: string) => observer.next(message));
    });
  }

  // Listen for "error" events
  onError(): Observable<string> {
    return new Observable((observer) => {
      this.socket.on('error', (error) => observer.next(error.message));
    });
  }
}
