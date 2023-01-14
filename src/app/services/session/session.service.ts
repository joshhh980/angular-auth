import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import host from '../../host';
import { PopUpService } from 'src/app/components/pop-up/pop-up.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  isLoading = false;

  constructor(private http: HttpClient, private popUpService: PopUpService, private router: Router) { }

  onSessionSuccess(data: HttpResponse<User>) {
    if (data.ok) {
      const auth = data.headers.get("Authorization")!;
      const token = auth.replace("Bearer ", "");
      localStorage.setItem("token", token);
      this.onToggleLoading();
      this.router.navigate(["/"]);
    }
  }

  onToggleLoading(){
    this.isLoading = !this.isLoading;
  }

  popUpError(){
    this.popUpService.updateCurrentMessage("An unknown error occured");

  }

  login(values: { email: string, password: string }): Observable<any> {
    return this.http
      .post<User>(`${host}/login`, values, { observe: "response" })
  }

  signUp(values: { name: string, email: string, password: string, c_password: string }) {
    this.onToggleLoading();
    return this.http
      .post<User>(`${host}/sign_up`, values, { observe: "response" })
      .subscribe({
        next: this.onSessionSuccess,
        error: (e: HttpErrorResponse) => {
          if (e.status == 401) {
            this.popUpService.updateCurrentMessage(e.error.errors[0]);
          } else this.popUpError();
          this.onToggleLoading();
        },
      })
  }

}
