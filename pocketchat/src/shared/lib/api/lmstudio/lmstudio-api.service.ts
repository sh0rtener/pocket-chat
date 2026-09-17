import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LmStudioResponse } from './model/lmstudio.response';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LmStudioApiService {
  private http = inject(HttpClient);

  public AskQuestion(question: string | null| undefined, base64File: string | null): Observable<LmStudioResponse> {
    var textJson = null;
    var fileJson = null;

    if (question) {
      textJson = {
        type: "text",
        content: question
      }
    }
    
    if (base64File) {
      fileJson = {
        type: "image",
        data_url: base64File
      }
    }

    const model = {
      model: 'qwen/qwen3-vl-4b',
      input: [
        ...(textJson ? [textJson] : []),
        ...(fileJson ? [fileJson] : [])
      ],
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
