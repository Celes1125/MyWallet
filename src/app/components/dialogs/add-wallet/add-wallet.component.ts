import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../../../services/wallet.service';
//Material Design
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { AuthenticationService } from '../../../services/authentication.service';


@Component({
  selector: 'app-add-wallet',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './add-wallet.component.html',
  styleUrl: './add-wallet.component.css'
})
export class AddWalletComponent {
  activated:boolean = false
  walletForm: FormGroup
  userId!:string
  constructor (
    private _formBuilder : FormBuilder,
    private _walletService: WalletService,    
    @Inject(MAT_DIALOG_DATA) public data:any
  ){
    this.walletForm = this._formBuilder.group({
      name: ["", [Validators.required]],

    })

    this.activated = this.data.activated
    
  }

  

  addWallet(){
      const wallet = {
      name: this.walletForm.value.name,
      activated: this.activated
      
      
    }
    this._walletService.create(wallet).subscribe(
      response =>console.log(response)
    )
  }


}
