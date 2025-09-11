import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReponseQuestionRequest {
  questionText: string;
  answer: string | string[];
}

export interface SubmitFormulaireRequest {
  formulaireId: number;
  reponses: ReponseQuestionRequest[];
}

@Injectable({ providedIn: 'root' })
export class ReponseService {
  private baseUrl = 'http://localhost:8080/google-form/reponse';

  constructor(private http: HttpClient) {}

  submitReponse(data: SubmitFormulaireRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/submit`, data);
  }
}
