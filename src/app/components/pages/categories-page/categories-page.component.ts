import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { WalletComponent } from '../../main/wallet/wallet.component';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AddWalletComponent } from '../../dialogs/add-wallet/add-wallet.component';
import { CategoryService } from '../../../services/category.service';
import { CategoriesDialogComponent } from '../../dialogs/categories-dialog/categories-dialog.component';
import { Category } from '../../../interfaces/category';;

// Material Design
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [AddWalletComponent, WalletComponent, MatTableModule, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatIconModule, FormsModule, MatDialogModule, RouterModule],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.css'
})
export class CategoriesPageComponent {
  categories: any[] = []
  dataSource: any = []
  router: Router = new Router
  deleteFlag:boolean=true
  constructor(
    private categoryService: CategoryService,
    public dialog: MatDialog) {
    this.getAllCategories()
  }

  getAllCategories() {
    this.categoryService.getAll().subscribe(
      (response:any)=> {
        this.categories = response,
          this.dataSource = new MatTableDataSource(this.categories);
      })
  }

  displayedColumns: string[] = ['name', 'edit', 'delete'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openCategoriesDialog(category?: Category, deleteFlag?: boolean ) {
    const dialogRef = this.dialog.open(CategoriesDialogComponent, {
      data: {
        category: category,
        deleteFlag:deleteFlag 
    }});
    dialogRef.afterClosed().subscribe(
      response => {
          if (response) {
              alert("categories changes saved ok")
              this.getAllCategories()
          }
      })
  }

}






