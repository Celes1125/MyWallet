import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../../../services/wallet.service';
//Material Design
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-add-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-wallet.component.html',
  styleUrl: './add-wallet.component.css'
})
export class AddWalletComponent {
  activated: boolean = false
  walletForm: FormGroup
  userId!: string
  constructor(
    private _formBuilder: FormBuilder,
    private _walletService: WalletService,

  ) {
    this.walletForm = this._formBuilder.group({
      name: ["", [Validators.required]],
    })

  }
  addWallet() {
    const wallet = {
      name: this.walletForm.value.name,
    }
    this._walletService.create(wallet).subscribe(
      (response: any) => console.log(response)
    )
    

  }

}




