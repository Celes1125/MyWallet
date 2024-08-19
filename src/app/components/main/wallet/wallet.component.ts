import { Component, Input, OnInit,  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WalletService } from '../../../services/wallet.service';
import { PocketsDialogComponent } from '../../dialogs/pockets-dialog/pockets-dialog.component';

//Material Design
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { WalletsDialogComponent } from '../../dialogs/wallets-dialog/wallets-dialog.component';
import { Wallet } from '../../../interfaces/wallet';


@Component({
    selector: 'app-wallet',
    standalone: true,
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css'],
    imports: [CommonModule, MatTableModule, MatInputModule, RouterModule,
        MatFormFieldModule, MatButtonModule, MatDialogModule]
})
export class WalletComponent implements OnInit {

    @Input() wallet!: Wallet
    @Input() showAddPocketButton: boolean = true
    pockets!: any
    dataSource!: any
    router: Router = new Router;
    totalAmount!: number
    netoAmount!:number
    deleteFlag: boolean = true
    changeName: boolean = true

    constructor(
        private walletService: WalletService,
        public dialog: MatDialog,
 
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
                    this.getAmounts(this.pockets)
                }
            )
        }
    }

    getAmounts(pockets: any) {
        this.totalAmount = 0;
        this.netoAmount = 0;

        if (pockets && pockets.length > 0) {
            for (let i = 0; i < pockets.length; i++) {
                // Sumar el valor de la propiedad amount de cada pocket al totalAmount
                this.totalAmount += pockets[i].amount;                
            }
            const mainPocket= pockets[0]
            
            if(mainPocket){
                this.netoAmount = this.totalAmount-mainPocket.amount
            }
           
            
        }    
    }

    displayedColumns: string[] = ['pocket', 'currency', 'amount', 'edit', 'delete'];

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }    
  

    openWalletsDialog() {
        if(this.wallet != undefined){            
            const dialogRef = this.dialog.open(WalletsDialogComponent, {
                data: {
                    wallet: this.wallet,                   
                    changeName: this.changeName
                }
            });
    
            dialogRef.afterClosed().subscribe(
                response => {
                    if (response) {
                        this.router.navigateByUrl('/dashboard');
                    }
                });
    
        } 

    }

    openPocketsDialog(pocketId?:string, deleteFlag?:boolean){
        const dialogRef = this.dialog.open(PocketsDialogComponent, {
            data: {
                wallet: this.wallet,
                pocketId:pocketId,
                deleteFlag:deleteFlag

            }
        });

        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    this.router.navigateByUrl('/dashboard');
                }
            });
    }



}



























