import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import host from '../host';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  login(values: { email: string, password: string }): Observable<any> {    
    return this.http
      .post<User>(`${host}/login`, values, { observe: "response" })
  }

}
