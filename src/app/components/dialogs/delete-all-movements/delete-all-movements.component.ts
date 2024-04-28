import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MovementService } from '../../../services/movement.service';


@Component({
  selector: 'app-delete-all-movements',
  standalone: true,
  imports: [MatDialogModule],
  templateUrl: './delete-all-movements.component.html',
  styleUrl: './delete-all-movements.component.css'
})
export class DeleteAllMovementsComponent {

  constructor (
    private _movementService: MovementService
  ){}


  deleteAllMovements(){

    this._movementService.deleteMovementsByUser().subscribe(
      response=>response
    )
  }

}
