import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { User } from './model/user';

const USER_STORAGE_KEY = 'crm.user.storage.key';
const TOKEN_STORAGE_KEY= 'crm.token.storage.key';

interface AuthResponse {
  user: User,
  token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user?:User;
  private token?: string;

  constructor(private http: HttpClient) {
    if(sessionStorage.getItem(USER_STORAGE_KEY)){
      this.user = JSON.parse(sessionStorage.getItem(USER_STORAGE_KEY)!);
      this.token = sessionStorage.getItem(TOKEN_STORAGE_KEY)!;
    }
  }

  get jwtToken(): string|undefined{
    return this.token;
  }

  get isAuthenticated(): boolean{
    return this.user !== undefined;
  }

  logout(){
    this.user = undefined;
    sessionStorage.removeItem(USER_STORAGE_KEY);
  }

  authentUser(email:string, password:string):Observable<User>{
    return this.http.post<AuthResponse>('/api/auth/login', {email: email, password: password})
      .pipe(
        map((response)=>{
          this.token = response.token;
          this.user = response.user;
          sessionStorage.setItem(USER_STORAGE_KEY, JSON.stringify(this.user))
          sessionStorage.setItem(TOKEN_STORAGE_KEY, this.token!);
          return this.user;
        })
      )
  }
}
