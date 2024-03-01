import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WalletService } from '../../../services/wallet.service';
import { DeletePocketComponent } from '../../dialogs/delete-pocket/delete-pocket.component';
import { AddPocketComponent } from '../../dialogs/add-pocket/add-pocket.component';
import { EditPocketComponent } from '../../dialogs/edit-pocket/edit-pocket.component';

//Material Design
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Wallet } from '../../../interfaces/wallet';
import { EditWalletNameComponent } from '../../dialogs/edit-wallet-name/edit-wallet-name.component';
import { Pocket } from '../../../interfaces/pocket';

@Component({
    selector: 'app-wallet',
    standalone: true,
    templateUrl: './wallet.component.html',
    styleUrls: ['./wallet.component.css'],
    imports: [CommonModule, MatTableModule, MatInputModule, RouterModule,
        MatFormFieldModule, MatButtonModule, MatDialogModule, AddPocketComponent]
})
export class WalletComponent implements OnInit {

    @Input() wallet!: any
    @Input() showAddPocketButton: boolean = true
    pockets!: any
    dataSource!: any
    router: Router = new Router;
    totalAmount!: number
    netoAmount!:number

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
                    this.getAmounts(this.pockets)
                }
            )
        }
    }

    getAmounts(pockets: any) {
        this.totalAmount = 0;
        this.netoAmount=0;

        if (pockets && pockets.length > 0) {
            for (let i = 0; i < pockets.length; i++) {
                // Sumar el valor de la propiedad amount de cada pocket al totalAmount
                this.totalAmount += pockets[i].amount;                
            }
            const mainPocket= pockets.find((pocket:Pocket) => pocket.name === "ingresos")
            
            this.netoAmount = this.totalAmount-mainPocket.amount
            
        }    
    }

    displayedColumns: string[] = ['pocket', 'currency', 'amount', 'edit', 'delete'];

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    openAddPocketDialog(wallet: Wallet) {
        const dialogRef = this.dialog.open(AddPocketComponent, {
            data: {
                wallet: wallet
            }

        });
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    this.router.navigateByUrl('/dashboard');
                }
            });
    }

    openDeletePocketDialog(id: string) {
        const dialogRef = this.dialog.open(DeletePocketComponent, {
            data: { id: id }
        });
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {

                    this.router.navigateByUrl('/dashboard');
                }
            });
    }

    openEditPocketDialog(id: string) {
        const dialogRef = this.dialog.open(EditPocketComponent, {
            data: {
                id: id,
            }
        })
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {

                    this.router.navigateByUrl('/dashboard');
                }
            });
    }

    openEditWalletName(wallet: any) {
        const dialogRef = this.dialog.open(EditWalletNameComponent, {
            data: {
                wallet: wallet
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



























