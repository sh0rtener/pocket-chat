import { inject, Injectable } from '@angular/core';
import { LmStudioApiService } from './lmstudio/lmstudio-api.service';
import { LlmResponse } from './model/llm-response.model';
import { map, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LlmService {
  private llmApiService = inject(LmStudioApiService);

  public AskQuestion(question: string | null | undefined, base64File: string | null): Observable<LlmResponse> {
    return this.llmApiService.AskQuestion(question, base64File).pipe(
      map((lmResponse) => {
        // Здесь маппинг из LmStudioResponse в LlmResponse
        // Подставь реальные поля твоего интерфейса LlmResponse
        return {
          message: lmResponse.output[0].content,
        } as LlmResponse;
      }),
    );
  }
}
