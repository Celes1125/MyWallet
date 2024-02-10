import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category';
import { CategoryService } from '../../../services/category.service';
import { VendorService } from '../../../services/vendor.service';
import { Vendor } from '../../../interfaces/vendor';
import { WalletService } from '../../../services/wallet.service';
import { Pocket } from '../../../interfaces/pocket';
import { MovementService } from '../../../services/movement.service';
import { AuthenticationService } from '../../../services/authentication.service';
import { PocketService } from '../../../services/pocket.service';

//Material Design
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { catchError, map, of, switchMap, tap, throwError } from 'rxjs';

@Component({
  selector: 'app-add-movement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule, MatFormFieldModule,
    MatStepperModule, MatButtonModule, MatInputModule],
  templateUrl: './add-movement.component.html',
  styleUrl: './add-movement.component.css'
})

export class AddMovementComponent implements OnInit {
  walletId: any
  form!: FormGroup
  categories: Category[] = []
  vendors: Vendor[] = []
  pockets: Pocket[] = []
  income: boolean
  id!: any
  pocketId: any;
  amountToAdd: any;
  firstAmount: any;  
  

  constructor(
    private _formBuilder: FormBuilder,
    private _categoriesService: CategoryService,
    private _vendorsService: VendorService,
    private _walletService: WalletService,
    private _movementsService: MovementService,
    private _authService: AuthenticationService,
    private _pocketService: PocketService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.form = this._formBuilder.group({
      category: ['', [Validators.required]],
      vendor: ['', [Validators.required]],
      pocket: ['', [Validators.required]],
      amount: [Number, [Validators.required]]
    });

    this.walletId = this.data.walletId
    this.income = this.data.income
    this.getUser()
  }

  ngOnInit(): void {
    this.getCategories();
    this.getVendors();
    this.getPockets();

  }

  getUser() {
    this._authService.getUserId().subscribe(
      response => {
        console.log('front response: ', response)
        this.id = response
      }
    )
  }


  getCategories() {
    this._categoriesService.getAll().subscribe(
      (response: Category[], error: string) => {
        if (response) {
          this.categories = response
        } else {
          console.log(error)
        }
      }
    )
  }

  getVendors() {
    this._vendorsService.getAll().subscribe(
      (response: Vendor[], error: string) => {
        if (response) {
          this.vendors = response
        } else {
          console.log(error)
        }
      }
    )
  }

  getPockets() {
    this._walletService.getPocketsOfWallet(this.walletId).subscribe(
      response => {
        this.pockets = response
      }
    )
  } 

  addMovement(){   
      const movement = {
        type: (this.income) ? "in" : "out",
        category: this.form.value.category,
        vendor: this.form.value.vendor,
        pocket: this.form.value.pocket,
        currency: 'euro',
        user: this.id,
        amount: this.form.value.amount
      };    

  const createMovementAndRefresh$ = this._movementsService.create(movement).pipe(
    tap((createdMovement: any) => console.log('created movement: ', createdMovement)),
    switchMap( ()=> this._pocketService.getById(movement.pocket)),
    map(pocket => pocket.amount),
    catchError(error => {
      console.error('Error al obtener el bolsillo:', error);
      return of (null)
    }),
    map(amount => {
      const newAmount = this.income? amount + movement.amount : amount - movement.amount
      return {amount, newAmount}
    }),
    tap(({newAmount}) => console.log(newAmount)),
    switchMap(({newAmount}) => {
      return this._pocketService.edit({
        _id: movement.pocket,
        amount: newAmount,
        lastModified: new Date()
      });
    }),
    catchError(error => {
      console.error('Error al obtener el bolsillo:', error);
      return of (null)
    }),
  )

  createMovementAndRefresh$.subscribe(response => response)
  this.getPockets();

      
  }


    
    
}
  
   






