import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import host from 'src/app/host';
import { User } from 'src/app/models/user';
import { AuthService } from '../auth/auth.service';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let req: TestRequest;
  let router: Router;
  let navSpy: jasmine.Spy;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(UserService);
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
    router = TestBed.inject(Router);

  });

  it('deletes user', () => {
    navSpy = spyOn(router, "navigate");
    authService.updateCurrentUser({
      name: "Example",
      email: "example@mail.com"
    })
    localStorage.setItem("token", "token")
    let isAuthenticated = false;
    service.deleteUser()
      .subscribe((_isAuthenticated) => {
        isAuthenticated = _isAuthenticated
      })

    req = httpTestingController.expectOne(`${host}/user`)
    req.flush(null, {});
    let currentUser: User;
    authService.currentUser.subscribe((_currentUser) => {
      currentUser = _currentUser!
    })
    expect(currentUser!).toBeNull();
    expect(navSpy).toHaveBeenCalledWith(['/sign_up']);

  });

});
