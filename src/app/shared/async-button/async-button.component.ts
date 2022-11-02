import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-async-button',
  templateUrl: './async-button.component.html',
  styleUrls: ['./async-button.component.scss']
})
export class AsyncButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() isLoading = false;
  @Input() labelText = "";
  @Input() type = "";
  @Input() id = "";
}
