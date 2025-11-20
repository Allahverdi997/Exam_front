import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Error } from '../models/error';
import Swal from 'sweetalert2';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    debugger;
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {

        var errors=(error as any).error.errors;

        debugger;

        for (let index = 0; index < errors.length; index++) {
            const element = errors[index];

            this.showError(element);
            
        }

        return throwError(() => error);
      })
    );
  }

  showError(error:Error){
    Swal.fire({
          icon: 'error',
          title: 'Error!',
          text: error.exceptionMessage,
          confirmButtonText: 'OK'
        });
  }
}
