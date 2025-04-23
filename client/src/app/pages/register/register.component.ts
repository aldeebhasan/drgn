import { Component } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { CommonModule } from "@angular/common";
import { User } from "../../shared/models/user.model";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-register",
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./register.component.html",
  providers: [CookieService],
})
export class RegisterComponent {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(3)]],
    });
  }

  submitForm() {
    if (this.form?.valid) {
      const id = this.authService.generateUniqueId();
      const user: User = new User(id, this.form.value["name"]);

      this.authService.login(user);
      this.router.navigateByUrl("room");
    }
  }
}
