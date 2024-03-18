import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {
  messages = [
    { text: "Salut, comment ça va ?", isMine: false },
    { text: "Salut! Bien et toi ?", isMine: true }
  ];

  newMessage = '';

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    this.messages.push({ text: this.newMessage, isMine: true });
    this.newMessage = '';
  }
}

