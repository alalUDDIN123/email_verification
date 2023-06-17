import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationSuccess: string = '';
  registrationError: string = '';

  name: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private userService: UserService
  ) { }

  registerUser() {
    const user = {
      name: this.name,
      email: this.email,
      password: this.password
    };

    this.userService.registerUser(user).subscribe({
      next: (response: any) => {
        this.handleSuccess(response?.message)
      },
      error: (error) => {
        this.handleError(error.status, error?.error?.message)
      },
      complete: () => {
        console.log("success compilition");

      }
    });



  }

  handleSuccess(successMessage: string) {
    if (successMessage === "Registration successful. Please check your email for verification") {
      this.registrationSuccess = "Registration successful. Please check your email for verification"
    } else {
      this.registrationSuccess = "Something went wrong"
    }
    setTimeout(() => {
      this.registrationSuccess = "";
    }, 2500);

  }

  handleError(status: number, errorMessage: string) {
    if (status === 400 && errorMessage === "All fields are required (name, email, password)") {
      this.registrationError = "All fields are required (name, email, password)"
    } else if (status === 400 && errorMessage === "Sorry! Email already exists") {
      this.registrationError = "Used email already exits. Try with another"
    } else {
      this.registrationError = "Something went wrong"
    }
    setTimeout(() => {
      this.registrationError = "";
    }, 2500);

  }

}
