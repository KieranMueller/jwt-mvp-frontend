import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { User } from '../login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  user: User = {
    username: '',
    password: '',
    role: 'USER',
  };
  http = inject(HttpClient);
  router = inject(Router);
  isError = false;
  errorMessage = '';
  success = false;

  register() {
    console.log(this.user);
    this.http.post(`http://localhost:8081/register`, this.user).subscribe({
      next: (res) => {
        console.log(res);
        this.success = true;
        setTimeout(() => {
          this.router.navigateByUrl('/login');
        }, 1000);
      },
      error: (e) => {
        console.log(e);
        if (e.status === 0) {
          this.errorMessage = 'Unable to reach server';
        } else {
          this.errorMessage = 'Unable to register';
        }
        this.isError = true;
      },
    });
  }

  back() {
    this.router.navigateByUrl('/login');
  }

  resetError() {
    this.isError = false;
  }
}
