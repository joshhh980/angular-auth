import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { UserService } from 'src/app/services/user/user.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let userService: UserService;
  let userServiceSpy: jasmine.Spy;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        ButtonComponent,
      ],
      imports: [HttpClientTestingModule], 
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    userService = TestBed.inject(UserService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it("should delete user", () => {
    let root = fixture.nativeElement as HTMLElement;
    userServiceSpy = spyOn(userService, "deleteUser");
    const button = root.querySelector("button[id=delete-user-button]") as HTMLElement;
    button.click();
    expect(userServiceSpy).toHaveBeenCalled();
  })

});
