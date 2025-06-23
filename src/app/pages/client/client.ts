import { Component, computed, inject, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../../services/user-service';
import { SelectModule } from 'primeng/select';
import { FormsModule } from '@angular/forms';
import { ClientsList } from '../../components/clients-list/clients-list';
import { User } from '../../models/User';
import { Paginator } from '../../components/paginator/paginator';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { ClientForm } from '../../client-form/client-form';
import { ModalService } from '../../services/modal-service';
import { AsyncPipe } from '@angular/common';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-client',
  imports: [
    SelectModule,
    FormsModule,
    DialogModule,
    ClientsList,
    Paginator,
    Button,
    ClientForm
  ],
  templateUrl: './client.html',
  styleUrl: './client.css'
})
export class Client implements OnInit, OnDestroy{
  usersService = inject(UserService);
  modalService = inject(ModalService);
  usersSubscription: Subscription | undefined
  modalSubscription: Subscription | undefined
  formUserSubscription: Subscription | undefined
  deleteUserSubscription: Subscription | undefined
  deleteSubscription: Subscription | undefined
  users: User[] = [];
  totalUsers = 0;
  itemsPerPage = 4;
  currentPage = 1;
  totalPages = 1;
  totalRecords = computed(() => this.itemsPerPage * this.totalPages);
  formTypeLabel = "Criar";
  formType: 'create' | 'edit' = 'create';
  formVisible = false;
  modalDeleteIsVisible = false
  clientToEdit: User | null = null;
  clientToDelete: User | null = null;

  paginationOptions = [
    { label: 4, value: 4 },
    { label: 8, value: 8 },
    { label: 16, value: 16 },
    { label: 24, value: 24 },
  ];
  ngOnInit(): void {
    this.subscribeToModal();
    this.changeFormUsers();
    this.changeDeleteUsers();
    this.fetchUsers();
  }

  fetchUsers() {
    this.usersService.getAllUsers(this.currentPage, this.itemsPerPage);
    this.usersSubscription = this.usersService.usersResponse$.subscribe((usersResponse) => {
      this.users = usersResponse.clients;
      this.totalUsers = this.users.length
      this.totalPages = usersResponse.totalPages
    })
  }
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.fetchUsers();
  }

  onTotalItemPagesChange(itemsPerPage:number){
    this.itemsPerPage = itemsPerPage;
    this.currentPage = 1;
    this.fetchUsers();
  }

  onCreateClient() {
    this.formTypeLabel = "Criar";
    this.formType = 'create';
    this.modalService.setModalClientFormIsOpen(true);
  }

  onDeleteClient() {
    const userId = this.clientToDelete?.id;
    
    if(!userId) return;

    this.deleteSubscription = this.usersService.deleteUser(userId).subscribe({
      next: () => {
        this.afterDelete()
      },
      error: (error) => {
        console.error(error);
        this.afterDelete()
      }
    });
    
  }

  afterDelete() {
    this.modalService.setModalClientDeleteIsOpen(false);
    this.clientToDelete = null;
    this.modalDeleteIsVisible = false;
    this.fetchUsers();
  }
  changeFormUsers(){
    this.formUserSubscription = this.usersService.formUser$.subscribe((user) => {
      if(user) {
        this.clientToEdit = user;
        this.formTypeLabel = "Editar";
        this.formType = 'edit';
        this.modalService.setModalClientFormIsOpen(true);
      }
    })
  }

  changeDeleteUsers(){
    this.deleteUserSubscription = this.usersService.deleteUser$.subscribe((user) => {
      if(user) {
        this.clientToDelete = user;
        this.modalService.setModalClientDeleteIsOpen(true);
      }
    })
  }

  subscribeToModal() {
    this.modalSubscription = this.modalService.modalState$.subscribe(
      state => {
        this.formVisible = state.modalClientFormIsOpen;
        this.modalDeleteIsVisible = state.modalDeleteClientIsOpen;
      }
    );
  }

  onHideModalForm(){
    this.clientToEdit = null;
    this.usersService.setFormUser(null);
    this.modalService.setModalClientFormIsOpen(false);
  }
  onHideModalDelete(){
    this.clientToDelete = null;
    this.modalService.setModalClientDeleteIsOpen(false);
  }

  onCreateOrEdit(){
    this.fetchUsers();
    this.formVisible = false;
  }
  ngOnDestroy(): void {
    this.usersSubscription?.unsubscribe();
    this.modalSubscription?.unsubscribe();
    this.formUserSubscription?.unsubscribe();
    this.deleteUserSubscription?.unsubscribe();
    this.deleteSubscription?.unsubscribe();
  }
}
