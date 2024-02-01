import { Component, Inject} from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WalletService } from '../../../services/wallet.service';

@Component({
  selector: 'app-change-activation',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './change-activation.component.html',
  styleUrl: './change-activation.component.css'
})
export class ChangeActivationComponent {

  wallet: any

  constructor (
    private _walletService:WalletService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ){
    this.wallet = this.data.wallet

  }

  activeWallet(){
    const updateWallet = {
      _id: this.wallet._id,
      activated: true
    }
    return this._walletService.edit(updateWallet).subscribe(
      response => console.log(response)
    )

  }

}



