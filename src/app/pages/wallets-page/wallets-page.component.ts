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
import { ArchivePageComponent } from '../archive-page/archive-page.component';

@Component({
    selector: 'app-wallets-page',
    standalone: true,
    imports: [CommonModule, WalletComponent, MatButtonModule, MatIconModule, MatDialogModule, RouterModule],
    templateUrl: './wallets-page.component.html',
    styleUrl: './wallets-page.component.css',
})
export class WalletsPageComponent {
    activeWallet: any
    router : Router = new Router()
    
    constructor(
        private walletService: WalletService,
        public dialog : MatDialog
    ) {
              
        this.getActiveWallet()
     }
    
    ngOnInit(): void {
    }

    getActiveWallet(){
        this.walletService.getActiveWallet().subscribe(
            activeWallet => {
                this.activeWallet = activeWallet
                console.log('wallet: ', activeWallet)}
        )
    }

    openAddPocketDialog() {
        const dialogRef = this.dialog.open(AddPocketComponent, {
            data: {}

        });
        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    alert("pocked added ok")
                    //this.router.navigateByUrl('/dashboard');
                }
            });
    }

    openEditWalletDialog(wallet:any){
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
      openAddWalletDialog(){
        const dialogRef = this.dialog.open(AddWalletComponent, {
            data: {

            }
        })
        dialogRef.afterClosed().subscribe(
            response => {
                if (response){
                    alert("wallet created ok")
                }
            }
        )
      }
      openArchive(){
        const dialogRef = this.dialog.open(ArchivePageComponent, {})
      }
}
