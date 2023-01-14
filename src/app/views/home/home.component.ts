import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  currentUser?: User

  constructor(private authService: AuthService, private userService: UserService) {
    authService.currentUser.subscribe(user => {
      this.currentUser = user!
    })
  }

  onDeleteUser(){    
    this.userService.deleteUser()
      .subscribe()
  }

  ngOnInit(): void {
  }

}
