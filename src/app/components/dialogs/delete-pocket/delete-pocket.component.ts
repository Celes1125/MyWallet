import { PocketService } from '../../../services/pocket.service';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MovementService } from '../../../services/movement.service';
//Material Design
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-pocket',
  standalone: true,
  imports: [MatDialogModule, FormsModule],
  templateUrl: './delete-pocket.component.html',
  styleUrl: './delete-pocket.component.css'
})
export class DeletePocketComponent {
  public id!: string
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private pocketService: PocketService,
    private movementService:MovementService
  ) { 
    this.id = this.data.id
  }

  deletePocket(){    
    this.movementService.deleteMovementsByPocket(this.id).subscribe(
      response => {
        console.log('response')
      }
    )   

      this.pocketService.delete(this.id).subscribe(
        response => {
          console.log('delete pocket response: ', response)
          console.log("pocket deleted")
        }
      )
    }

  }


