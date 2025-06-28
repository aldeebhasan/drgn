import { Component } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { User } from "../../shared/models/user.model";
import { Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { AuthService } from "../../services/auth.service";
import { ResponseDto } from "../../shared/dtos/response.dto";

interface AuthResponse {
    token: string;
    user: User;
}

@Component({
    selector: "app-register",
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: "./register.component.html",
    providers: [CookieService],
})
export class RegisterComponent {
    form: FormGroup;
    activeTab: "guest" | "register" | "login" = "guest";

    constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
        this.form = this.formBuilder.group({
            name: ["", [Validators.required, Validators.minLength(3)]],
            email: ["", [Validators.email]],
            password: ["", [Validators.minLength(6)]],
        });
    }

    ngOnInit(): void {
        if (this.authService.user()) {
            this.router.navigateByUrl("room");
        }
    }

    setAuthMode(mode: "guest" | "register" | "login") {
        this.activeTab = mode;
        this.form.reset();

        // Set validators based on mode
        const nameControl = this.form.get("name");
        const emailControl = this.form.get("email");
        const passwordControl = this.form.get("password");

        if (mode === "guest") {
            nameControl?.setValidators([Validators.required, Validators.minLength(3)]);
            emailControl?.clearValidators();
            passwordControl?.clearValidators();
        } else if (mode === "register") {
            nameControl?.setValidators([Validators.required, Validators.minLength(3)]);
            emailControl?.setValidators([Validators.required, Validators.email]);
            passwordControl?.setValidators([Validators.required, Validators.minLength(6)]);
        } else {
            // login
            nameControl?.clearValidators();
            emailControl?.setValidators([Validators.required, Validators.email]);
            passwordControl?.setValidators([Validators.required]);
        }

        nameControl?.updateValueAndValidity();
        emailControl?.updateValueAndValidity();
        passwordControl?.updateValueAndValidity();
    }

    submitForm() {
        if (this.form?.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const user: User = new User({
            name: this.form.value["name"] ?? "",
            email: this.form.value["email"] ?? "",
            password: this.form.value["password"] ?? "",
        });

        if (this.activeTab === "guest") {
            this.authService.registerAsGuest(user).then((res: ResponseDto<AuthResponse>) => {
                this.authService.setAuth(res.data?.user as User, res.data?.token as string);
                this.router.navigateByUrl("room");
            });
        } else if (this.activeTab === "register") {
            this.authService.register(user).then((res: ResponseDto<AuthResponse>) => {
                this.authService.setAuth(res.data?.user as User, res.data?.token as string);
                this.router.navigateByUrl("room");
            });
        } else {
            this.authService.login(user.email, user.password).then((res: ResponseDto<AuthResponse>) => {
                this.authService.setAuth(res.data?.user as User, res.data?.token as string);
                this.router.navigateByUrl("room");
            });
        }
    }
}
