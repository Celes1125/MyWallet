import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletService } from '../../../services/wallet.service';
import { PocketService } from '../../../services/pocket.service';
import { Wallet } from '../../../interfaces/wallet';
import { CurrencyType } from '../../../enums/currency-type';
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
  walletOnReception! : any
  defaultWalletValue: string;

  constructor
    (private formBuilder: FormBuilder,
      private pocketService: PocketService,
      private walletService: WalletService,
      @Inject(MAT_DIALOG_DATA) public data: any,) {

    this.getWallets()

    this.walletOnReception = this.data.wallet

    this.defaultWalletValue = this.walletOnReception._id
   

    this.pocketForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      currency:["euro", [Validators.required]],      
      wallet: [this.defaultWalletValue, [Validators.required]],
    })   

}

addPocket() {  
  const pocket = {
    name: this.pocketForm.value.name,    
    amount:0,
    currency: this.pocketForm.value.currency,
    wallet: this.pocketForm.value.wallet,
    
  }
  
    this.pocketService.create(pocket).subscribe(
      (response:any) => console.log(response)
      
    )     
    
    
}

getWallets(){
  return this.walletService.getAll().subscribe(
    (response:Wallet[]) => this.wallets = response
    
  )
    
  
  
}
}
