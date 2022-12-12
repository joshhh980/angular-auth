import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { PopUpService } from '../shared/pop-up/pop-up.service';
import { User } from '../shared/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public apiService: ApiService, public router: Router, public popUpService: PopUpService) {
  }

  ngOnInit(): void { }

  formGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
  });

  isLoading = false;

  handleSubmit() {
    this.isLoading = true;
    let _formGroup = this.formGroup;
    this.apiService
      .login({
        email: _formGroup.get("email")!.value!,
        password: _formGroup.get("password")!.value!,
      })
      .subscribe({
        next: (data: HttpResponse<User>) => {
          if (data.ok) {
            const auth = data.headers.get("Authorization")!;
            const token = auth.replace("Bearer ", "");
            localStorage.setItem("token", token);
            this.isLoading = false
            this.router.navigate(["/"])
          }
        },
        error: (e: HttpErrorResponse) => {
          if (e.status == 401) {
            this.popUpService.updateCurrentMessage(e.error.errors[0]);
          }else{
            this.popUpService.updateCurrentMessage("An unknown error occured");
          }
          this.isLoading = false
        },
      })
  }

  onSubmit() {
    if (this.formGroup.invalid) return;
    this.handleSubmit();
  }


}
