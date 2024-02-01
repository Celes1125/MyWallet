import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WalletComponent } from "../wallet/wallet.component";
import { WalletService } from '../../../services/wallet.service';
import { AddMovementComponent } from '../../dialogs/add-movement/add-movement.component';
//Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AddCategoryComponent } from '../../dialogs/add-category/add-category.component';
import { AddVendorComponent } from '../../dialogs/add-vendor/add-vendor.component';


@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, WalletComponent, MatButtonModule, MatIconModule, MatDialogModule, RouterModule]
})
export class HomeComponent implements OnInit {
    activeWallet: any
    router : Router = new Router()
    income: boolean = true
    showAddPocketButton : boolean = true

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

    openAddMovementDialog( walletId: string, income:boolean){
        const dialogRef = this.dialog.open(AddMovementComponent, {
            data: {
                walletId:walletId,
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

    openAddCategoryDialog(){
        const dialogRef = this.dialog.open(AddCategoryComponent)

        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    alert("category successfully added")
                    this.router.navigateByUrl('/dashboard');
                }
            });

    }

    openAddVendorDialog(){
        const dialogRef = this.dialog.open(AddVendorComponent)

        dialogRef.afterClosed().subscribe(
            response => {
                if (response) {
                    alert("vendor successfully added")
                    this.router.navigateByUrl('/dashboard');
                }
            });

    }

    

}





