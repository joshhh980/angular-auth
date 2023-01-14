import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, Router, UrlTree } from '@angular/router';

import { AuthGuard } from './auth.guard';

import { RouterStateSnapshot } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import host from 'src/app/host';

function fakeRouterState(url: string): RouterStateSnapshot {
  return {
    url,
  } as RouterStateSnapshot;
}

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let router: Router;
  let navSpy: jasmine.Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
    });
    guard = TestBed.inject(AuthGuard);
    router = TestBed.inject(Router);
  });

  beforeEach(() => {
    localStorage.clear();
  })

  it('should redirect to login', () => {
    navSpy = spyOn(router, "navigate");
    const dummyRoute = {} as ActivatedRouteSnapshot;
    let canActivate = false 
    guard.canActivate(dummyRoute, fakeRouterState("/"))
      .subscribe((isAuthenticated: boolean | UrlTree) => canActivate = Boolean(isAuthenticated))
    expect(navSpy).toHaveBeenCalledWith(['/login']);
  });

  it('should be true', () => {
    localStorage.setItem("token", "token");
    const dummyRoute = {} as ActivatedRouteSnapshot;
    const httpTestingController = TestBed.get(HttpTestingController);

    let canActivate = false 
    guard.canActivate(dummyRoute, fakeRouterState("/"))
      .subscribe((isAuthenticated: boolean | UrlTree) => canActivate = Boolean(isAuthenticated))
    const req = httpTestingController.expectOne(`${host}/user`)
    req.flush(
      {
        name: "Something"
      },
    )
    expect(canActivate).toBeTrue();
  });


});
