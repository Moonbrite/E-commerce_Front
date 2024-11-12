import {Component} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatInput} from "@angular/material/input";
import {User} from "../../models/user";
import {UserService} from "../../services/user";

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    MatFormField,
    FormsModule,
    MatInput,
    MatError,
    MatLabel
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  user: User = new User();

  constructor(private serviceUser: UserService, private router: Router) {
  }

  error?: string;

  addUser() {
    this.serviceUser.registerUser(this.user).subscribe({
      next: (data) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.error = error.type;
      }
    });
  }


}
