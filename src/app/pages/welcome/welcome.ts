import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup } from '@angular/forms'
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FloatLabel } from 'primeng/floatlabel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  imports: [
    ReactiveFormsModule, 
    InputTextModule, 
    ButtonModule,
    FloatLabel
  ],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css'
})
export class Welcome {
  router = inject(Router);
  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3)
    ])
  });
  

  onSubmit(){
    localStorage.setItem("td_username", this.form.controls['name'].value || '');
    this.router.navigate(['/dashboard']);
  }
}
