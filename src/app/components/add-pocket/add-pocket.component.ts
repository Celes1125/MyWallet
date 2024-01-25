import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from './../../services/wallet.service';
import { PocketService } from './../../services/pocket.service';
import { Wallet } from '../../interfaces/wallet';
import { CurrencyType } from '../../enums/currency-type';
//Material Design
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';



@Component({
  selector: 'app-add-pocket',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './add-pocket.component.html',
  styleUrl: './add-pocket.component.css'
})
export class AddPocketComponent {
  pocketForm: FormGroup  
  wallets: Wallet[] = [];
  router: Router = new Router;

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

    this.getWallets()

}

addPocket() {  
  const pocket = {
    name: this.pocketForm.value.name,
    currency: this.pocketForm.value.currency,
    amount: this.pocketForm.value.amount,
    wallet: this.pocketForm.value.wallet
  }
  
    this.pocketService.create(pocket).subscribe(
      response => console.log(response)
      
    )     
    
    
}

getWallets(){
  return this.walletService.getAll().subscribe(
    response => this.wallets = response
    
  )
    
  
  
}
}
