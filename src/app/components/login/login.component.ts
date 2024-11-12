import {Component} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {UserService} from "../../services/user";
import {Router} from "@angular/router";
import {AuthRequest} from "../../models/auth-request";
import {AuthResponse} from "../../models/auth-response";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private userService: UserService, private router: Router) {

  }

  authRequest: AuthRequest = new AuthRequest();
  isLoading: boolean = false;
  error?: string;

  connectUser(): void {
    this.isLoading = true;
    this.userService.loginUser(this.authRequest).subscribe({
      next: (data: AuthResponse): void => {
        window.localStorage.setItem("token", data.token);
        this.router.navigate(["home"]).then(() => window.localStorage.setItem("token", data.token));
      },
      error: (err): void => {
        this.error = err.type;
        this.isLoading = false;
      }
    });
  }


}