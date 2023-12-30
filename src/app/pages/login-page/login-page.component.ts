import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, tap, catchError, of, finalize } from 'rxjs';
import { RouterModule, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { AuthenticationService } from '../../services/authentication.service';


@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  //ATRIBUTES
  form : FormGroup;
  snackbar : MatSnackBar
  newUser$!: Observable<any>
  hasError: boolean = false
  router: Router = new Router;
  loginForm!:FormGroup
  loginUser$!:Observable<any>
  hasLoginError = false
  token:any  

  //CONSTRUCTOR

  constructor ( 
    private _formBuilder : FormBuilder,
    private _snackbar : MatSnackBar,
    private userService : UserService,
    private authenticationService:AuthenticationService,
    ){
    this.form = this._formBuilder.group({
      name: ["", [Validators.required, Validators.minLength(4)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/)]]

    })

    this.loginForm = this._formBuilder.group({
      email:["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,12}/)]]
  })

  
    this.snackbar = this._snackbar

    // Agrego un oyente al formControlName="name"
    this.form.get('name')?.valueChanges.subscribe(value => {
      
      if ( this.form.get('name')?.errors) {
        this.openSnackBar("El nombre de usuario debe contener al menos 4 caracteres que pueden ser letras, números y espacios")
      }
    })

    // Agrego un oyente al formControlName="email"
    this.form.get('email')?.valueChanges.subscribe(value => {
      if (this.form.get('email')?.errors) {
        this.openSnackBar("Debe proporcionar un correo electrónico válido y que no haya sido ya registrado previamente en esta aplicación")
      }
    })

     // Agrego un oyente al formControlName="password"
     this.form.get('password')?.valueChanges.subscribe(value => {
      if (this.form.get('password')?.errors) {
        this.openSnackBar("La contraseña debe poseer una longitud de entre 6 y 12 caracteres, y contener números y al menos una letra, una minúscula y una mayúscula")
      }
    })

    // Agrego un oyente al formControlName="email" del loginForm
    this.loginForm.get('email')?.valueChanges.subscribe(value => {
      if (this.loginForm.get('email')?.errors) {
        this.openSnackBar("Debe proporcionar un correo electrónico válido")
      }
    })

     // Agrego un oyente al formControlName="password" del LoginForm
     this.loginForm.get('password')?.valueChanges.subscribe(value => {
      if (this.loginForm.get('password')?.errors) {
        this.openSnackBar("La contraseña debe poseer una longitud de entre 6 y 12 caracteres, y contener números y al menos una letra, una minúscula y una mayúscula")
      }
    })
  }

   //OTHERS 


   signup() {

    const user = this.form.value;
    this.newUser$ = this.userService.create(user).pipe(
      tap(response => {
        alert('Post Successful! Now go to login');
        
        // Puedes realizar acciones adicionales después del éxito si es necesario
        
      }),
      catchError(error => {
        alert('EROOR: ' + error.error.message);
        console.log('ERROR: ', error)
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
  login() {     

    const email = this.loginForm.value.email;  
    const password =  this.loginForm.value.password;   
         this.loginUser$ = this.authenticationService.login(email, password).pipe(
          tap((response: any) => {
            if (response && response.token) {
              console.log('Inicio de sesión exitoso');
              this.token = response.token;
              // Almacena el token en el localStorage
          localStorage.setItem('token', this.token);    
          this.router.navigateByUrl('/dashboard');         
          
            } else {
              console.error('Formato de respuesta no válido');
            }
          }),          
           catchError(error => {
             alert('EROOR: ' + error);
             this.hasLoginError = true;
             // Devuelve un observable vacío o un observable de valor predeterminado en caso de error
             return of(null);
             
           }),
           finalize(() => {            
             console.log('La suscripción se ha completado');            
             this.loginForm.reset()
             
           })
         ); 
         this.loginUser$.subscribe()
    
       }   

  openSnackBar(message:string) {
    this.snackbar.open(message, '', {
      horizontalPosition: "center",
      verticalPosition: "bottom",
      duration: 2000
    })   
  }


  
}
