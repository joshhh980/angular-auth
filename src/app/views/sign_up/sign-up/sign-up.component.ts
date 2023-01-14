import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopUpService } from 'src/app/components/pop-up/pop-up.service';
import { User } from 'src/app/models/user';
import { SessionService } from 'src/app/services/session/session.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(public sessionService: SessionService, public router: Router, public popUpService: PopUpService) {}

  ngOnInit(): void {
  }

  formGroup = new FormGroup({
    name: new FormControl(""),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    c_password: new FormControl("", Validators.required),
  });

  isLoading = false;

  handleSubmit() {
    this.isLoading = true;
    let _formGroup = this.formGroup;
    this.sessionService
      .signUp({
        name: _formGroup.get("name")!.value!,
        email: _formGroup.get("email")!.value!,
        password: _formGroup.get("password")!.value!,
        c_password: _formGroup.get("c_password")!.value!,
      })
  }

  onSubmit() {
    if (this.formGroup.invalid) return;
    this.handleSubmit();
  }

}
