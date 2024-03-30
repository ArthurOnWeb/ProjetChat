import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../user.service';
import { ChatService } from '../chat.service';

interface User {
  id: string;
  name: string;
}

interface Message {
  text: string;
  isMine: boolean;
  userId: string; 
}

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-page.component.html',
  styleUrls: ['./chat-page.component.css']
})
export class ChatPageComponent implements OnInit {
  users: User[] = [];
  messages: Message[] = [];
  newMessage = '';
 

  defaultUser: User = {
    id: "default-id",
    name: "Invité"
  };
  currentUserId: string = this.defaultUser.id;
  selectedUser: User = this.defaultUser;
  

  constructor(private userService: UserService, private chatService: ChatService) {}

  ngOnInit() {
    this.loadCurrentUser(); // Charger l'utilisateur courant dès l'initialisation du composant
    this.loadUsers();
  }

  loadCurrentUser() {
    const userEmail = localStorage.getItem('username'); // Récupérer l'email de l'utilisateur du localStorage
    if (userEmail) {
      this.userService.getEmailByName(userEmail).subscribe({
        next: (response) => {
          this.currentUserId = response.utilisateur_id; // Mettre à jour l'ID de l'utilisateur courant
        },
        error: (err) => console.error(err)
      });
    }
  }

  loadUsers() {
    this.userService.getUsersNames().subscribe({
      next: (data) => {
        this.users = data.map((u: any) => ({ id: u._id, name: u.nom }));
      },
      error: (err) => console.error(err),
    });
  }

  selectUser(user: User) {
    this.selectedUser = user;
  
    // Identifiants des participants (exemple simplifié)
    const currentUserId = this.currentUserId
    const participants = [currentUserId, user.id];
  
    // Vérifier l'existence de la conversation
    this.chatService.verifyConversation(participants).subscribe({
      next: (response) => {
        if (response.conversation_id) {
          // Si la conversation existe, chargez les messages
          this.loadMessages(response.conversation_id);
        } else {
          // La conversation n'existe pas, vous pouvez ici gérer la création d'une nouvelle conversation
          console.log('La conversation n\'existe pas, envisagez de créer une nouvelle conversation.');
        }
      },
      error: (err) => console.error(err)
    });
  }
  
  loadMessages(conversationId: string) {
    this.chatService.getMessages(conversationId).subscribe({
      next: (response) => {
        // Assurez-vous que currentUserId est non null avant d'utiliser les messages
        if (this.currentUserId) {
          this.messages = response.messages.map((msg: any) => ({
            text: msg.contenu,
            isMine: msg.expediteur._id === this.currentUserId,
            userId: msg.expediteur._id
          }));
        } else {
          console.error('Current user ID is not set.');
        }
      },
      error: (err) => console.error(err)
    });
  }
  
    

  sendMessage() {
    if (!this.selectedUser || this.newMessage.trim() === '') {
      return;
    }

    const messageData = {
      expediteur: { _id: this.selectedUser.id, nom: this.selectedUser.name },
      contenu: this.newMessage,
      timestamp: new Date().toISOString()
    };

    // Supposons que vous ayez un moyen d'obtenir l'ID de la conversation actuelle
    const conversationId = 'some-conversation-id'; // Ceci est un placeholder

    this.chatService.sendMessage(conversationId, messageData).subscribe({
      next: (response) => {
        console.log('Message sent', response);
        this.messages.push({
          text: this.newMessage,
          isMine: true,
          userId: this.selectedUser.id
        });
        this.newMessage = '';
      },
      error: (err) => console.error('Error sending message:', err)
    });
  }
}
