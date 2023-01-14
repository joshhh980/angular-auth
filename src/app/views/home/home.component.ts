import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser?: User

  constructor(private authService: AuthService) {
    authService.currentUser.subscribe(user => {
      this.currentUser = user!
    })
  }

  ngOnInit(): void {
  }

}
