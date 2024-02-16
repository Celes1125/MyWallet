import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WalletComponent } from '../../components/main/wallet/wallet.component';
import { WalletService } from '../../services/wallet.service';

//Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddPocketComponent } from '../../components/dialogs/add-pocket/add-pocket.component';
import { EditWalletComponent } from '../../components/dialogs/edit-wallet/edit-wallet.component';
import { AddWalletComponent } from '../../components/dialogs/add-wallet/add-wallet.component';
import { Wallet } from '../../interfaces/wallet';
import { WalletsPageComponent } from '../wallets-page/wallets-page.component';

@Component({
    selector: 'app-manage-page',
    standalone: true,
    imports: [CommonModule, WalletComponent, MatButtonModule, MatIconModule, MatDialogModule, RouterModule],
    templateUrl: './manage-page.component.html',
    styleUrl: './manage-page.component.css',
})
export class ManagePageComponent {

    activeWallet: any
    router: Router = new Router()

    constructor(
        private walletService: WalletService,
        public dialog: MatDialog
    ) {

        this.getActiveWallet()
    }

    ngOnInit(): void {
    }

    getActiveWallet() {
        this.walletService.getActiveWallet().subscribe(
            (activeWallet: Wallet) => {
                this.activeWallet = activeWallet
                console.log('wallet: ', activeWallet)
            }
        )
    }

    openAddPocketDialog(wallet: any) {
        const dialogRef = this.dialog.open(AddPocketComponent, {
            data: {
                wallet: wallet
            }

        });
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    alert("pocked added ok")
                    //this.router.navigateByUrl('/dashboard');
                }
            });
    }

    openEditWalletDialog(wallet: any) {
        const dialogRef = this.dialog.open(EditWalletComponent, {
            data: {
                walletToEdit: wallet
            }
        })
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    alert("wallet edited ok")
                }
            });
    }
    openAddWalletDialog() {
        const dialogRef = this.dialog.open(AddWalletComponent, {
            data: {

            }
        })
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    alert("wallet created ok")
                }
            }
        )
    }
    openWalletsManager() {
        const dialogRef = this.dialog.open(WalletsPageComponent, {})
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    alert("wallets changes saved ok")
                }
            }
        )
    }


    openVendorsManager() {
        throw new Error('Method not implemented.');
    }



    openCategoriesManager() {
        throw new Error('Method not implemented.');
    }
}
