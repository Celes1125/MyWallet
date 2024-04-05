import { Component} from '@angular/core';
//Material Design

import { MovementsPageComponent } from '../movements-page/movements-page.component';



@Component({
    selector: 'app-reports-page',
    standalone: true,
    templateUrl: './reports-page.component.html',
    styleUrl: './reports-page.component.css',
    imports: [MovementsPageComponent]
})
export class ReportsPageComponent {

  }
