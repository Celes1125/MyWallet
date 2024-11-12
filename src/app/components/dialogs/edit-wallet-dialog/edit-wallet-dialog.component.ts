
import { Component, Inject } from '@angular/core';
import { Wallet } from '../../../interfaces/wallet';
import { WalletComponent } from '../../main/wallet/wallet.component';
//Material Design
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-wallet-dialog',
  standalone: true,
  imports: [MatDialogModule, WalletComponent],
  templateUrl: './edit-wallet-dialog.component.html',
  styleUrl: './edit-wallet-dialog.component.css'
})
export class EditWalletDialogComponent {
  wallet: Wallet
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any

  ) {
    this.wallet = this.data.wallet
  }


}
