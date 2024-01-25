import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CategoryService } from '../../services/category.service';
import { Category } from '../../interfaces/category';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, MatDialogModule, MatFormFieldModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  form: FormGroup

  constructor (
    private _categoryService: CategoryService,
    private _formBuilder: FormBuilder){

      this.form = this._formBuilder.group( {
        name: ['', [Validators.required]],
        description: ""
      })
  }

  addCategory(){
    const category = {
      name : this.form.value.name,
      description: this.form.value.description
    }
    
    this._categoryService.create(category).subscribe(
      (response: Category) => console.log(response))
    
  }

}
