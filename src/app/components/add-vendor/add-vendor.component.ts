import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { VendorService } from '../../services/vendor.service';
import { Observable } from 'rxjs';
import { Vendor } from '../../interfaces/vendor';

@Component({
  selector: 'app-add-vendor',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule, MatFormFieldModule],
  templateUrl: './add-vendor.component.html',
  styleUrl: './add-vendor.component.css'
})
export class AddVendorComponent {
  form:FormGroup
  constructor(
    private _vendorService:VendorService,
    private _formBuilder:FormBuilder
  ){
    this.form = this._formBuilder.group({
      name: ["", [Validators.required]]
    })

  }

  addVendor(): Observable<Vendor> | any {
    const vendor = {
      name: this.form.value.name
    }

    this._vendorService.create(vendor).subscribe(
      (response:any) => console.log(response)
    )
  }

}
