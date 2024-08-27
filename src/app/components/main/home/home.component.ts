import { SharedService } from './../../../services/shared.service';
import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, ElementRef, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { WalletComponent } from '../wallet/wallet.component';
import { WalletService } from '../../../services/wallet.service';
import { MovementsDialogComponent } from '../../dialogs/movements-dialog/movements-dialog.component';
import { WalletsPageComponent } from '../../pages/wallets-page/wallets-page.component';
//Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { Wallet } from '../../../interfaces/wallet';
import { EmptyError, firstValueFrom, of } from 'rxjs';
import { CreateWalletDialogComponent } from '../../dialogs/create-wallet-dialog/create-wallet-dialog.component';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [FormsModule, CommonModule, WalletComponent, MatButtonModule, MatIconModule, MatDialogModule, RouterModule, WalletsPageComponent]
})
export class HomeComponent implements OnInit, AfterViewInit {
    router: Router = new Router()
    wallets: Wallet[] = []
    selectedWallet: Wallet | null = null
    @ViewChild('createWallet') createWalletElement!: ElementRef
    @ViewChild('selectWallet') selectWalletElement!: ElementRef
    @ViewChild('showingWallet') showingWalletElement!: ElementRef

    constructor(
        public dialog: MatDialog,
        public walletService: WalletService,
        public sharedService: SharedService
    ) { }


    async ngOnInit(): Promise<any> {
        console.log('OnInit')
        try {
           this.wallets = await firstValueFrom(this.walletService.getAll());
            console.log('Wallets cargadas en ngOnInit:', this.wallets);

        } catch (error) {
            if (error instanceof EmptyError) {
                console.warn('No hay elementos en la secuencia.');
                return of(null); // O cualquier valor predeterminado que desees
            }
            return console.error('Error with ngOnInit promises:', error);
        }

        this.sharedService.selectedValue$.subscribe(response => {
            this.selectedWallet = response;
            this.displayHomeOptions()
            if (response != null) {
                this.selectWalletElement.nativeElement.style = "display:none"
            }
        })
    }

    ngAfterViewInit(): void {
        console.log('afterViewInit')
        console.log('createWalletElement: ', this.createWalletElement)
        console.log('selectWalletElement: ', this.selectWalletElement)
        console.log('showingWalletElement: ', this.showingWalletElement)
        this.displayHomeOptions()

    }

    displayHomeOptions() {
        if (this.wallets.length >= 1 && this.selectedWallet != null) {
            this.showingWalletElement.nativeElement.style = "display:block"
        }
        if (this.wallets.length >= 1 && this.selectedWallet == null) {
            this.selectWalletElement.nativeElement.style = "display:block"
        }
        if (this.wallets.length == 0) {
            this.createWalletElement.nativeElement.style = "display: block"

        }
    }

    openCreateWalletDialog() {
        const dialogRef = this.dialog.open(CreateWalletDialogComponent, {
            data: {
                wallets : this.wallets
            }
        });
        dialogRef.afterClosed().subscribe(response => {
            if (response) {
                this.router.navigateByUrl('/dashboard');
            }
        });
    }

    openAddMovementDialog(movement_type: string) {
        const dialogRef = this.dialog.open(MovementsDialogComponent, {
            data: {
                wallet: this.selectedWallet,
                walletId: this.selectedWallet ? this.selectedWallet._id : null,
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
}





