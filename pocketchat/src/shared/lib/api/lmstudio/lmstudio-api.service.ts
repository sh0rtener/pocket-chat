import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LmStudioResponse } from './model/lmstudio.response';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LmStudioApiService {
  private http = inject(HttpClient);

  public AskQuestion(question: string): Observable<LmStudioResponse> {
    const model = {
      model: 'qwen/qwen3-vl-4b',
      input: question,
      context_length: 8000,
      temperature: 0,
    };

    return this.http.post<LmStudioResponse>('http://localhost:1234/api/v1/chat', model);
  }

  // public AskQuestion(question: string): Observable<LmStudioResponse> {
  //   return of({
  //     model_intance_id: 'test',
  //     output: [{ type: 'test', content: question }],
  //   });
  // }
}
