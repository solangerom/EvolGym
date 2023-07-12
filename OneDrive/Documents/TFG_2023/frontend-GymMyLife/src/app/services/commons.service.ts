import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CommonsService {
  constructor() {}

  setName(name: string) {
    localStorage.setItem('name', name);
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  getToken(): string {
    return localStorage.getItem('token');
  }
  getName() {
    return localStorage.getItem('name');
  }

  endSession() {
    localStorage.setItem('name', '');
    localStorage.setItem('token', '');
  }
  setHeaders() {
    return new HttpHeaders({
      authorization: `Bearer ${this.getToken()}`,
    });
  }
}
