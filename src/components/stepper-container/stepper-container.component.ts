import { Component, Input} from '@angular/core';
import { BehaviorSubject} from 'rxjs/Rx';
import { IStepNavbar} from '../../models/step-navbar.model';
@Component({
  selector: 'stepper-container-cmp',
  templateUrl: './stepper-container.component.html',
  styleUrls: [
    './stepper-container.component.scss'
  ]
})
export class StepperContainerComponent {
  @Input() public navbarList: IStepNavbar[];
  @Input() public statusLabelList?: any[] = [
    { title: 'Not started', backgroundColor: ''},
    {title: 'In Progress', backgroundColor: ''},
    {title: 'Completed', backgroundColor: ''},
    {title: 'Draft', backgroundColor: ''}];
  public activeListItem: BehaviorSubject<any>;
  public activeItemId: string;
  public constructor() {
    this.activeListItem = new BehaviorSubject(null);
  }

  public ngOnInit() {
    const firstItem = (this.navbarList[0] && this.navbarList[0].itemList) ? this.navbarList[0].itemList[0] : null;
    if (firstItem) {
      this.activeItemId = 'id-0-0';
    }
    this.activeListItem.next(firstItem);

  }

  public selectItem(item: any) {
    if (this.activeListItem.value != item) {
      this.activeListItem.next(item);
      let keyA: number = 0;
      for(let nb of this.navbarList) {
        if (nb && nb.itemList) {
          let keyB: number = 0;
          for (let nbIt of nb.itemList) {
            if(item === nbIt) {
              this.activeItemId = `id-${keyA}-${keyB}`;
              this.navbarList[keyA].itemList[keyB].status = 1;
            } else {
              this.navbarList[keyA].itemList[keyB].status = 0;
            }
            keyB++;
          }
        }
        keyA++;
      }
    }
  }

  public handleNavigation(direction: boolean = false) {
    let tempId: string = this.activeItemId.split('id-')[1];
    let [ navListIndex1, itemListIndex1 ] = (tempId && tempId.length) ? tempId.split('-') : [null, null];
    if (navListIndex1 === null || itemListIndex1 === null) {
      return;
    }
    let navListIndex: number = parseInt(navListIndex1, 10);
    let itemListIndex: number = parseInt(itemListIndex1, 10);
    if (direction) {
      // Check if current itemListIndex is less than the max itemListIndex
      if(itemListIndex < this.navbarList[navListIndex].itemList.length - 1) {
        const itemToBeSelected = this.navbarList[navListIndex].itemList[itemListIndex+1];
        if (itemToBeSelected.disabled || (!itemToBeSelected.component)) {
          return;
        }
        this.selectItem(itemToBeSelected);
      } else {
        // If currentItemListIndex is not less than the max itemListIndex check for another navList and it's max index
        if ((navListIndex + 1) <= this.navbarList.length - 1) {
          if(0 < this.navbarList[navListIndex + 1].itemList.length - 1) {
            const itemToBeSelected = this.navbarList[navListIndex + 1].itemList[0];
            if (itemToBeSelected.disabled || (!itemToBeSelected.component)) {
              return;
            }
            this.selectItem(itemToBeSelected);
          }
        }
      }
    } else {
      // Check if current itemListIndex is more than the min itemListIndex i.e. 0
      if(itemListIndex > 0) {
        const itemToBeSelected = this.navbarList[navListIndex].itemList[itemListIndex-1];
        if (itemToBeSelected.disabled || (!itemToBeSelected.component)) {
          return;
        }
        this.selectItem(itemToBeSelected);
      } else {
        // If currentItemListIndex is less than the zero check
        // for previous navList and it's min index is greater than or equal to zero select the max item from that list
        if ((navListIndex - 1) >= 0) {
          if(this.navbarList[navListIndex - 1].itemList.length - 1 >= 0) {
            const itemToBeSelected = this.navbarList[navListIndex - 1]
              .itemList[this.navbarList[navListIndex - 1].itemList.length - 1];
            if (itemToBeSelected.disabled || (!itemToBeSelected.component)) {
              return;
            }
            this.selectItem(itemToBeSelected);
          }
        }
      }
    }
  }
}
