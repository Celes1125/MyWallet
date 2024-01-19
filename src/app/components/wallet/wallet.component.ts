import { DeletePocketComponent } from './../delete-pocket/delete-pocket.component';
import { AddPocketComponent } from './../add-pocket/add-pocket.component';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WalletService } from '../../services/wallet.service';
import { MatButtonModule } from '@angular/material/button';
import {
    MatDialogModule,
    MatDialog    
} from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
@Component({
    selector: 'app-wallet',
    standalone: true,
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css'],
    imports: [CommonModule, MatTableModule, MatInputModule, RouterModule,
        MatFormFieldModule, MatButtonModule, MatDialogModule, AddPocketComponent]
})
export class WalletComponent implements OnInit {
    @Input()
    wallet!: any
    pockets!: any
    dataSource!: any
    router: Router = new Router;

    constructor(
        private walletService: WalletService,
        public dialog: MatDialog
    ) {
        
    }

    ngOnInit(): void {
        this.getPocketsOfWallet()
    }

    getPocketsOfWallet() {
        if (this.wallet !== undefined) {
            const id = this.wallet._id
            this.walletService.getPocketsOfWallet(id).subscribe(
                response => {
                    this.pockets = response
                    this.dataSource = new MatTableDataSource(this.pockets);
                }
            )
        }

    }
    
  

    displayedColumns: string[] = ['pocket', 'currency', 'amount', 'select'];
    
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    addPocketDialog() {
        const dialogRef = this.dialog.open(AddPocketComponent, {
            //data: {name: this.name, animal: this.animal},
        });
    }

    openDeletePocketDialog(id: string) {
        const dialogRef = this.dialog.open(DeletePocketComponent, {
            data: { id: id }
        });

        dialogRef.afterClosed().subscribe(
            response => {
                if(response){
                    
                    alert("pocked deleted ok")
                    this.router.navigateByUrl('/dashboard');
                }
               
            }
        );
           }

}





















