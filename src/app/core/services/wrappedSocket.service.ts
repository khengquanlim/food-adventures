import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';

@Injectable()
export class WrappedSocket {
  constructor(private socket: Socket) {}

  connect() {
    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  sendMessage(message: string) {
    this.socket.emit('chat message', message);
  }

  onMessageReceived(): Observable<string> {
    return this.socket.fromEvent('chat message');
  }
}