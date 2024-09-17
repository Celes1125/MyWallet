import { Vendor } from './../../../interfaces/vendor';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { VendorService } from '../../../services/vendor.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vendors-dialog',
  standalone: true,
  imports: [MatDialogModule, FormsModule, ReactiveFormsModule],
  templateUrl: './vendors-dialog.component.html',
  styleUrl: './vendors-dialog.component.css'
})
export class VendorsDialogComponent implements OnInit{
  vendor?: Vendor | undefined
  deleteFlag?: boolean | undefined
  form!: FormGroup
  editForm!: FormGroup
  vendors:Vendor[]=[]
  vendors$:Observable<Vendor[]> = this._vendorService.getAll()

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
  ngOnInit(): void {
    this.vendors$.subscribe( (response) => {
      this.vendors = response;
      console.log('vendors on dialog: ', this.vendors)
    });
  }

  createNewVendor() {
    const newVendor = {
      name: this.form.value.name
    }
    const checkName = this.vendors.some((vendor) => vendor.name.toLowerCase()== newVendor.name.toLowerCase() )
    if(checkName){
      alert('The name is already in use')
    }else{
      return this._vendorService.create(newVendor).subscribe(
        (response: any) => response
      )
    }          
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
