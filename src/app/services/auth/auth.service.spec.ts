import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import host from 'src/app/host';
import { User } from 'src/app/models/user';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let httpTestingController: HttpTestingController;
  let req: TestRequest;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(AuthService);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('valid', () => {
    localStorage.setItem("token", "token")
    let isAuthenticated = false;
    service.isAuthenticated()
      .subscribe((_isAuthenticated) => {
        isAuthenticated = _isAuthenticated
      })

    req = httpTestingController.expectOne(`${host}/user`)
    req.flush({ name: "Example" });
    let currentUser: User;
    service.currentUser.subscribe((_currentUser) => {
      currentUser = _currentUser!
    })
    expect(currentUser!).not.toBeNull();
    expect(currentUser!.name).toBe("Example");
    expect(isAuthenticated).toBeTrue();
  });

  it('invalid', () => {
    localStorage.removeItem("token");
    let isAuthenticated = false;
    service.isAuthenticated()
      .subscribe((_isAuthenticated) => {
        isAuthenticated = _isAuthenticated
      })
    let currentUser: User;
    service.currentUser.subscribe((_currentUser) => {
      currentUser = _currentUser!
    })
    httpTestingController.expectNone(`${host}/user`)
    expect(isAuthenticated).toBeFalse();
    expect(currentUser!).toBeNull();
  });


});
