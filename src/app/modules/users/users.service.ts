import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Observable } from 'rxjs';
import { Users } from './models/users.model';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {
    console.log(environment.apiUrl);
  }

  getAllUsers(): Observable<Users> {
    return this.http.get<Users>(
      `${environment.apiUrl}/users/`
      )
      .pipe(catchError(errorReq => {
        let errorMsg = errorReq.message;
        return throwError(errorMsg);
      }));
  }
}
