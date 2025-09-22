import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/google-form/auth';

  constructor(private http: HttpClient) {}

  login(data: { email: string; password: string }): Observable<string> {
    return this.http.post(this.baseUrl + '/login', data, { responseType: 'text' });
  }

  signUp(data: SignUpRequest): Observable<string> {
  return this.http.post(this.baseUrl + '/sign-up', data, {
    responseType: 'text',
    headers: { 'Content-Type': 'application/json' }
  });
}
}
