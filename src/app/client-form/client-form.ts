import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CurrencyMaskDirective } from '../directives/currency-mask-directive';
import { UserService } from '../services/user-service';
import { User } from '../models/User';
import { getBRLValue, parseBrlInputToNumber } from '../helpers/currency';

@Component({
  selector: 'app-client-form',
   imports: [
    ReactiveFormsModule, 
    InputTextModule, 
    ButtonModule,
    CurrencyMaskDirective
  ],
  templateUrl: './client-form.html',
  styleUrl: './client-form.css'
})
export class ClientForm implements OnInit{
  userService = inject(UserService);
  formType =  input<'create' | 'edit'>('create');
  userToEdit = input<User | null>(null);
  formTypeLabel = input<string>('Criar');
  onCreateOrEdit = output();
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ]),
    salary: new FormControl('', [
      Validators.required,
      Validators.min(0)
    ]),
    companyValuation: new FormControl('', [
      Validators.required
    ])
  });

  ngOnInit(): void {

    this.userService.formUser$.subscribe((user) => {
      if(user) {
        this.form.controls['name'].setValue(user.name);
        this.form.controls['salary'].setValue(getBRLValue(user?.salary));
        this.form.controls['companyValuation']
          .setValue(getBRLValue(user?.companyValuation));;
      } else {
        this.form.reset();
      }
    }) 
  }

  onSubmit() {
    const user: User = {
      name: this.form.controls['name'].value || '',
      salary: parseBrlInputToNumber(this.form.controls['salary'].value),
      companyValuation: parseBrlInputToNumber(
        this.form.controls['companyValuation'].value
      ),
    };

    if (this.formType() === 'create') {
      this.userService.createUser(user).subscribe(() => {
        this.onCreateOrEdit.emit();
        this.form.reset();
      });
      
    } else {
      const userId = this.userToEdit()?.id;
      if (!userId) {
        console.error('User id is required');
        return;
      }
      this.userService.updateUser(userId, user).subscribe(() => {
        this.onCreateOrEdit.emit();
      });
    }
  }
}
