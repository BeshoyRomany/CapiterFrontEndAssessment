import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Users } from './models/users.model';
import { SingleUser } from './models/single-user.model';
//Material Imports
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  page!: string;
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  //Get All Users
  getAllUsers(): Observable<Users> {
    return this.http.get<Users>(`${environment.apiUrl}/users/`).pipe(
      map((results) => {
        return results;
      }),
      catchError((errorReq) => {
        let errorMsg = errorReq.message;
        return throwError(errorMsg);
      })
    );
  }

  //Get Single User
  getUser(userId: number): Observable<SingleUser> {
    return this.http.get<any>(`${environment.apiUrl}/users/${userId}`).pipe(
      map((results) => {
        delete results.support;
        return results.data;
      }),
      catchError((errorReq) => {
        let errorMsg = errorReq.message;
        return throwError(errorMsg);
      })
    );
  }

  //Update User
  updateUser(body: SingleUser, id?: number): Observable<SingleUser> {
    return this.http
      .put<SingleUser>(`${environment.apiUrl}/users/${id}`, body)
      .pipe(
        map((results) => {
          return results;
        }),
        catchError((errorReq) => {
          let errorMsg = errorReq.message;
          return throwError(errorMsg);
        })
      );
  }

  //Create User
  createUser(body: SingleUser): Observable<SingleUser> {
    return this.http
      .post<SingleUser>(`${environment.apiUrl}/users/`, body)
      .pipe(
        map((results) => {
          return results;
        }),
        catchError((errorReq) => {
          let errorMsg = errorReq.message;
          return throwError(errorMsg);
        })
      );
  }

  //Delete User
  deleteUser(id?: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/users/${id}`).pipe(
      map((result) => {
        return result = true;
      }),
      catchError((errorReq) => {
        let errorMsg = errorReq.message;
        return throwError(errorMsg);
      })
    );
  }

  //Show request status Messages
  showMessage(message: string | undefined, status: string, action: string = 'Dismiss') {
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
