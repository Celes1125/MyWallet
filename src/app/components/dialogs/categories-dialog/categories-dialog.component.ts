import { CategoryService } from './../../../services/category.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Category } from '../../../interfaces/category';
import { FormsModule, FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, ReactiveFormsModule],
  templateUrl: './categories-dialog.component.html',
  styleUrl: './categories-dialog.component.css'
})
export class CategoriesDialogComponent {
  category?:Category
  deleteFlag?: boolean | undefined
  form!:FormGroup
  editForm!: FormGroup
    
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryService:CategoryService,
    private _formBuilder:FormBuilder
  ){
    this.category = this.data.category
    this.deleteFlag = this.data.deleteFlag
    this.form = this._formBuilder.group({
      name: ["",[Validators.required]],
      description: ""
    })
    
    if(this.category !== undefined){    
 
      this.editForm = this._formBuilder.group({
        editname: this.category.name,
        editdescription: this.category.description
      })
    }
    
  }


  createNewCategory(){
    const category= {
      name: this.form.value.name,
      description: this.form.value.description
    }
    this._categoryService.create(category).subscribe(
      (response:any) => response
    )
  }

  editCategory(){
    if(this.category !== undefined){
      const category = {
        _id :this.category._id,
        name: this.editForm.value.editname,
        description: this.editForm.value.editdescription
       }
      this._categoryService.edit(category).subscribe(
        (response:any) => response
      )  
    }else{
      return alert ("you can't edit the category")
    }
    
  }

  deleteCategory(){
    if(this.category !== undefined){
      this._categoryService.delete(this.category._id).subscribe(
        (response:any) => response
      )
    }  

  }

}
