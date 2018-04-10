import {Component, EventEmitter, Output} from "@angular/core";
@Component({
  selector: 'view2-3-cmp',
  templateUrl: './view2-3.component.html'
})
export class View23Component {
  @Output() back: EventEmitter<any>;
  @Output() next: EventEmitter<any>

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
