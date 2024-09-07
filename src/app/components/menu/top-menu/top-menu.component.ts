import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
//Material Design
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-top-menu',
  standalone: true,
  imports: [MatToolbarModule, RouterModule, MatButtonModule, MatIconModule],
  templateUrl: './top-menu.component.html',
  styleUrl: './top-menu.component.css'
})
export class TopMenuComponent {
  router: Router

  constructor(
    private _route: Router
  ) {
    this.router = this._route
  }

  logout() {
    localStorage.removeItem('token');
    alert('See you later!');
    this.router.navigateByUrl('login').then(() => {
      window.location.reload(); // Asegura que no se quede ningún estado anterior.
    });
  }

}

//token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NmQ3MjgzMGQ4MGQ3NjUzNzVmNDkxZDEiLCJpYXQiOjE3MjU2NDEyOTQsImV4cCI6MTcyNTY0NDg5NH0.ZhNnmjkNZXexdEFm10c6tJ9_WOeQKLnTciy6zQFGopw"
//token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NWM3NTQyODU4ZjhmZmFhNzBkYmMwMjEiLCJpYXQiOjE3MjU2NDEzMzksImV4cCI6MTcyNTY0NDkzOX0.K6Dov4CZitQXXj4V9hQZgOEauD-VqEI-U0VWvHV3f1c"