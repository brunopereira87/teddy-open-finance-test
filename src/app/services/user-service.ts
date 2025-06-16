import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User, UsersReponse } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User[]>([]);
  
  users$ = this.userSubject.asObservable();
  api_url = 'https://boasorte.teddybackoffice.com.br/users'
  http = inject(HttpClient);

  constructor() { }

  getAllUsers() {
    this.http.get<UsersReponse>(this.api_url).subscribe((usersResponse) => {
      this.userSubject.next(usersResponse.clients);
    });
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.api_url}/${id}`);
  }

  createUser(user: User) {
    return this.http.post<User>(this.api_url, user);
  }

  updateUser(id: number, user: User) {
    return this.http.put<User>(`${this.api_url}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.api_url}/${id}`);
  }
}
