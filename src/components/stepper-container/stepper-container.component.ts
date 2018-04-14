import { Component, Input, Output, EventEmitter} from '@angular/core';
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
  @Output() onNavigation: EventEmitter<any>;
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
    this.onNavigation.emit({current: { navIndex: 0, itemIndex: 0}, prev: null});
  }

  selectItem(item, navIndex, itemIndex) {
    if (this.activeListItem.value != item) {
      let itemIndexes = this.getActiveItemIndexes();
      if (!itemIndexes) {
        return;
      }
      let [ navListIndex, itemListIndex ] = itemIndexes;
      this.activeListItem.next(item);
      this.onNavigation.emit({current: { navIndex, itemIndex}, prev: {navIndex: navListIndex, itemIndex: itemListIndex}});
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
    let itemIndexes = this.getActiveItemIndexes();
    if (!itemIndexes) {
      return;
    }
    let [ navListIndex, itemListIndex ] = itemIndexes;
    if (direction) {
      // Check if current itemListIndex is less than the max itemListIndex
      if(itemListIndex < this.navbarList[navListIndex].itemList.length - 1) {
        const itemToBeSelected = this.navbarList[navListIndex].itemList[itemListIndex+1];
        if (itemToBeSelected.disabled || (!itemToBeSelected.component)) {
          return;
        }
        this.selectItem(itemToBeSelected, navListIndex, itemListIndex + 1);
      } else {
        // If currentItemListIndex is not less than the max itemListIndex check for another navList and it's max index
        if ((navListIndex + 1) <= this.navbarList.length - 1) {
          if(0 < this.navbarList[navListIndex + 1].itemList.length - 1) {
            const itemToBeSelected = this.navbarList[navListIndex + 1].itemList[0];
            if (itemToBeSelected.disabled || (!itemToBeSelected.component)) {
              return;
            }
            this.selectItem(itemToBeSelected, navListIndex + 1, 0);
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
        this.selectItem(itemToBeSelected,navListIndex, itemListIndex - 1);
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
            this.selectItem(itemToBeSelected, navListIndex - 1, this.navbarList[navListIndex - 1].itemList.length - 1);
          }
        }
      }
    }
  }

  private getActiveItemIndexes() {
    let tempId = this.activeItemId.split('id-')[1];
    let [ navListIndex1, itemListIndex1 ] = (tempId && tempId.length) ? tempId.split('-') : [null, null];
    if (navListIndex1 == null || itemListIndex1 == null) {
      return;
    }
    let navListIndex = parseInt(navListIndex1);
    let itemListIndex = parseInt(itemListIndex1);
    if (isNaN(navListIndex) || isNaN(itemListIndex)){
      return;
    }

    return [navListIndex, itemListIndex];
  }
}
