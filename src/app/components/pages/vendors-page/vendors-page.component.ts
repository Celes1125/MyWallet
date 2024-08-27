import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { VendorService } from '../../../services/vendor.service';
import { Vendor } from '../../../interfaces/vendor';
import { VendorsDialogComponent } from '../../dialogs/vendors-dialog/vendors-dialog.component';
// Material Design
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-vendors-page',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, MatInputModule, MatFormFieldModule, RouterModule, MatTableModule, FormsModule],
  templateUrl: './vendors-page.component.html',
  styleUrl: './vendors-page.component.css'
})

export class VendorsPageComponent  {
  vendors: any[] = []
  dataSource: any = []
  router: Router = new Router
  deleteFlag: boolean = true

  constructor(
    private vendorService: VendorService,
    public dialog: MatDialog) {
      this.getAllVendors()
  }


  getAllVendors() {
    this.vendorService.getAll().subscribe(
      (response: any) => {
        this.vendors = response,
          this.dataSource = new MatTableDataSource(this.vendors);
      })
  }

  displayedColumns: string[] = ['name', 'edit', 'delete'];

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openVendorsDialog(vendor?: Vendor, deleteFlag?: boolean) {
    const dialogRef = this.dialog.open(VendorsDialogComponent, {
      data: {
        vendor: vendor,
        deleteFlag: deleteFlag,
        vendors: this.vendors
      }
    });
    dialogRef.afterClosed().subscribe(
      response => {
        if (response) {
          alert("vendors changes saved ok")
          this.getAllVendors()
        }
      })
  }

}
