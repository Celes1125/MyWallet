import { MovementType } from './../../../enums/movement-type';
import { MatIconModule } from '@angular/material/icon';
import { DeleteAllMovementsDialogComponent } from '../../dialogs/delete-all-movements-dialog/delete-all-movements-dialog.component';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
//Material Design
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MovementService } from '../../../services/movement.service';
import { Observable, filter } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { Movement } from '../../../interfaces/movement';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-movements-page',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatMenuModule, MatTableModule, MatFormFieldModule, MatInputModule, MatDialogModule],
  templateUrl: './movements-page.component.html',
  styleUrl: './movements-page.component.css'
})
export class MovementsPageComponent implements OnChanges, OnInit {
  movements: any;
  dataSource: any;
  users: any[] = [];
  categories: any[] = [];
  vendors: any[] = [];
  wallets: any[] = [];
  movementsType: any[] = [];
  movementsData: any[] = [];

  // Objeto que almacenará los filtros aplicados
  filterValues: any = {
    user: '',
    type: '',
    category: '',
    vendor: '',
    date: '',
    wallet: ''
  };

  constructor(
    private _movementsService: MovementService,
    public dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMovements()
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getMovements()
  }

  getMovements() {
    this._movementsService.getAll().subscribe((response: any) => {
      this.movements = response;
      this.dataSource = new MatTableDataSource(this.movements);
      
      // Configurar el predicate para múltiples filtros
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const searchFilter = JSON.parse(filter);
        
        const matchesUser = searchFilter.user ? data.user?.name?.toLowerCase().includes(searchFilter.user) : true;
        const matchesType = searchFilter.type ? data.type?.toLowerCase().includes(searchFilter.type) : true;
        const matchesCategory = searchFilter.category ? data.category?.name?.toLowerCase().includes(searchFilter.category) : true;
        const matchesVendor = searchFilter.vendor ? data.vendor?.name?.toLowerCase().includes(searchFilter.vendor) : true;
        const matchesDate = searchFilter.date ? data.date?.toLowerCase().includes(searchFilter.date) : true;
        const matchesWallet = searchFilter.wallet ? data.wallet?.name?.toLowerCase().includes(searchFilter.wallet) : true;
        
        return matchesUser && matchesType && matchesCategory && matchesVendor && matchesDate && matchesWallet;
      };
      // Llenar los arrays de usuarios, categorías y otros para los filtros
      this.users = this.getUniqueValues('user');
      this.categories = this.getUniqueValues('category');
      this.vendors = this.getUniqueValues('vendor');
      this.wallets = this.getUniqueValues('wallet');
      this.movementsType = this.getUniqueValues('type');
      this.movementsData = this.getUniqueValues('date');
    });
  }

  //To obtain unique values for user, category, vendor and wallet filters
  getUniqueValues(field: keyof Movement): any[] {
    const uniqueValues = this.movements
      .map((movement: Movement) => movement[field])  // Acceder a la propiedad usando el campo
      .filter((value: any) => value?.name || value)  // Filtrar valores no válidos
      .reduce((acc: any[], value: any) => {
        const name = value?.name || value;  // Algunos valores pueden no tener `name`
        if (!acc.some((v: any) => (v.name || v) === name)) {
          acc.push(value);
        }
        return acc;
      }, []);
  
    // Añadir una opción 'Todos' al principio del array
    
    if (typeof uniqueValues[0] === 'object' && uniqueValues[0]?.name) {
      return [{ name: 'all' }, ...uniqueValues];  // Para objetos con `name`
    } else {
      return ['all', ...uniqueValues];  // Para strings como `date` o `type`
    }
  }
   

  openDeleteAllMovementsDialog() {
    {
        const dialogRef = this.dialog.open(DeleteAllMovementsDialogComponent, {})
      this.dataSource
      dialogRef.afterClosed().subscribe(() => {
          this.router.navigateByUrl('/dashboard')
        });
      }
  }

  displayedColumns: string[] = ['user', 'type', 'category', 'vendor', 'currency', 'amount', 'date', 'fromPocket', 'toPocket', 'pocket', 'wallet', 'notes'];

  // general filter
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filterValues = { ...this.filterValues, global: filterValue };
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  //user filter
  applyUserFilter(user: any) {
    if (user?.name === 'all') {
      this.filterValues.user = '';  // Reset user filter
    } else {
      this.filterValues.user = user?.name?.toLowerCase() || '';
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);  // Refreshing global filter
  }
  
  //movement type filter
  applyMovementTypeFilter(movementType: any) {
    if (movementType === 'all'){
      this.filterValues.type = '';
    }else{
      this.filterValues.type = movementType?.toLowerCase() || '';
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
    
  // category filter
  applyCategoryFilter(category: any) {
    if (category?.name === 'all') {
      this.filterValues.category = ''; // Muestra todos los movimientos (resetea solo el filtro de categoría)
    } else {
      this.filterValues.category = category?.name?.toLowerCase() || '';
    }
    this.dataSource.filter = JSON.stringify(this.filterValues)
  }
  // vendor filter 
  applyVendorFilter(vendor: any) {
    if (vendor?.name === 'all') {
      this.filterValues.vendor = ''; 
    } else {
      this.filterValues.vendor = vendor?.name?.toLowerCase() || '';
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }
  // date filter
  applyMovementDateFilter(date: any) {
    if (date === 'all') {
      this.filterValues.date = ''; 
    } else {
      this.filterValues.date = date?.toLowerCase() || '';
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  // wallet filter
  applyWalletFilter(wallet: any) {
    if (wallet?.name === 'all') {
      this.filterValues.wallet = ''; 
    } else {
      this.filterValues.wallet = wallet?.name?.toLowerCase() || '';
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  resetAllFilters() {
    this.dataSource.filter = ''; 
  }
}






