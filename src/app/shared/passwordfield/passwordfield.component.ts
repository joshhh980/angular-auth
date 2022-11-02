import { Component, OnInit } from '@angular/core';
import { TextfieldComponent } from '../textfield/textfield.component';

@Component({
  selector: 'app-passwordfield',
  templateUrl: './passwordfield.component.html',
  styleUrls: ['./passwordfield.component.scss']
})
export class PasswordfieldComponent extends TextfieldComponent {

  constructor() { 
    super()
  }

  override ngOnInit(): void {
  }



}
