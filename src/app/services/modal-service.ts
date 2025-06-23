import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ModalState = {
  modalClientFormIsOpen: boolean;
  modalDeleteClientIsOpen: boolean;

}
@Injectable({
  providedIn: 'root'
})
export class ModalService {

  modalSubject = new BehaviorSubject<ModalState>({
    modalClientFormIsOpen: false,
    modalDeleteClientIsOpen: false
  });

  modalState$ = this.modalSubject.asObservable();
  constructor() { }

  setModalClientFormIsOpen(isOpen = false) {
    this.modalSubject.next({ 
      modalClientFormIsOpen: isOpen,
      modalDeleteClientIsOpen: this.modalSubject.value.modalDeleteClientIsOpen,
    });
  }
  
  setModalClientDeleteIsOpen(isOpen = false) {
    this.modalSubject.next({ 
      modalClientFormIsOpen: this.modalSubject.value.modalClientFormIsOpen,
      modalDeleteClientIsOpen: isOpen,
      
    });
  }
}
