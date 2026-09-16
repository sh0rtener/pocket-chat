import { Component, model } from '@angular/core';
import { Message } from '../../model/message.model';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss',
})
export class MessageComponent {
    message = model.required<Message>()
    
}
