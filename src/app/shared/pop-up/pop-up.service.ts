import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopUpService {

  private message = new BehaviorSubject("");
  currentMessage = this.message.asObservable();

  constructor() { }


  updateCurrentMessage(message: string){    
    this.message.next(message);
  }

}
