import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  login(): Observable<HttpResponse<User>> {
    return this.http
      .post<User>('/login', {}, { observe: "response" })
      //.pipe(0, catchError(this.handleError));
  }

}
