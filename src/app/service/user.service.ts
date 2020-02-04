import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../model/api.response';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl: string = 'http://localhost:8080/users/';

  constructor(private httpClient: HttpClient) { }

  login(loginPayload): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>('http://localhost:8080/' + 'token/generate-token', loginPayload);
  }

  getUsers(): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl);
  }

  getUserById(id: number): Observable<ApiResponse> {
    return this.httpClient.get<ApiResponse>(this.baseUrl + id);
  }

  createUser(user: User): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>(this.baseUrl, user);
  }

  updateUser(user: User): Observable<ApiResponse> {
    return this.httpClient.put<ApiResponse>(this.baseUrl + user.id, user);
  }

  deleteUser(id: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>(this.baseUrl + id);
  }

}
