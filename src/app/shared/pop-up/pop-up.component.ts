import { Component, OnInit } from '@angular/core';
import { PopUpService } from './pop-up.service';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.scss']
})
export class PopUpComponent implements OnInit {

  message = "";

  constructor(public popUpService: PopUpService,) { }


  ngOnInit(): void {
    this.popUpService.currentMessage.subscribe(msg => this.message = msg);
  }

}
