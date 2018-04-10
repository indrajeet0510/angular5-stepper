import {Component, EventEmitter, Output} from "@angular/core";
@Component({
  selector: 'view2-2-cmp',
  templateUrl: './view2-2.component.html'
})
export class View22Component {
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
