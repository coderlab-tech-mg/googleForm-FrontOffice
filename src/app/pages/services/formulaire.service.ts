import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

export interface QuestionOption {
  value: string;
}

export interface Question {
  id?: number;
  type: 'text' | 'radio' | 'checkbox' | 'select';
  questionText: string;
  options?: string[];
}

export interface Formulaire {
  id?: number;          
  titre: string;
  questions: Question[];
  active: boolean;
}


@Injectable({ providedIn: 'root' })
export class FormulaireService {
  private baseUrl = 'http://localhost:8080/google-form/formulaire';

  constructor(private http: HttpClient, private router: Router) {}

  createFormulaire(data: Formulaire): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, data);
  }

  getActiveFormulaires(): Observable<Formulaire[]> {
  return this.http.get<Formulaire[]>(`${this.baseUrl}/list-active`);
}

  getFormulaireById(id: number): Observable<Formulaire> {
    return this.http.get<Formulaire>(`${this.baseUrl}/${id}`);
  }
}
