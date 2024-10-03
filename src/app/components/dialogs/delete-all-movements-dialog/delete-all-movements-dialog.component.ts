import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovementService } from '../../../services/movement.service';


@Component({
  selector: 'app-delete-all-movements',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-all-movements-dialog.component.html',
  styleUrl: './delete-all-movements-dialog.component.css'
})
export class DeleteAllMovementsDialogComponent {

  constructor (
    private _movementService: MovementService
  ){}

  //WARNING!!!fisic delete of all movements of the user!
  deleteAllMovements(){
    this._movementService.deleteMovementsByUser().subscribe(
      response=>response
    )
  }

}
