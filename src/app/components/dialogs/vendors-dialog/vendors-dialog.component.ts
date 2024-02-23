import { Vendor } from './../../../interfaces/vendor';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';

@Component({
  selector: 'app-vendors-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vendors-dialog.component.html',
  styleUrl: './vendors-dialog.component.css'
})
export class VendorsDialogComponent {
  vendor?: Vendor | undefined
  deleteFlag?: boolean | undefined
  form!: FormGroup
  editForm!: FormGroup

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _vendorService: VendorService,
    private _formBuilder: FormBuilder
  ) {
    this.vendor = this.data.vendor
    this.deleteFlag = this.data.deleteFlag
    this.form = this._formBuilder.group({
      name: ["", [Validators.required]]

    })

    if (this.vendor !== undefined) {

      this.editForm = this._formBuilder.group({
        editname: this.vendor.name
      })
    }

  }


  createNewVendor() {
    const vendor = {
      name: this.form.value.name
    }
    this._vendorService.create(vendor).subscribe(
      (response: any) => response
    )
  }

  editVendor() {
    if (this.vendor !== undefined) {
      const vendor = {
        _id: this.vendor._id,
        name: this.editForm.value.editname,
        
      }
      this._vendorService.edit(vendor).subscribe(
        (response: any) => response
      )
    } else {
      return alert("you can't edit the vendor")
    }

  }

  deleteVendor() {
    if (this.vendor !== undefined) {
      this._vendorService.delete(this.vendor._id).subscribe(
        (response: any) => response
      )
    }

  }
}
