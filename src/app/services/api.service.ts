import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host = "http://localhost:3000";

  apiHost = `${this.host}/api`

  constructor(private http: HttpClient) {}

  login(values: { email: string, password: string }): Observable<any> {    
    return this.http
      .post<User>(`${this.apiHost}/login`, values, { observe: "response" })
  }

}
