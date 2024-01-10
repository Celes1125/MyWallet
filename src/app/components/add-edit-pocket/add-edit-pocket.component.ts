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
  selector: 'app-add-edit-pocket',
  standalone: true,
  imports: [CommonModule, MaterialDesignModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-edit-pocket.component.html',
  styleUrl: './add-edit-pocket.component.css'
})
export class AddEditPocketComponent implements OnInit {
  pocketForm: FormGroup
  loading: boolean = false
  id: string | undefined
  title:string = " Create"
  router: Router = new Router()
  walletsList$!:Observable<any>
  wallets: any

  constructor
    (private formBuilder: FormBuilder,
      private pocketService: PocketService,
      private walletService: WalletService,
      @Inject(MAT_DIALOG_DATA) public data: any,) {

    this.pocketForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      currency: ["", [Validators.required]],
      amount: ["", [Validators.required]],
      wallet: [Number, [Validators.required]],
    })

    this.id = data.id

  }
  ngOnInit(): void {
    this.isEdit(this.id)
    this.getWallets()
}
  
  isEdit(id:string | undefined) {
  if(id !== undefined){
    this.title=" Edit"
    this.getPocketValues(id)
  }   
}
  getPocketValues(id: string){
    const pocketValues = this.pocketService.getById(id).pipe(
      tap( pocket => {
        console.log('pocket: ', pocket)
        this.pocketForm.setValue(
          {
            name:pocket.name,
            currency:pocket.currency,
            amount:pocket.amount,
            wallet:pocket.wallet
          }

        )
      })
    )
    pocketValues.subscribe()
    
  }
  createOrEditPocket(id?:string | undefined) {
  
    const pocket = {
      name: this.pocketForm.value.name,
      currency: this.pocketForm.value.currency,
      amount: this.pocketForm.value.amount,
      wallet: this.pocketForm.value.wallet
    }

    if (this.id === undefined){
      const createPocket = this.pocketService.create(pocket).pipe(
        tap( (Newpocket)=>{
          console.log('new pocket created: ',Newpocket)}),
        catchError( (error)=>{
          console.log('error', error)
          return of (null)}), 
        finalize( ()=>{
          console.log('ended subscription')
          this.router.navigateByUrl('/dashboard')

        })
        
      )
      createPocket.subscribe()

    }else{
      const editPocket = this.pocketService.edit(this.id, pocket).pipe(
        tap( (updatedPocket) => {
          console.log('updated pocket: ', updatedPocket)
        }),
        catchError(
          error => {
            console.log('error: ', error)
            return of (null)
          }
        ),
        finalize(
          ()=>{
            console.log('ended subscription')
            this.router.navigateByUrl('/dashboard')

          }
        )
        )
      editPocket.subscribe()     

    }    
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
