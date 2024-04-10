import { SharedService } from './../../../services/shared.service';
import { FormsModule } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WalletComponent } from "../wallet/wallet.component";
import { WalletService } from '../../../services/wallet.service';
import { AddMovementComponent } from '../../dialogs/add-movement/add-movement.component';
import { AddWalletComponent } from '../../dialogs/add-wallet/add-wallet.component';
import { WalletsPageComponent } from '../../pages/wallets-page/wallets-page.component';
//Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
  

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [FormsModule, CommonModule, WalletComponent, MatButtonModule, MatIconModule, MatDialogModule, RouterModule, AddWalletComponent, WalletsPageComponent]
})
export class HomeComponent implements OnInit {
    wallets: any | null = null
    selectedWallet: any | null = null;
    router: Router = new Router()    
    fromHome: boolean = true
    totalAmount!: number

    constructor(
        private walletService: WalletService,
        private sharedService: SharedService,
        public dialog: MatDialog
    ) {

    }
    ngOnInit() {
        this.getAllWallets()
        this.sharedService.selectedValue$.subscribe(value => (this.selectedWallet = value));
    }

    getAllWallets() {
        this.walletService.getAll().subscribe(
            response =>
                this.wallets = response,

        )
    }

    openAddMovementDialog(movement_type: string) {
        const dialogRef = this.dialog.open(AddMovementComponent, {
            data: {
                wallet: this.selectedWallet,
                walletId: this.selectedWallet._id,
                movement_type: movement_type

            }

        });
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    alert("movement successfully added")
                    this.router.navigateByUrl('/dashboard');
                }
            });
    }

    openAddWalletDialog() {
        const dialogRef = this.dialog.open(AddWalletComponent, {
            data: {
                activated: true
            }
        })
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {

                    this.router.navigateByUrl('/dashboard');
                }
            });
    }

    /*openTransferDialog(wallet: Wallet) {
        const dialogRef = this.dialog.open(MakeTransferComponent, {
            data: {
                wallet: wallet,
            }

        });
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    alert("transfer ok")
                    this.router.navigateByUrl('/dashboard');
                }
            });
    }*/





}





