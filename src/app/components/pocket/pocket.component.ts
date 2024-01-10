
import { Component, Input, inject, OnInit } from '@angular/core';
import { PocketService } from '../../services/pocket.service';
import { RouterModule, Router } from '@angular/router';
import { tap, finalize, catchError, of } from 'rxjs';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MaterialDesignModule } from '../../material-design.module';
import { AddEditPocketComponent } from '../add-edit-pocket/add-edit-pocket.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-pocket',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, FormsModule, MaterialDesignModule],
  templateUrl: './pocket.component.html',
  styleUrl: './pocket.component.css'})
export class PocketComponent implements OnInit {
  @Input()
  pocket: any = []
  router: Router = new Router()
  loading: boolean = false
  constructor(
    private pocketService: PocketService,
    public addEditDialog: MatDialog,
    public _snackbar: MatSnackBar
  ) { }
  ngOnInit(): void {
    console.log('on init')
  }
  delete(id: string) {
    this.loading = true;
    const deletePocket = this.pocketService.delete(id).pipe(
      tap(() => {
        this.loading = false;
        this._snackbar.open('The pocket was eliminated succesfully', '', {
          duration: 2000
        });
        console.log('pocket id: ', id + ' was deleted')
      }),
      catchError((error) => {
        alert('error: ' + error);
        return of(null)
      }),
      finalize(() => {
        console.log('La suscripción se ha completado');
        this.router.navigateByUrl('/dashboard')
      })
    )
    deletePocket.subscribe()
  }
  createOrEditPocket(id?: string) {
    const dialog = this.addEditDialog.open(AddEditPocketComponent, {
      width: '550px',
      disableClose: true,
      data: { id: id }
    });
  }

}
