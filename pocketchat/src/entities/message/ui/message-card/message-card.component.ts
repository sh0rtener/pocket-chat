import { Component, model } from '@angular/core';
import { Message } from '../../model/message.model';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss',
  imports: [MarkdownModule]
})
export class MessageComponent {
    message = model.required<Message>()
    
}
