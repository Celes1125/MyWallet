import { catchError, EmptyError, firstValueFrom, map, Observable, of, tap } from 'rxjs';
import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WalletComponent } from '../../../components/main/wallet/wallet.component';
import { WalletService } from '../../../services/wallet.service';
import { RouterModule, Router } from '@angular/router';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Wallet } from '../../../interfaces/wallet';

@Component({
  selector: 'app-create-wallet-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, FormsModule, RouterModule, WalletComponent],
  templateUrl: './create-wallet-dialog.component.html',
  styleUrl: './create-wallet-dialog.component.css'
})
export class CreateWalletDialogComponent implements OnInit {
  walletForm: FormGroup;
  userWallets: Wallet[]

  constructor(
    private _formBuilder: FormBuilder,
    private _walletService: WalletService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.walletForm = this._formBuilder.group({
      walletName: ["", [Validators.required]],
    })

    this.userWallets = this.data.wallets
  }
  async ngOnInit(): Promise<void> {
    console.log('OnInit');

  }

  async addWallet() {
    let newWallet = { name: this.walletForm.value.walletName.toLowerCase() }
    const checkName: boolean = this.userWallets.some((wallet) => wallet.name?.toLowerCase()==newWallet.name.toLowerCase())
    if (checkName) {
      return alert('that name is already in use')
    } else {
      return this._walletService.create(newWallet).subscribe(response => console.log(response))
    }
  }
}









