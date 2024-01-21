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
    localStorage.removeItem('token')
    alert('See you later!')
    this.router.navigateByUrl('login')
  }

}
