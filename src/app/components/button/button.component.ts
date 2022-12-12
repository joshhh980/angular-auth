import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() isLoading = false;
  @Input() labelText = "";
  @Input() type = "";
  @Input() id = "";
  @Input() disabled = false;
}
