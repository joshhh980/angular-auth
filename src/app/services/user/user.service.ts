import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import host from 'src/app/host';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient, private authService: AuthService, private router: Router) { }


  deleteUser(): Observable<any>{
    let token = localStorage.getItem("token");
    return this.httpClient
      .delete(`${host}/user`, { 
        observe: "response",
        headers: {
          "Authorization": `Bearer ${token}`,
        } 
      })
      .pipe(map((res) => {
        if(res.ok){
          this.authService.updateCurrentUser(null);
          this.router.navigate(["/sign_up"]);
        }
      }))
  }

}
