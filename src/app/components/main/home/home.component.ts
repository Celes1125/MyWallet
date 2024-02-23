import { Pocket } from './../../../interfaces/pocket';
import { map } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WalletComponent } from "../wallet/wallet.component";
import { WalletService } from '../../../services/wallet.service';
import { AddMovementComponent } from '../../dialogs/add-movement/add-movement.component';
import { AddWalletComponent } from '../../dialogs/add-wallet/add-wallet.component';
import { Wallet } from '../../../interfaces/wallet';

import { WalletsPageComponent } from '../../pages/wallets-page/wallets-page.component';
//Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MakeTransferComponent } from '../../dialogs/make-transfer/make-transfer.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, WalletComponent, MatButtonModule, MatIconModule, MatDialogModule, RouterModule, AddWalletComponent, WalletsPageComponent]
})
export class HomeComponent  {
    wallets:Wallet[]=[]
    activeWallet: any
    router: Router = new Router()
    income: boolean = true
    transfer:boolean = true
    activated: boolean = true
    fromHome: boolean = true
    totalAmount!: number
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


    getActiveWallet() {
        this.walletService.getActiveWallet().subscribe(
            (activeWallet:Wallet) => {
                this.activeWallet = activeWallet
                console.log('wallet: ', activeWallet)
            }
        )
    }

    

    openAddMovementDialog(walletId: string, income: boolean, transfer?:boolean) {
        const dialogRef = this.dialog.open(AddMovementComponent, {
            data: {
                walletId: walletId,
                income: income,
              

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

    openTransferDialog(wallet: Wallet) {
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
    }     





}





