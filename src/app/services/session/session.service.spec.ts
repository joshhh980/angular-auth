import { HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import host from 'src/app/host';
import { User } from 'src/app/models/user';

import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;
  let httpTestingController: HttpTestingController;
  let req: TestRequest;
  let onSessionSuccessSpy: jasmine.Spy;
  let router: Router;
  let navSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ]
    });
    service = TestBed.inject(SessionService);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  describe("#signUp", () => {

    it('should call onSessionSuccess', () => {
      onSessionSuccessSpy = spyOn(service, "onSessionSuccess");
      service.signUp({
        name: "",
        email: "example@mail.com",
        password: "12345678",
        c_password: "12345678",
      })
  
      req = httpTestingController.expectOne(`${host}/sign_up`)
      req.flush({ name: "Example" });
      expect(onSessionSuccessSpy).toHaveBeenCalled();
    });

  })

  describe("#onSessionSuccess", () => {

    it('should set token and redirect', () => {
      navSpy = spyOn(router, "navigate");
      let headers = new HttpHeaders({
        "Authorization": "Bearer token",
      });
      let res = new HttpResponse<User>({
        headers,
      })
      service.onSessionSuccess(res);
      let token = localStorage.getItem("token");
      expect(token).toBe("token");
      expect(navSpy).toHaveBeenCalled();
    });

  })
 


});
