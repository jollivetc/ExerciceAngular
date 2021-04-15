import { Injectable } from '@angular/core';
import { User } from './model/user';

const USER_STORAGE_KEY = 'crm.user.storage.key';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?:User;

  constructor() {
    if(sessionStorage.getItem(USER_STORAGE_KEY)){
      this.user = JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY)!);
    }
  }

  get isAuthenticated(): boolean{
    return this.user !== undefined;
  }

  logout(){
    this.user = undefined;
    sessionStorage.removeItem(USER_STORAGE_KEY);
  }

  authentUser(email:string, password:string){
    this.user =  {
      id: 1,
      login: email,
      firstname: 'John',
      lastname: 'Doe'
    }
    sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.user))
    return this.user;
  }
}
