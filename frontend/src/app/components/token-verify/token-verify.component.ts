import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-token-verify',
  templateUrl: './token-verify.component.html',
  styleUrls: ['./token-verify.component.scss']
})
export class TokenVerifyComponent {
  message: string = '';

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.verifyEmail();
  }

  verifyEmail() {
    const token = this.route.snapshot.paramMap.get('token');
    if (!token) {
      this.message = 'Please provide a token.';
      return;
    }

    this.userService.verifyEmail(token).subscribe({
      next: (response: any) => {
        console.log("response from next call back ::", response);
        this.handleSucces(response?.message)

      },
      error: (error) => {
        console.log("response from error call back ::", error);
        this.handleError(error.status, error?.error?.message)
      },
      complete: () => {
        console.log("success compilition");

      }
    });

  }

  handleSucces(successMessage: string) {
    this.message = successMessage
  }
  handleError(status: number, errorMessage: string) {
    if (status == 400 && errorMessage === "Invalid or expired token.") {
      this.message = errorMessage
    }
  }

}




