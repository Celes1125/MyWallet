import { WalletService } from './../../services/wallet.service';
import { PocketService } from './../../services/pocket.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MaterialDesignModule } from '../../material-design.module';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, catchError, finalize, of, tap } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-pocket',
  standalone: true,
  imports: [CommonModule, MaterialDesignModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-pocket.component.html',
  styleUrl: './add-pocket.component.css'
})
export class AddPocketComponent {
  pocketForm: FormGroup
  walletsList$!: Observable<any>;
  wallets: any;
  router: Router = new Router;

  constructor
    (private formBuilder: FormBuilder,
      private pocketService: PocketService,
      private walletService: WalletService,
      @Inject(MAT_DIALOG_DATA) public data: any,) {

    this.pocketForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      currency: ["", [Validators.required]],
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
  
    const createPocket = this.pocketService.create(pocket).pipe(
      tap( (Newpocket)=>{
        console.log('new pocket created: ',Newpocket)
        this.router.navigateByUrl('/dashboard')}),
        
      catchError( (error)=>{
        console.log('error', error)
        return of (null)}), 
      finalize( ()=>{
        console.log('ended subscription')
        

      })
      
    )
    createPocket.subscribe()  
}

getWallets(){
  this.walletsList$ = this.walletService.getAll().pipe(
    tap( (response:any) => {
      console.log('WALLETS RESPONSE: ', response)
     this.wallets= response
    }),catchError((error) => {
      console.log('error: ', error)
      return of (null)
    }), finalize( () => {
      console.log('ended walletsList$ subscription')
    })
  )
  this.walletsList$.subscribe()
  
}
}
