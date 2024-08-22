import { EmptyError, firstValueFrom, of } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from '../../../components/main/wallet/wallet.component';
import { WalletService } from '../../../services/wallet.service';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BlockScrollStrategy } from '@angular/cdk/overlay';

@Component({
  selector: 'app-create-wallet-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, FormsModule, RouterModule, WalletComponent],
  templateUrl: './create-wallet-dialog.component.html',
  styleUrl: './create-wallet-dialog.component.css'
})
export class CreateWalletDialogComponent implements OnInit {
  walletForm: FormGroup;
  walletsOfTheUser: any
  constructor(
    private _walletService: WalletService,
    private _formBuilder: FormBuilder,

  ) {
    this.walletForm = this._formBuilder.group({
      walletName: ["", [Validators.required]],
    })
  }
  async ngOnInit(): Promise<any> {
    console.log('OnInit')
    try {
      this.walletsOfTheUser = await firstValueFrom(this._walletService.getAll());
      console.log('Wallets of the user on ngOnInit:', this.walletsOfTheUser);

    } catch (error) {
      if (error instanceof EmptyError) {
        console.warn('No hay elementos en la secuencia.');
        return of(null); // O cualquier valor predeterminado que desees
      }
      return console.error('Error with ngOnInit promises:', error);
    }
  }

  addWallet() {
    console.log('creating a new wallet')
    let nameOfNewWallet = this.walletForm.value.walletName.toLowerCase()
    console.log('nameOfNewWallet: ', nameOfNewWallet)
    let newWallet = {
      name: nameOfNewWallet
    }
    if (this.checkNameOfNewWallet(nameOfNewWallet) == false ){
      this._walletService.create(newWallet).subscribe(
        (response: any) => console.log(response))
    }else{
      alert('you must to choose another name for your new wallet')
    }  
  }

  
  checkNameOfNewWallet(nameOfNewWallet: any): boolean {
    for (let wallet of this.walletsOfTheUser) {
      if (wallet.name.includes(nameOfNewWallet)) {
        return true;
      }
    }
    return false;
  }
  

}








