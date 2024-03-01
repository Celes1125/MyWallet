import { Component, OnChanges, SimpleChanges } from '@angular/core';
//Material Design
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Observable } from 'rxjs';
import { TransferService } from '../../../services/transfer.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-transfers-page',
  standalone: true,
  imports: [MatTableModule, MatFormFieldModule, MatInputModule],
  templateUrl: './transfers-page.component.html',
  styleUrl: './transfers-page.component.css'
})


export class TransfersPageComponent implements OnChanges {
  transfers: any
  dataSource: any


  constructor(
    private _transferService: TransferService
  ) {
    this.getTransfers()

  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getTransfers()

  }


  getTransfers() {
    this._transferService.getAll().subscribe(
      (response: Observable<any> | any) => {
        this.transfers = response,
          this.dataSource = new MatTableDataSource(this.transfers);
      }
    )
  }

  displayedColumns: string[] = ['user', 'fromPocket', 'toPocket', 'amount', 'date', 'notes'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}


