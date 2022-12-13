import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FormControlPipePipe } from '../../pipes/form-control-pipe.pipe';
import { ButtonComponent } from '../../components/button/button.component';
import { PasswordfieldComponent } from '../../components/passwordfield/passwordfield.component';
import { TextfieldComponent } from '../../components/textfield/textfield.component';
import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';

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
  let httpTestingController: HttpTestingController;
  let req: TestRequest;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        LoginComponent,
        FormControlPipePipe,
        TextfieldComponent,
        PasswordfieldComponent,
        ButtonComponent,
      ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: []
    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    router = TestBed.inject(Router);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    navSpy = spyOn(router, "navigate");
    localStorage.clear();
    root = fixture.nativeElement as HTMLElement;
  })

  describe("valid", () => {


    beforeEach(() => {
      component.popUpService.updateCurrentMessage = jasmine.createSpy();
      onChangeInput(root, "email", "example@mail.com");
      onChangeInput(root, "password", "12345678");
      fixture.detectChanges();
      const button = root.querySelector("button[id=login-button]") as HTMLElement;
      button.click();
      req = httpTestingController.expectOne(`${component.apiService.apiHost}/login`)
      expect(req.request.body).toEqual({
        email: "example@mail.com",
        password: "12345678",
      })
    })

    afterEach(() => {
      httpTestingController.verify();
    })

    it('should submit login forms', () => {
      req.flush(
        {
        },
        {
          headers: {
            "Authorization": "Bearer token",
          }
        }
      )
      expect(localStorage.getItem("token")).toBe("token");
      expect(navSpy).toHaveBeenCalledWith(["/"]);
    });

    it("should update pop-up message when status == 401", () => {
      req.flush(
        {
          errors: [
            "Invalid Email or Password"
          ]
        },
        {
          status: 401,
          statusText: "401",
        }
      )
      fixture.detectChanges();
      expect(localStorage.getItem("token")).not.toBe("token");
      expect(navSpy).not.toHaveBeenCalledWith(["/"]);
      expect(component.popUpService.updateCurrentMessage).toHaveBeenCalledOnceWith("Invalid Email or Password");
    })

    it("should update pop-up message when status == 500", () => {
      req.flush(
        {
        },
        {
          status: 500,
          statusText: "500",
        }
      )
      fixture.detectChanges();
      expect(localStorage.getItem("token")).not.toBe("token");
      expect(navSpy).not.toHaveBeenCalledWith(["/"]);
      expect(component.popUpService.updateCurrentMessage).toHaveBeenCalledOnceWith("An unknown error occured");
    });
  })


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
