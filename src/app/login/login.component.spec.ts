import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormControlPipePipe } from '../form-control-pipe.pipe';
import { AsyncButtonComponent } from '../shared/async-button/async-button.component';
import { PasswordfieldComponent } from '../shared/passwordfield/passwordfield.component';
import { TextfieldComponent } from '../shared/textfield/textfield.component';

import { LoginComponent } from './login.component';

const onChangeInput = (root: HTMLElement, name: string, value: string) => {
  const input = root.querySelector(`input[id=${name}]`) as HTMLInputElement;
  input.value = value;
  input.dispatchEvent(new Event("input"));
  input.dispatchEvent(new Event("blur"));
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let navSpy: jasmine.Spy;
  let router: Router;
  let root: HTMLElement;

  beforeEach(async () => {
    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['post', 'get']);

    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        FormControlPipePipe,
        TextfieldComponent,
        PasswordfieldComponent,
        AsyncButtonComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
      ],
      providers: [
        {
          provide: HttpClient,
          useValue: httpClientSpy
        },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    httpClientSpy.post.and.returnValue(of({
      ok: true,
      headers: {
        get() {
          return "Bearer token"
        }
      }, 
      data: {},
    }));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    navSpy = spyOn(router, "navigate");
    localStorage.clear();
    root = fixture.nativeElement as HTMLElement;
  })

  it('should submit login forms', () => {
    onChangeInput(root, "email", "example@mail.com");
    onChangeInput(root, "password", "12345678");
    fixture.detectChanges();
    const button = root.querySelector("button[id=login-button]") as HTMLElement;
    button.click();
    expect(localStorage.getItem("token")).toBe("token");
    expect(navSpy).toHaveBeenCalledWith(["/"]);
  });


  describe("invalid", () => {

    it("should show Email is required", () => {
      onChangeInput(root, "email", "");
      fixture.detectChanges();
      const errors = root.querySelector(".errors") as HTMLElement;
      expect(errors.textContent).toContain("Email is required");
      const button = root.querySelector("button[id=login-button]") as HTMLElement;
      expect(button.getAttribute('disabled')).toEqual('');
    })

    it("should show Password is required", () => {
      onChangeInput(root, "password", "");
      fixture.detectChanges();
      const errors = root.querySelector(".errors") as HTMLElement;
      expect(errors.textContent).toContain("Password is required");
      const button = root.querySelector("button[id=login-button]") as HTMLElement;
      expect(button.getAttribute('disabled')).toEqual('');
    })

  })

});
