import { Component, OnChanges, SimpleChanges } from '@angular/core';
//Material Design
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovementService } from '../../../services/movement.service';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteAllMovementsComponent } from '../../dialogs/delete-all-movements/delete-all-movements.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-movements-page',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './movements-page.component.html',
  styleUrl: './movements-page.component.css'
})
export class MovementsPageComponent implements OnChanges {
  movements: any
  dataSource: any
  router: Router = new Router


  constructor(
    private _movementsService: MovementService,
    public dialog: MatDialog
  ) {
    this.getMovements()

  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMovements()
  }

  getMovements() {
    this._movementsService.getAll().subscribe(
      (response: Observable<any>) => {
        this.movements = response,
          this.dataSource = new MatTableDataSource(this.movements);
      }
    );
  }

  openDeleteAllMovementsDialog() {
    {
      const dialogRef = this.dialog.open(DeleteAllMovementsComponent, {})

      this.dataSource
      dialogRef.afterClosed().subscribe(() => {

        this.router.navigateByUrl('/dashboard')


      });

    }


  }


  displayedColumns: string[] = ['user', 'type', 'category', 'vendor', 'currency', 'amount', 'date', 'fromPocket', 'toPocket', 'pocket', 'wallet', 'notes'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  

}
