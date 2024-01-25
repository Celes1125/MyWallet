import { Component } from '@angular/core';
//Material Design
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovementService } from '../../services/movement.service';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './reports-page.component.html',
  styleUrl: './reports-page.component.css'
})
export class ReportsPageComponent {
  movements: any
  dataSource:any
  

  constructor(
    private _movementsService:MovementService
  ){
    this._movementsService.getAll().subscribe(
      response=> {
        this.movements = response,
        this.dataSource = new MatTableDataSource(this.movements); }     
    )   

  }

 displayedColumns: string[] = ['creator', 'type', 'category', 'vendor', 'currency', 'amount', 'date', 'pocket'];

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  }
