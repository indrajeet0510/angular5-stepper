import {Component, Output, EventEmitter} from "@angular/core";
@Component({
  selector: 'view1-2-cmp',
  templateUrl: './view1-2.component.html'
})
export class View12Component {
  @Output() public back: EventEmitter<any>;
  @Output() public next: EventEmitter<any>

  constructor() {
    this.back = new EventEmitter();
    this.next = new EventEmitter();
  }

  goToNext() {
    this.next.emit();
  }

  goToPrev() {
    this.back.emit();
  }
}
