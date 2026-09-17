import { AfterViewInit, Component, ElementRef, inject, model, ViewChild } from '@angular/core';
import { Message } from '../../../entities/message';
import { ChatHistoryComponent } from '../../../widgets/chat-history';
import { TextareaComponent, PrimaryButtonComponent } from '../../../shared/ui';
import { createChatFormGroup } from '../model/chat-form.form';
import { ReactiveFormsModule } from '@angular/forms';
import { LlmService } from '../../../shared/lib/api/llm.service';
import { fileToBase64 } from '../../../shared/lib/base64-encoder.service';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrl: './chat-form.component.scss',
  imports: [ChatHistoryComponent, TextareaComponent, PrimaryButtonComponent, ReactiveFormsModule],
})
export class ChatFormComponent implements AfterViewInit {
  private llmService = inject(LlmService);
  isLoading = false;

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
  models = model<Message[]>();

  async onSubmit() {
    const msg = this.chatForm.get('message')?.value;
    const file = this.chatForm.get('file')?.value;
    if (!msg && !file) {
      return;
    }
    var base64File;
    if (file) base64File = await fileToBase64(file!);
    else base64File = null;

    if (this.chatForm.invalid) {
      this.chatForm.markAllAsTouched();
      return;
    }

    this.models.update((x) => [
      ...(x ?? []),
      {
        id: 1,
        text: this.chatForm.controls.message.value!,
        isAnswer: false,
        createdAt: new Date(),
        file: file ?? undefined,
        fileUrl: file ? URL.createObjectURL(file) : undefined,
      },
    ]);

    this.isLoading = true;
    await new Promise((resolve) => setTimeout(resolve, 5000));

    this.llmService.AskQuestion(msg, base64File).subscribe({
      next: (x) => {
        this.models.update((message) => [
          ...(message ?? []),
          {
            id: 1,
            text: x.message,
            isAnswer: true,
            createdAt: new Date(),
          },
        ]);

        this.isLoading = false;
      },
      error: (e: Error) => {
        console.log(e);
      },
    });

    setTimeout(() => this.scrollToBottom(), 0);

    this.chatForm.controls.message.reset();
    this.chatForm.controls.file.reset();
  }

  onFileSelected(e: Event) {
    const input = e?.target as HTMLInputElement;
    const file = input.files?.[0] ?? null;

    this.chatForm.patchValue({ file: file });
  }
}
