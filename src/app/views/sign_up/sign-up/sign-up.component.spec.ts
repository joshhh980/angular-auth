import { HttpClientTestingModule, HttpTestingController, TestRequest } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { PasswordfieldComponent } from 'src/app/components/passwordfield/passwordfield.component';
import { TextfieldComponent } from 'src/app/components/textfield/textfield.component';
import { FormControlPipe } from 'src/app/pipes/form-control.pipe';
import { SessionService } from 'src/app/services/session/session.service';
import { onChangeInput } from 'src/app/test_helper';

import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let fixture: ComponentFixture<SignUpComponent>;
  let signUpSpy: jasmine.Spy;
  let sessionService: SessionService;
  let root: HTMLElement;
  let httpTestingController: HttpTestingController;
  let req: TestRequest;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        SignUpComponent,
        FormControlPipe,
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

    fixture = TestBed.createComponent(SignUpComponent);
    sessionService = TestBed.inject(SessionService);
    httpTestingController = TestBed.get(HttpTestingController);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    signUpSpy = spyOn(sessionService, "signUp");
    localStorage.clear();
    root = fixture.nativeElement as HTMLElement;
  })


  it('should submit sign up form', () => {
    onChangeInput(root, "name", "Example");
    onChangeInput(root, "email", "example@mail.com");
    onChangeInput(root, "password", "12345678");
    onChangeInput(root, "c_password", "12345678");
    fixture.detectChanges();
    const button = root.querySelector("button[id=sign-up-button]") as HTMLElement;
    button.click();
    expect(signUpSpy).toHaveBeenCalled();
  });



  describe("invalid", () => {

    it("should show Email is required", () => {
      onChangeInput(root, "email", "");
      fixture.detectChanges();
      const errors = root.querySelector(".errors") as HTMLElement;
      expect(errors.textContent).toContain("Email is required");
      const button = root.querySelector("button[id=sign-up-button]") as HTMLElement;
      expect(button.getAttribute('disabled')).toEqual('');
    })

    it("should show Password is required", () => {
      onChangeInput(root, "password", "");
      fixture.detectChanges();
      const errors = root.querySelector(".errors") as HTMLElement;
      expect(errors.textContent).toContain("Password is required");
      const button = root.querySelector("button[id=sign-up-button]") as HTMLElement;
      expect(button.getAttribute('disabled')).toEqual('');
    })

    it("should show Confirm Password is required", () => {
      onChangeInput(root, "c_password", "");
      fixture.detectChanges();
      const errors = root.querySelector(".errors") as HTMLElement;
      expect(errors.textContent).toContain("Confirm Password is required");
      const button = root.querySelector("button[id=sign-up-button]") as HTMLElement;
      expect(button.getAttribute('disabled')).toEqual('');
    })

  })
});
