import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSelectModule } from '@angular/material/select';
@NgModule({
  declarations: [],
  imports: [
    MatButtonModule,
    MatFormFieldModule,    
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose, 
    MatIconModule,
    MatGridListModule,
    MatSelectModule,
    
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,    
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,  
    MatIconModule,
    MatGridListModule,
    MatSelectModule,
  ]
})
export class MaterialDesignModule { }

//This module contains only material design moduls