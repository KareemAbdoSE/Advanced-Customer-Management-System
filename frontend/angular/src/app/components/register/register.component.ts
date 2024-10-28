import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerRegistrationRequest } from '../../models/customer-registration-request';
import { CustomerService } from '../../services/customer/customer.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { AuthenticationRequest } from '../../models/authentication-request';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  errorMsg = '';
  customer: CustomerRegistrationRequest = {};

  constructor(
    private router: Router,
    private customerService: CustomerService,
    private authenticationService: AuthenticationService
  ) {}

  // Navigate to the login page
  login() {
    this.router.navigate(['login']);
  }

  // Create a new customer account
  createAccount() {
    this.customerService.registerCustomer(this.customer)
      .subscribe({
        next: () => {
          // Auto-login after successful registration
          const authReq: AuthenticationRequest = {
            username: this.customer.email,
            password: this.customer.password
          };
          this.authenticationService.login(authReq)
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
        },
        error: () => {
          // Handle registration error
          this.errorMsg = 'Registration failed. Please try again.';
        }
      });
  }
}
