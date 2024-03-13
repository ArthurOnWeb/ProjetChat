import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent {
  messages: {message: string, sender: 'user' | 'bot'}[] = [
    { message: "Bonjour, comment puis-je vous aider ?", sender: 'bot' }
  ];

  newMessage: string = "";

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      this.messages.push({ message: this.newMessage, sender: 'user' });
      this.newMessage = '';
    }
  }
}
