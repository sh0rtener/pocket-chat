import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Message } from '../../../entities/message';
import { ChatHistoryComponent } from '../../../widgets/chat-history';
import { TextareaComponent, PrimaryButtonComponent } from '../../../shared/ui';
import { createChatFormGroup } from '../model/chat-form.form';
import { ReactiveFormsModule } from '@angular/forms';
import { LlmService } from '../../../shared/lib/api/llm.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrl: './chat-form.component.scss',
  imports: [ChatHistoryComponent, TextareaComponent, PrimaryButtonComponent, ReactiveFormsModule],
})
export class ChatFormComponent implements AfterViewInit {
  private llmService = inject(LlmService);

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }
  @ViewChild('scrollBlock') private scrollBlock!: ElementRef<HTMLDivElement>;
  private scrollToBottom(): void {
    const el = this.scrollBlock.nativeElement;
    el.scrollTop = el.scrollHeight;
  }

  chatForm = createChatFormGroup();

  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }

  onSubmit() {
    if (this.chatForm.invalid) {
      this.chatForm.markAllAsTouched();
      return;
    }

    console.log(this.chatForm.controls.file);

    this.models.push({
      id: 1,
      text: this.chatForm.controls.message.value!,
      isAnswer: false,
      createdAt: new Date(),
    });

    this.llmService.AskQuestion(this.chatForm.controls.message.value!).subscribe({
      next: (x) => {
        this.models.push({
          id: 1,
          text: x.message,
          isAnswer: true,
          createdAt: new Date(),
        });
      },
    });

    setTimeout(() => this.scrollToBottom(), 0);

    this.chatForm.controls.message.reset();
    this.chatForm.controls.file.reset();
  }

  models: Message[] = [];
}
