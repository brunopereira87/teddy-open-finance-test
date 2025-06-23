import { Component, inject, input, model } from '@angular/core';
import { User } from '../../models/User';
import { CurrencyPipe } from '@angular/common';
import { ModalService } from '../../services/modal-service';
import { UserService } from '../../services/user-service';

@Component({
  selector: 'app-client-card',
  imports: [CurrencyPipe],
  templateUrl: './client-card.html',
  styleUrl: './client-card.css'
})
export class ClientCard {
  modalService = inject(ModalService);
  userService = inject(UserService);
  client = model<User>({} as User);

  onSelectClient() {
    this.client.update(user => ({ ...user, selected: true }));
  }
  
  onEditClient() {
    this.userService.setFormUser(this.client());
    this.modalService.setModalClientFormIsOpen(true);
  }
  
  onRemoveClient() {
    this.userService.setDeleteUser(this.client());
    this.modalService.setModalClientDeleteIsOpen(true);
  }

  onDeselectClient() {
    this.client.update(user => ({ ...user, selected: false }));
  }
}
