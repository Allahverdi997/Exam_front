import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth-service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    debugger;
    if (!this.auth.isTokenValid()) {
      console.warn("Token invalid or expired!");
      return next.handle(req);
    }

    const token = localStorage.getItem("token");

    const cloned = req.clone({
      setHeaders: { "AuthenticationToken": `${token}` }
    });

    return next.handle(cloned);
  }
}
