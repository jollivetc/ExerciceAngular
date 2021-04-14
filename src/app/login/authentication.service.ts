import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  authentUser(email:string, password:string){
    return {
      userId: 1,
      login: email,
      firstname: 'John',
      lastname: 'Doe'
    }
  }
}
