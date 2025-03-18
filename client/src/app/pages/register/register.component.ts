import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  submitForm() {
    console.log('Form data:', this.form?.value);
    if (this.form?.valid) {
      const id = Math.ceil(Math.random() * 10000);
      const user: User = new User(id.toString(), this.form.value['name']);

      console.log(user);

    }
  }
}
