import { Component } from '@angular/core';
import { HeaderComponent } from '../../shared/ui';
import { MessageComponent } from '../../entities/message/ui/message-card/message-card.component';
import { Message } from '../../entities/message/model/message.model';
import { ChatHistoryComponent } from '../../widgets/chat-history';
import { ChatFormComponent } from '../../features/chat-form/ui/chat-form.component';

@Component({
  selector: 'app-chat-page',
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.scss',
  imports: [HeaderComponent, ChatFormComponent],
})
export class ChatComponent {
}
