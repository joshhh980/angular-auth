import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { TextfieldComponent } from './textfield.component';

describe('TextfieldComponent', () => {
  let component: TextfieldComponent;
  let fixture: ComponentFixture<TextfieldComponent>;
  let formControl: FormControl;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextfieldComponent],
      imports: [
        ReactiveFormsModule,
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TextfieldComponent);
    component = fixture.componentInstance;
    formControl = new FormControl("old");
    component.control = formControl;
    component.label = "Label"

    fixture.detectChanges();
  });

  it('should change formControl value', async () => {
    fixture.whenStable().then(() => {
      const input = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(input.value).toBe("old");
      input.value = "new";
      input.dispatchEvent(new Event("input"));
      expect(formControl.value).toBe("new");
    })
  });

  it('should render label', () => {
    const el = fixture.nativeElement
    const label: HTMLLabelElement = el.querySelector("label");
    expect(label.textContent).toContain("Label");
  });

  it('should set id', () => {
    component.id = "input-id"
    fixture.detectChanges();
    const el = fixture.nativeElement
    const label = el.querySelector("#input-id");
    expect(label).not.toBe(null);
  });

  it('should set input type', () => {
    component.type = "password"
    fixture.detectChanges();
    const el = fixture.nativeElement
    const input = el.querySelector("input[type=password]");
    expect(input).not.toBe(null);
  });

});
