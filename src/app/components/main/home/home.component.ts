
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WalletComponent } from "../wallet/wallet.component";
import { WalletService } from '../../../services/wallet.service';
import { AddMovementComponent } from '../../dialogs/add-movement/add-movement.component';
import { AddCategoryComponent } from '../../dialogs/add-category/add-category.component';
import { AddVendorComponent } from '../../dialogs/add-vendor/add-vendor.component';
import { AddWalletComponent } from '../../dialogs/add-wallet/add-wallet.component';
import { Wallet } from '../../../interfaces/wallet';

import { WalletsPageComponent } from '../../../pages/wallets-page/wallets-page.component';
//Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, WalletComponent, MatButtonModule, MatIconModule, MatDialogModule, RouterModule, AddWalletComponent, WalletsPageComponent]
})
export class HomeComponent implements OnInit {
    wallets:Wallet[]=[]
    activeWallet: any
    router: Router = new Router()
    income: boolean = true
    activated: boolean = true
    fromHome: boolean = true
    constructor(
        private walletService: WalletService,
        public dialog: MatDialog
    ) {
        this.walletService.getAll().subscribe(
            (response: Wallet[])=> {
                const walletsNow = response  
                this.wallets = walletsNow              
            }
        )
       
        this.getActiveWallet()

    }

    ngOnInit(): void {
    }


    getActiveWallet() {
        this.walletService.getActiveWallet().subscribe(
            (activeWallet:Wallet) => {
                this.activeWallet = activeWallet
                console.log('wallet: ', activeWallet)
            }
        )
    }

    openAddMovementDialog(walletId: string, income: boolean) {
        const dialogRef = this.dialog.open(AddMovementComponent, {
            data: {
                walletId: walletId,
                income: income

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

    openActiveWalletDialog(){
        const dialogRef = this.dialog.open(WalletsPageComponent, {})
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {                    
                    this.router.navigateByUrl('/dashboard');
                }
            });
    }




}





