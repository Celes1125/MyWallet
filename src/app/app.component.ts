import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';


@Component({
    selector: 'app-root',
    imports: [CommonModule, RouterOutlet],
    providers: [],
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    
})
export class AppComponent {
  title = 'my_wallet'


     
  
  
}
