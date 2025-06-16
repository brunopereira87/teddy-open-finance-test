import { Component, input, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-side-menu',
  imports: [
    RouterLink,
    RouterLinkActive,
    NgClass
  ],
  templateUrl: './side-menu.html',
  styleUrl: './side-menu.css',

})
export class SideMenu {
  visible = input<boolean>(false);
  showMenu = signal(this.visible());
}
