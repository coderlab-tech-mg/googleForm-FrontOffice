import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface StudentInfos {
  nom?: string;
  prenom?: string;
  std: string;
}

export interface ReponseQuestionRequest {
  questionText: string;
  answer: string | string[];
}

export interface SubmitFormulaireRequest {
  formulaireId: number;
  studentInfos: StudentInfos;
  reponses: ReponseQuestionRequest[];
}

@Injectable({ providedIn: 'root' })
export class ReponseService {
  private baseUrl = 'http://localhost:8080/google-form/reponse';

  constructor(private http: HttpClient) {}

  submitReponse(data: SubmitFormulaireRequest): Observable<any> {
    console.log('Payload envoyé :', data);
    return this.http.post(`${this.baseUrl}/submit`, data);
  }

  hasAlreadyAnswered(std: string, formulaireId: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.baseUrl}/check-existing-response?std=${std}&formulaireId=${formulaireId}`);
  }

  getNotes(formulaireId: number): Observable<any[]> {
  return this.http.get<any[]>(`${this.baseUrl}/notes/${formulaireId}`);
}
}

