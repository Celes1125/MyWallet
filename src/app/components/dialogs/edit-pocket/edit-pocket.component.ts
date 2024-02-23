
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { WalletService } from '../../../services/wallet.service';
import { PocketService } from '../../../services/pocket.service';
//Material Design
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../../interfaces/wallet';
import { CurrencyType } from '../../../enums/currency-type';

@Component({
  selector: 'app-edit-pocket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './edit-pocket.component.html',
  styleUrl: './edit-pocket.component.css'
})
export class EditPocketComponent {
  pocketForm: FormGroup
  wallets: Wallet[]=[]
  router: Router = new Router;
  pocketId: any;

  constructor
    (private formBuilder: FormBuilder,
      private pocketService: PocketService,
      private walletService: WalletService,
      @Inject(MAT_DIALOG_DATA) public data: any,) {
     

    this.pocketForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      currency: [CurrencyType, [Validators.required]],
      amount: ["", [Validators.required]],
      wallet: ["", [Validators.required]],
    })
    this.pocketId = this.data.id
    this.getWallets()
    this.getPocket(this.pocketId)
   

}

getWallets(){
  this.walletService.getAll().subscribe(
    response => this.wallets=response)
}
getPocket(id:string) {
  this.pocketService.getById(id).subscribe(response => {
    console.log("pocket response on component: ", response)
    this.pocketForm.setValue({
     name: response.name,
     currency: response.currency,
     amount: response.amount,
     wallet: response.wallet

    })
  })
}

editPocket() {  
  const pocket = {
    _id: this.pocketId,
    name: this.pocketForm.value.name,
    currency: this.pocketForm.value.currency,
    wallet: this.pocketForm.value.wallet,
    creationDate: new Date(),
    lastModified: new Date()
  }

  return this.pocketService.edit(pocket).subscribe(
    response => response
  )


}

}

