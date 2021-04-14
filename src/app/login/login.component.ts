import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'crm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.minLength(3)]),
      password: new FormControl('', [Validators.required, checkPassword])
    })
  }

  ngOnInit(): void {
  }

  logIn(){
    console.log(this.loginForm)
  }

}

function checkPassword(c:AbstractControl): ValidationErrors | null {
  if((c.value as string).length<5){
    return {checkPassword: 'longueur doit être 5'}
  }
  return null
}

