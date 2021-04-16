import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export class JWTIntercepteurService {

  constructor(private authentificationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const token = this.authentificationService.jwtToken;
    const clone = req.clone({setHeaders:{Authorization: `Bearer ${token}`}})
    return next.handle(clone);
  }

}
