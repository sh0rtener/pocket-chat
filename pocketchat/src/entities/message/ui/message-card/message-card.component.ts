import { Component, model } from '@angular/core';
import { Message } from '../../model/message.model';
import { MarkdownModule } from 'ngx-markdown';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrl: './message-card.component.scss',
  imports: [MarkdownModule, DatePipe],
})
export class MessageComponent {
  message = model.required<Message>();
  
}
