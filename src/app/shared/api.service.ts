import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  host = "http://localhost:3000";

  apiHost = `${this.host}/api`

  constructor(private http: HttpClient) {}

  login(): Observable<any> {    
    return this.http
      .post<User>(`${this.apiHost}/login`, {}, { observe: "response" })
  }

}
