import { Router, RouterModule } from '@angular/router';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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

//Material Design
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-add-movement',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule, MatFormFieldModule,
    MatStepperModule, MatButtonModule, MatInputModule, RouterModule],
  templateUrl: './add-movement.component.html',
  styleUrl: './add-movement.component.css'
})

export class AddMovementComponent implements OnInit, OnChanges {
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
  router: Router = new Router;

  constructor(
    private _formBuilder: FormBuilder,
    private _categoriesService: CategoryService,
    private _vendorsService: VendorService,
    private _walletService: WalletService,
    private _movementsService: MovementService,
    private _authService: AuthenticationService,    
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
  ngOnChanges(changes: SimpleChanges): void {
   this.getPockets()
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
      this._movementsService.addMovementAndRefresh(movement).subscribe(
        response => response
      )           
      
  }    
 
    
}
  
   






