import { PocketService } from '../../../services/pocket.service';
import { CategoryService } from '../../../services/category.service';
import { Router, RouterModule } from '@angular/router';
import { Component, Inject, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Category } from '../../../interfaces/category';
import { VendorService } from '../../../services/vendor.service';
import { Vendor } from '../../../interfaces/vendor';
import { WalletService } from '../../../services/wallet.service';
import { Pocket } from '../../../interfaces/pocket';
import { MovementService } from '../../../services/movement.service';

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
  templateUrl: './movements-dialog.component.html',
  styleUrl: './movements-dialog.component.css'
})

export class MovementsDialogComponent implements OnInit, OnChanges {

  wallet!: any
  walletId!: any
  incomeForm!: FormGroup
  expenseForm!: FormGroup
  transferForm!: FormGroup
  categories: Category[] = []
  vendors: Vendor[] = []
  pockets: Pocket[] = []
  pocketId: any;
  amountToAdd: any;
  firstAmount: any;
  router: Router = new Router;
  movement_type: string

  constructor(
    private _formBuilder: FormBuilder,
    private _categoriesService: CategoryService,
    private _vendorsService: VendorService,
    private _walletService: WalletService,
    private _movementsService: MovementService,
    private _pocketService: PocketService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {

    this.wallet = this.data.wallet
    this.walletId = this.data.walletId
    this.movement_type = this.data.movement_type

    this.getCategories();
    this.getVendors();
    this.getPockets();

    this.incomeForm = this._formBuilder.group({
      category: [{}, [Validators.required]],
      vendor: [{}, [Validators.required]],
      pocket: [{}, [Validators.required]],
      amount: [0, [Validators.required]]
    });

    this.expenseForm = this._formBuilder.group({
      category: [{}, [Validators.required]],
      vendor: [{}, [Validators.required]],
      pocket: [{}, [Validators.required]],
      amount: [0, [Validators.required]]
    });

    this.transferForm = this._formBuilder.group({
      fromPocket: ["", [Validators.required]],
      toPocket: ["", [Validators.required]],
      amount: [0, [Validators.required]],
      notes: ["", [Validators.required]]
    })


  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getPockets()
  }

  ngOnInit(): void {



  }

  getCategories() {
    this._categoriesService.getAll().subscribe(
      (response: Category[]) => {
        if (response) {
          this.categories = response
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

  addMovement() {
    let movement;

    switch (this.movement_type) {
      case 'income':
        movement = {
          type: "in",
          category: this.categories.find(category => category._id === this.incomeForm.value.category),
          vendor: this.vendors.find(vendor => vendor._id === this.incomeForm.value.vendor),
          pocket: this.pockets.find(pocket => pocket._id === this.incomeForm.value.pocket),
          currency: 'euro',
          amount: this.incomeForm.value.amount,
          notes: "",
          fromPocket: null,
          toPocket: null,
          wallet: this.wallet
        };
        console.log("INCOME MOVEMENT: ", movement);
        this._movementsService.addIncomeOrExpense(movement).subscribe(response => response)
        break;

      case 'expense':
        movement = {
          type: "out",
          category: this.categories.find(category => category._id === this.expenseForm.value.category),
          vendor: this.vendors.find(vendor => vendor._id === this.expenseForm.value.vendor),
          pocket: this.pockets.find(pocket => pocket._id === this.expenseForm.value.pocket),
          currency: 'euro',
          amount: this.expenseForm.value.amount,
          notes: "",
          fromPocket: null,
          toPocket: null,
          wallet: this.wallet
        };
        console.log("EXPENSE MOVEMENT: ", movement);
        this._movementsService.addIncomeOrExpense(movement).subscribe(response => response)
        break;

      case 'transfer':
        movement = {
          type: "transfer",
          category: null,
          vendor: null,
          pocket: null,
          currency: 'euro',
          amount: this.transferForm.value.amount,
          notes: this.transferForm.value.notes,
          fromPocket: this.pockets.find(pocket => pocket._id === this.transferForm.value.fromPocket),
          toPocket: this.pockets.find(pocket => pocket._id === this.transferForm.value.toPocket),
          wallet: this.wallet
        };
        console.log("TRANSFER MOVEMENT: ", movement);

        this._movementsService.create(movement).subscribe(response => response)        
        this._pocketService.refreshPocketsOfTransfers(movement)
        break;

      default:
        console.error("Invalid movement type.");
        break;
    }
  }





}











