import { Component, inject, output } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [
    ButtonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  router = inject(Router);
  userName = localStorage.getItem('td_username') || 'Usuário';
  toggleSideMenu = output();
  
  onClickToggle() {
    this.toggleSideMenu.emit();  
  }

  logout() {
    localStorage.removeItem('td_username');
    
  }
}
