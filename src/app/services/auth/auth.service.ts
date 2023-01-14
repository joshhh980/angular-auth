import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import host from '../../host';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient) { }

  private user = new BehaviorSubject<User | null>(null);

  currentUser = this.user.asObservable()

  updateCurrentUser(value: User) {
    this.user.next(value)
  }

  isAuthenticated(): Observable<boolean> {
    const token = localStorage.getItem("token");

    if (token)

      return this.validateToken(token)
        .pipe(map((user: User) => {          
          return Boolean(user)
        }))

    return new Observable((sub) => sub.next(false))

  }

  validateToken(token: string): Observable<User> {

    return this.http
      .get<User>(`${host}/user`, {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      }).pipe(map((user: User) => {
        this.updateCurrentUser(user)
        return user
      }))
  }

}
