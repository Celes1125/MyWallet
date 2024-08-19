import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Wallet } from '../../../interfaces/wallet';
import { WalletComponent } from  '../../../components/main/wallet/wallet.component';
import { WalletService } from '../../../services/wallet.service';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
//Material Design
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-wallets-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, WalletComponent, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './wallets-dialog.component.html',
  styleUrl: './wallets-dialog.component.css'
})
export class WalletsDialogComponent {    
  
  router: Router = new Router()  
  walletForm: FormGroup  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(WalletService) private _walletService: WalletService,
    private _formBuilder: FormBuilder,

  ) { 
    this.walletForm = this._formBuilder.group({
      walletName: ["", [Validators.required]],
    }) 
  }

  addWallet() {
    let wallet = {
      name: this.walletForm.value.walletName,
      users: []
    }
    this._walletService.create(wallet).subscribe(
      (response: any) => console.log(response)
    )
  }

  /*changeWalletName(){              
      let newWallet = {
        _id: this.wallet?._id,
        name: this.newName
      }
      this._walletService.edit(newWallet).subscribe(
        response => response
      )
  }

  delete(): void {    
    if(this.wallet != null)
    this._walletService.delete(this.wallet)
  } 
  
}
*/
}

