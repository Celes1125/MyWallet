import { Component } from '@angular/core';
import { ArchivePageComponent } from "../../../pages/archive-page/archive-page.component";
import { MatDialogModule } from '@angular/material/dialog'
@Component({
    selector: 'app-manage-wallet',
    standalone: true,
    templateUrl: './manage-wallet.component.html',
    styleUrl: './manage-wallet.component.css',
    imports: [ArchivePageComponent, MatDialogModule]
})
export class ManageWalletComponent {


}
