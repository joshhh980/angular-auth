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
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let spy: jasmine.Spy;
  let router: Router;

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
      headers: {
        get(){
          return "Bearer some"
        }
      }, data: {}
    }));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should submit login forms', () => {
    const navSpy = spyOn(router, "navigate");
    localStorage.clear();
    const root = fixture.nativeElement as HTMLElement;
    onChangeInput(root, "email", "example@mail.com");
    onChangeInput(root, "password", "12345678");
    const button = root.querySelector("button[id=button]") as HTMLElement;
    button.click();    
    expect(localStorage.getItem("token")).toBe("some");
    expect(navSpy).toHaveBeenCalledWith(["/"]);
  });
});