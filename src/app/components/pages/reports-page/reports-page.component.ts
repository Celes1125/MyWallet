import { Component} from '@angular/core';
//Material Design

import { MovementsPageComponent } from '../movements-page/movements-page.component';
import { TransfersPageComponent } from '../transfers-page/transfers-page.component';


@Component({
    selector: 'app-reports-page',
    standalone: true,
    templateUrl: './reports-page.component.html',
    styleUrl: './reports-page.component.css',
    imports: [MovementsPageComponent, TransfersPageComponent]
})
export class ReportsPageComponent {

  }
