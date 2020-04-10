import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  @Output() eventKeyUser = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  eventAction(evt: 0|1|2|3|4|5|6|7|8|9|'clear'){
    this.eventKeyUser.emit(evt)
  }

}
