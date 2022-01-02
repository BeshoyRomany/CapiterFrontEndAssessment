import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthModel } from '../modules/models/auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  //User Login
  login(body: AuthModel): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login/`, body).pipe(
      map((results) => {
        return results;
      }),
      catchError((errorReq) => {
        let errorMsg = errorReq.message;
        return throwError(errorMsg);
      })
    );
  }

  //Show request status Messages
  showMessage(
    message: string | undefined,
    status: string,
    action: string = 'Dismiss'
  ) {
    if (status == 'success') {
      this.snackBar.open(message!, action, {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['success'],
      });
    }
    if (status === 'error') {
      this.snackBar.open(message!, action, {
        duration: 4000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center',
        panelClass: ['warn'],
      });
    }
  }
}
