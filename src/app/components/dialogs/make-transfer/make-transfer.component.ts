import { PocketService } from './../../../services/pocket.service';

import { FormsModule, FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Pocket } from '../../../interfaces/pocket';
import { WalletService } from '../../../services/wallet.service';
import { Wallet } from '../../../interfaces/wallet';
import { CommonModule } from '@angular/common';
import { TransferService } from '../../../services/transfer.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-make-transfer',
  standalone: true,
  imports: [MatDialogModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './make-transfer.component.html',
  styleUrl: './make-transfer.component.css'
})
export class MakeTransferComponent implements OnInit {
  wallet: Wallet
  pockets: Pocket[] = []
  form!: FormGroup

  constructor(private _formBuilder: FormBuilder,
    private _walletService: WalletService,
    private _pocketService: PocketService,
    private _transferService: TransferService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    this.wallet = this.data.wallet
    this.getPocketsOfWallet()


  }
  ngOnInit(): void {

    this.form = this._formBuilder.group({
      fromPocket: ["", [Validators.required]],
      toPocket: ["", [Validators.required]],
      transferAmount: [0, [Validators.required]],
      note: ["", [Validators.required]]
    })
  }

  getPocketsOfWallet() {
    if (this.wallet !== undefined) {
      const id = this.wallet._id
      this._walletService.getPocketsOfWallet(id).subscribe(
        response => {
          this.pockets = response
        }
      )
    }
  }

  makeTransfer() {
    const transfer = {
      fromPocket: this.form.value.fromPocket,
      toPocket: this.form.value.toPocket,
      amount: this.form.value.transferAmount,
      note: this.form.value.note
    }

    console.log("TRANSFER: ", transfer)
    this._transferService.create(transfer).subscribe(
      (response:any) => response
    )

    this._pocketService.refreshPocketsOfTransfers(transfer)



  }
}
