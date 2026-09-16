import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LmStudioResponse } from './model/lmstudio.response';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LmStudioApiService {
  private http = inject(HttpClient);

  // public AskQuestion(question: string) {
  //     return this.http.get()
  // }

  public AskQuestion(question: string): Observable<LmStudioResponse> {
    return of({
      id: 'test',
      object: 'string',
      created: 123,
      model: 'terst',
      choises: [{ index: 123, message: { role: 'asdf', content: question } }],
    });
  }
}
