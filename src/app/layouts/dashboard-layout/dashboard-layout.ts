import { Component, signal } from '@angular/core';
import { Header } from '../../components/header/header';
import { SideMenu } from '../../components/side-menu/side-menu';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-dashboard-layout',
  imports: [
    Header,
    SideMenu,
    RouterOutlet
  ],
  templateUrl: './dashboard-layout.html',
  styleUrl: './dashboard-layout.css'
})
export class DashboardLayout {
  sidemenuVisible = signal(false);

  onToggleSideMenu() {
    this.sidemenuVisible.set(!this.sidemenuVisible());
  }
}
