import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from "../wallet/wallet.component";
import { WalletService } from '../../services/wallet.service';
//Material Design
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [CommonModule, WalletComponent, MatButtonModule, MatIconModule]
})
export class HomeComponent implements OnInit {
    activeWallet: any

    constructor(
        private walletService: WalletService,
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

    

}





