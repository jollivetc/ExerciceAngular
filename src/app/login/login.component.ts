import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, checkPassword])
    })
  }

  ngOnInit(): void {
    if(this.authenticationService.isAuthenticated){
      this.authenticationService.logout();
    }
  }

  logIn(){
    this.authenticationService.authentUser(
                    this.loginForm.value.email,
                    this.loginForm.value.password)
        .subscribe(
          (result)=>{
            console.log(result)
            this.router.navigateByUrl('home');
          },
          (error)=>{
            console.log(error);
            alert("erreur login ou mdp");
          },
          ()=>{}
        );
  }
}

function checkPassword(c:AbstractControl): ValidationErrors | null {
  if((c.value as string).length<5){
    return {checkPassword: 'longueur doit être 5'}
  }
  return null
}

