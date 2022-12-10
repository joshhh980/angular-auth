import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public api: ApiService, public router: Router) {
  }

  ngOnInit(): void {
  }

  formGroup = new FormGroup({
    email: new FormControl(""),
    password: new FormControl(""),
  });

  isLoading = false;

  data = {}

  handleSubmit() {
    this.isLoading = true;
    this.api.login().subscribe((data) => {
      this.data = data
      if (data.ok) {
        const auth = data.headers.get("Authorization");
        if (!auth) return;
        const token = auth.replace("Bearer ", "");
        localStorage.setItem("token", token);
        this.router.navigate(["/"])
      }
    })
  }

  onSubmit(): boolean {
    this.handleSubmit()
    return false
  }


}
