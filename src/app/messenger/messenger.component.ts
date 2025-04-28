import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-messenger',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './messenger.component.html',
  styleUrl: './messenger.component.scss'
})
export class MessengerComponent {
  newMessage = '';
  messages = [
    {
      text: 'Привет! Как дела?',
      time: new Date(Date.now() - 3600000),
      isMy: false
    },
    {
      text: 'Привет! Все отлично, спасибо!',
      time: new Date(Date.now() - 1800000),
      isMy: true
    },
    {
      text: 'Что нового?',
      time: new Date(Date.now() - 1200000),
      isMy: false
    }
  ];

  sendMessage() {
    if (this.newMessage.trim()) {
      this.messages.push({
        text: this.newMessage,
        time: new Date(),
        isMy: true
      });
      this.newMessage = '';
      
      // Прокрутка к новому сообщению
      setTimeout(() => {
        const container = document.querySelector('.messages-container');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      }, 100);
    }
  }
}
