import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Subscription } from 'rxjs';
import { User, UsersReponse } from '../models/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersResponseSubject = new BehaviorSubject<UsersReponse>({
    clients: [],
    currentPage: 1,
    totalPages: 1
  });
  private formUserSubject = new BehaviorSubject<User | null>(null);
  private deleteUserSubject = new BehaviorSubject<User | null>(null);
  private selectedUsersSubject = new BehaviorSubject<User[]>([]);
  private userResponseSubscription: Subscription | undefined;
  
  private api_url = 'https://boasorte.teddybackoffice.com.br/users'
  private http = inject(HttpClient);
  private destroy = inject(DestroyRef);
  
  usersResponse$ = this.usersResponseSubject.asObservable();
  formUser$ = this.formUserSubject.asObservable();
  deleteUser$ = this.deleteUserSubject.asObservable();
  selectedUsers$ = this.selectedUsersSubject.asObservable();
  constructor() {
    this.destroy.onDestroy(() => {
      this.userResponseSubscription?.unsubscribe()
    });
   }

  getAllUsers(page = 1, limit = 8) {
    this.userResponseSubscription = this.http.get<UsersReponse>(`${this.api_url}?page=${page}&limit=${limit}`)
      .pipe(
        map(userResponse => {
          userResponse.clients.map(client => client.selected = false);
          return userResponse
        })
      )
      .subscribe((usersResponse) => {
        this.usersResponseSubject.next(usersResponse);
      });
  }

  getUserById(id: number) {
    return this.http.get<User>(`${this.api_url}/${id}`);
  }

  createUser(user: User) {
    return this.http.post<User>(this.api_url, user);
  }

  updateUser(id: number, user: User) {
    return this.http.patch<User>(`${this.api_url}/${id}`, user);
  }

  deleteUser(id: number) {
    return this.http.delete(`${this.api_url}/${id}`);
  }

  setFormUser(user: User | null) {
    this.formUserSubject.next(user);
  }
  setDeleteUser(user: User | null) {
    this.deleteUserSubject.next(user);
  }

  setSelectedUsers(users: User[]) {
    this.selectedUsersSubject.next(users);
  }

  addToSelectedUsers(user: User) {
    this.selectedUsersSubject.next([...this.selectedUsersSubject.value, user]);
  }
}
