// Component handling user login functionality
import { Component } from '@angular/core';
import { AuthenticationRequest } from '../../models/authentication-request';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  authenticationRequest: AuthenticationRequest = {};
  errorMsg = '';

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  // Attempt to log in the user
  login() {
    this.errorMsg = '';
    this.authenticationService.login(this.authenticationRequest)
      .subscribe({
        next: (authenticationResponse) => {
          localStorage.setItem('user', JSON.stringify(authenticationResponse));
          this.router.navigate(['customers']);
        },
        error: (err) => {
          if (err.error.statusCode === 401) {
            this.errorMsg = 'Login and/or password is incorrect';
          }
        }
      });
  }

  // Navigate to the registration page
  register() {
    this.router.navigate(['register']);
  }
}
