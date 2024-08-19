import { Component, Inject } from '@angular/core';
import { PocketService } from '../../../services/pocket.service';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WalletService } from '../../../services/wallet.service';
import { Wallet } from '../../../interfaces/wallet';
import { CurrencyType } from '../../../enums/currency-type';
import { MovementService } from '../../../services/movement.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pockets-dialog',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule],
  templateUrl: './pockets-dialog.component.html',
  styleUrl: './pockets-dialog.component.css'
})
export class PocketsDialogComponent {
  wallets: Wallet[] = []
  walletOnReception?: any
  defaultWalletValue: string;
  addPocketForm: FormGroup
  editPocketForm: FormGroup
  deleteFlag?: boolean | undefined
  pocketId: any;
  public id!: string
  constructor(
    private _pocketService: PocketService,
    private _walletService: WalletService,
    private _formBuilder: FormBuilder,
    private _movementService: MovementService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.getWallets()
    this.walletOnReception = this.data.wallet
    this.defaultWalletValue = this.walletOnReception._id

    this.addPocketForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      currency: ["euro", [Validators.required]],
      wallet: [this.defaultWalletValue, [Validators.required]],
    })

    this.editPocketForm = this._formBuilder.group({
      name: ["", [Validators.required]],
      currency: [CurrencyType, [Validators.required]],
      amount: ["", [Validators.required]],
      wallet: ["", [Validators.required]],
    })

    this.pocketId = this.data.pocketId
    this.getPocket(this.pocketId)
    this.id = this.data.pocketId
    this.deleteFlag = this.data.deleteFlag
  }

  getWallets() {
    return this._walletService.getAll().subscribe(
      (response: Wallet[]) => this.wallets = response
    )
  }
  addPocket() {
    const pocket = {
      name: this.addPocketForm.value.name,
      amount: 0,
      currency: this.addPocketForm.value.currency,
      wallet: this.addPocketForm.value.wallet,

    }
    this._pocketService.create(pocket).subscribe(
      (response: any) => console.log(response)
    )
  }
  getPocket(id: string) {
    this._pocketService.getById(id).subscribe(response => {
      console.log("pocket response on component: ", response)
      this.editPocketForm.setValue({
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
      name: this.editPocketForm.value.name,
      currency: this.editPocketForm.value.currency,
      wallet: this.editPocketForm.value.wallet,
      creationDate: new Date(),
      lastModified: new Date()
    }

    return this._pocketService.edit(pocket).subscribe(
      response => response
    )


  }
  deletePocket() {
    this._movementService.deleteMovementsByPocket(this.id).subscribe(
      (response: any) => {
        console.log('response')
      }
    )

    this._pocketService.delete(this.id).subscribe(
      response => {
        console.log('delete pocket response: ', response)
        console.log("pocket deleted")
      }
    )
  }


}
