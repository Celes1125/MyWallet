import { AuthenticationService } from './../../services/authentication.service';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  loginForm!:FormGroup
  loginUser$!:Observable<any>
  hasError = false
  token:any
  router: Router = new Router;

  constructor (
    private formBuilder:FormBuilder,    
    private authenticationService:AuthenticationService
  ){
    this.loginForm = this.formBuilder.group({
        email:["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit() {     

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
             this.hasError = true;
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
   

}
