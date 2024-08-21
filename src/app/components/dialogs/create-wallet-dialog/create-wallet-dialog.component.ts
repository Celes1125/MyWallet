import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from  '../../../components/main/wallet/wallet.component';
import { WalletService } from '../../../services/wallet.service';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-create-wallet-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule,FormsModule, RouterModule, WalletComponent ],
  templateUrl: './create-wallet-dialog.component.html',
  styleUrl: './create-wallet-dialog.component.css'
})
export class CreateWalletDialogComponent {
  walletForm: FormGroup;
  constructor(    
    private _walletService: WalletService,
    private _formBuilder: FormBuilder,

  ) { 
    this.walletForm = this._formBuilder.group({
      walletName: ["", [Validators.required]],
    }) 
  }

  addWallet() {
    let wallet = {
      name: this.walletForm.value.walletName      
    }
    this._walletService.create(wallet).subscribe(
      (response: any) => console.log(response)
    )
  }
}
