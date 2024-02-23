import { Component, Inject } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../../interfaces/wallet';
import { WalletComponent } from '../../../components/main/wallet/wallet.component';

@Component({
  selector: 'app-edit-wallet',
  standalone: true,
  imports: [MatDialogModule, WalletComponent],
  templateUrl: './edit-wallet.component.html',
  styleUrl: './edit-wallet.component.css'
})
export class EditWalletComponent {
  wallet: Wallet
  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any
    
  ){
    this.wallet = this.data.walletToEdit
  }



}
