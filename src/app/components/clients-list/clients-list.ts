import { Component, input } from '@angular/core';
import { User } from '../../models/User';
import { ClientCard } from '../client-card/client-card';

@Component({
  selector: 'app-clients-list',
  imports: [
    ClientCard
  ],
  templateUrl: './clients-list.html',
  styleUrl: './clients-list.css'
})
export class ClientsList {
  clients = input<User[]>([]);
}
