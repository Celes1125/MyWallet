import { AddPocketComponent } from './../add-pocket/add-pocket.component';
import { Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WalletService } from '../../services/wallet.service';
import { MatButtonModule } from '@angular/material/button';
import { 
    MatDialogModule,
    MatDialog,
    MAT_DIALOG_DATA,
    MatDialogRef,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  } from '@angular/material/dialog';
import { Wallet } from '../../interfaces/wallet';
@Component({
    selector: 'app-wallet',
    standalone: true,
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css'],
    imports: [CommonModule, MatTableModule, MatInputModule, 
        MatFormFieldModule, MatButtonModule, MatDialogModule, AddPocketComponent]
})
export class WalletComponent implements OnInit {

    @Input()
    wallet!:any  
    pockets!:any
    dataSource!:any

    constructor(
        private walletService: WalletService,
        public dialog : MatDialog
    ) {        
        
     }


    ngOnInit(): void {
        this.getPocketsOfWallet()
        
    }   
    
    getPocketsOfWallet(){
        if(this.wallet !== undefined){
            const id = this.wallet._id
            this.walletService.getPocketsOfWallet(id).subscribe(
                response => {
                    this.pockets = response  
                    this.dataSource = this.pockets  
                }        
            )
        }       

    }

    displayedColumns: string[] = ['pocket', 'currency', 'amount', 'select'];
    
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    addPocketDialog(){
        const dialogRef = this.dialog.open(AddPocketComponent, {
           //data: {name: this.name, animal: this.animal},
          });
      
          /*dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');
            this.animal = result;
          });
        }*/
    }
}

    















