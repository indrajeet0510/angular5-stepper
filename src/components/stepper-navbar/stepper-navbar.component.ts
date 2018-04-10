import {  Component, Input, EventEmitter, Output } from '@angular/core';
import {  Observable } from 'rxjs';
import { IStepNavbar} from '../../models/step-navbar.model';
@Component({
  selector: 'stepper-navbar-cmp',
  templateUrl: './stepper-navbar.component.html',
  styleUrls: [
    './stepper-navbar.component.scss'
  ]
})
export class StepperNavbarComponent {
  @Input() public navbarList: IStepNavbar[];
  @Input() public activeListItem: Observable<any>;
  @Output() public onItemClick: EventEmitter<any>;
  @Input() public activeItemId: string;
  @Input('statusLabelList') public STATUS_LABELS: any[];
  public constructor() {
    this.onItemClick = new EventEmitter();

  }

  public selectItem(i: number,j: number) {
    if(this.navbarList[i] && this.navbarList[i].itemList && this.navbarList[i].itemList[j]) {
      if (this.navbarList[i].itemList[j].disabled
        || (!this.navbarList[i].itemList[j].component)) {
        return;
      }
      this.onItemClick.emit(this.navbarList[i].itemList[j]);
    } else {
      this.onItemClick.emit(null);
    }
  }
}
