import { Component, model } from "@angular/core";
import { Message, MessageComponent } from "../../../entities/message";

@Component({
    selector: 'app-chat-history',
    templateUrl: './chat-history.component.html',
    styleUrl: './chat-history.component.scss',
    imports: [MessageComponent]
})

export class ChatHistoryComponent {
    messages = model.required<Message[]>();
}