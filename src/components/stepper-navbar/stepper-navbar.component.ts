import {Component, Input, EventEmitter, Output} from "@angular/core";
import {Observable, Subscription} from "rxjs";
import {IStepNavbar} from "../../models/step-navbar.model";
@Component({
  selector: 'stepper-navbar-cmp',
  templateUrl: './stepper-navbar.component.html',
  styleUrls: [
    './stepper-navbar.component.scss'
  ]
})
export class StepperNavbarComponent {
  @Input() public navbarList: IStepNavbar[];
  @Input() activeListItem: Observable<any>;
  @Output() onItemClick: EventEmitter<any>;
  @Input() public activeItemId: String;
  @Input('statusLabelList') STATUS_LABELS: any[];
  constructor() {
    this.onItemClick = new EventEmitter();

  }

  selectItem(i: number,j: number) {
    if(this.navbarList[i] && this.navbarList[i].itemList && this.navbarList[i].itemList[j]) {
      if (this.navbarList[i].itemList[j].disabled || (!this.navbarList[i].itemList[j].component)) {
        return;
      }
      this.onItemClick.emit(this.navbarList[i].itemList[j]);
    } else {
      this.onItemClick.emit(null);
    }
  }
}
