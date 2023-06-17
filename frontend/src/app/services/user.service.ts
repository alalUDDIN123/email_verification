import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) { }

  registerUser(user: any) {

    return this.http.post(`${this.baseUrl}/register`, user);
  }

  verifyEmail(token: string) {
    return this.http.get(`${this.baseUrl}/verify-email/${token}`);
  }
}
