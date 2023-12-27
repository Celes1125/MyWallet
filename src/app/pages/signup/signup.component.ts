import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  //ATRIBUTES
  form!: FormGroup
  public newUser$! : Observable<any>
  public hasError: boolean = false
  router: Router = new Router;
  // $ al final es una buena práctica para diferenciar que es un observable
  // si añadimos ? al final indica al compilador que la inicialización de la variable es opcional
  //si añadimos ! al final indica al compilador que la inicialización será definida en la ejecución

  //CONSTRUCTOR
  constructor( private formBuilder: FormBuilder,
               private userService: UserService,
    
  ) {
    this.form = this.formBuilder.group(
      {
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]]
      }
    )   
  }
 
  //OTHERS 


onSubmit() {     

 const user = this.form.value;   
      this.newUser$ = this.userService.create(user).pipe(
        tap(response => {
          alert('Post Successful: ' + response );
          // Puedes realizar acciones adicionales después del éxito si es necesario
          this.router.navigateByUrl('/login');
        }),
        catchError(error => {
          alert('EROOR: ' + error);
          this.hasError = true;
          // Devuelve un observable vacío o un observable de valor predeterminado en caso de error
          return of(null);
        }),
        finalize(() => {
          // Acciones que se ejecutarán siempre, ya sea éxito o error
          // Puedes realizar la limpieza u otras acciones aquí
          console.log('La suscripción se ha completado');
          // Realiza alguna acción adicional después de que la suscripción se complete
          // Por ejemplo, puedes restablecer el formulario o navegar a otra página
          this.form.reset()
          
        })
      ); 
      this.newUser$.subscribe()
 
    }   

  }

  


  

  
  




















