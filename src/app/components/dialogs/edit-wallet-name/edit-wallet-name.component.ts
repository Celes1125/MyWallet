import { WalletService } from './../../../services/wallet.service';
import { Component, ElementRef, Inject, Input, ViewChild } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../../interfaces/wallet';
import { WalletComponent } from '../../main/wallet/wallet.component';
import { FormsModule} from '@angular/forms';


@Component({
  selector: 'app-edit-wallet-name',
  standalone: true,
  imports: [FormsModule, MatDialogModule, WalletComponent],
  templateUrl: './edit-wallet-name.component.html',
  styleUrl: './edit-wallet-name.component.css'
})
export class EditWalletNameComponent {
  wallet: Wallet  
  newName:any

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    private _walletService : WalletService
    
  ){
    this.wallet = this.data.wallet
  }

  changeWalletName(){      
    const newWallet = {
      _id: this.wallet._id,
      name: this.newName
    }
    this._walletService.edit(newWallet).subscribe(
      response => response
    )


  }


}
