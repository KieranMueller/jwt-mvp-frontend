import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  router = inject(Router)

  logout() {
    if (window.confirm('Are you sure?')) {
      localStorage.removeItem('username');
      localStorage.removeItem('token');
      this.router.navigateByUrl('/login');
    }
  }
}
