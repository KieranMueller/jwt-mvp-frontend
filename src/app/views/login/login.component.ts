import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

export type User = {
  username: string;
  password: string;
  role: string;
};

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  user: User = {
    username: '',
    password: '',
    role: 'USER',
  };
  http = inject(HttpClient);
  router = inject(Router);
  isError = false;
  errorMessage = '';

  login() {
    console.log(this.user);
    this.http.post(`http://localhost:8081/login`, this.user).subscribe({
      next: (res: any) => {
        console.log(res);
        if (res.token) {
          localStorage.setItem('username', this.user.username)
          localStorage.setItem('token', res.token)
          this.router.navigateByUrl('/home')
        }
      },
      error: (e) => {
        console.log(e);
        if (e.status === 0) {
          this.errorMessage = 'Unable to reach server';
        } else {
          this.errorMessage = 'Unable to find user';
        }
        this.isError = true;
      },
    });
  }

  resetError() {
    this.isError = false;
  }

  register() {
    this.router.navigateByUrl('/register');
  }
}
