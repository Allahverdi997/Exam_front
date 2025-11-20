import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response';
import { LoginRequest } from '../models/login-request';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  constructor(private httpClient:HttpClient,private router:Router) {
    
  }

  apiUrl=environment.apiUrl+"User/login";

  getToken(request:LoginRequest){

    var result:Boolean=false;

    this.httpClient.post<BaseResponse<string>>(this.apiUrl, request)
      .subscribe(resp => {
        debugger;
        if (resp.success && resp.data) {
          localStorage.setItem('token', resp.data);

          this.router.navigate(['/exam']);
          return;
        }

        var errors=resp.errors?.map(e => e.exceptionMessage).join(', ');
        
        Swal.fire({
      icon: 'error',
      title: 'Error',
      text:  errors|| 'Unknown error',
      confirmButtonText: 'OK'
    });

      });
  }

  isTokenValid(): boolean {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
      const decoded: any = jwtDecode(token);

      if (!decoded.exp) return false;

      const now = Math.floor(Date.now() / 1000);
      return decoded.exp > now;
    }
    catch {
      return false; 
    }
  }

}
