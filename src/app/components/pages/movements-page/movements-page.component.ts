import { Component, OnChanges, SimpleChanges } from '@angular/core';
//Material Design
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovementService } from '../../../services/movement.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movements-page',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './movements-page.component.html',
  styleUrl: './movements-page.component.css'
})
export class MovementsPageComponent implements OnChanges {
  movements: any
  dataSource:any
  

  constructor(
    private _movementsService:MovementService
  ){
    this.getMovements()     

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getMovements()  
  }


  getMovements(){
    this._movementsService.getAll().subscribe(
      (response:Observable<any> | any)=> {
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
