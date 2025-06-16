import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-client',
  imports: [
    SelectModule,
    FormsModule
  ],
  templateUrl: './client.html',
  styleUrl: './client.css'
})
export class Client implements OnInit{
  usersService = inject(UserService);
  users$ = this.usersService.users$;
  totalUsers = 0;
  itemsPerPage = 5;
  first = 0;

  paginationOptions = [
    { label: 5, value: 5 },
    { label: 10, value: 10 },
    { label: 20, value: 20 },
  ];
  ngOnInit(): void {
    this.usersService.getAllUsers();
    this.users$.subscribe((users) => this.totalUsers = users.length)
  }
}
