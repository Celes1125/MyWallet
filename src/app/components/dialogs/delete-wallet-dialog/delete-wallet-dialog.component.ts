import { Component, Inject } from '@angular/core';
import { WalletService } from '../../../services/wallet.service';
//Material Design
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../../interfaces/wallet';


@Component({
  selector: 'app-delete-wallet-dialog',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-wallet-dialog.component.html',
  styleUrl: './delete-wallet-dialog.component.css'
})
export class DeleteWalletDialogComponent {
  wallet:Wallet
constructor(
  @Inject(MAT_DIALOG_DATA) public data: any,
    private _walletService: WalletService,
){
  this.wallet = this.data.wallet
}


  delete(): void {      
    this._walletService.delete(this.data.wallet._id)
  } 
  
}


