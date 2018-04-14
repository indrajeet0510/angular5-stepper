import {Component} from "@angular/core";
import {IStepNavbar} from "angular5-stepper";
import {View11Component} from "../stepper-views/navlist1/view1-1/view1-1.component";
import {View12Component} from "../stepper-views/navlist1/view1-2/view1-2.component";
import {View21Component} from "../stepper-views/navlist2/view2-1/view2-1.component";
import {View22Component} from "../stepper-views/navlist2/view2-2/view2-2.component";
import {View23Component} from "../stepper-views/navlist2/view2-3/view2-3.component";

@Component({
  selector: 'admin-panel-cmp',
  template: `<stepper-container-cmp  [navbarList]="myNavbarList" (onNavigation)="handleNavigationChange($event)"></stepper-container-cmp>`
})

export class StepperDemoComponent {
  public myNavbarList: IStepNavbar[];
  constructor() {
    this.myNavbarList = <IStepNavbar[]> [
      {
        heading: 'NavList1',
        itemList: [
          {
            title: 'View 1.1',
            component: View11Component,
            status: 1
          },
          {
            title: 'View 1.2',
            component: View12Component,
            status: 0
          }
        ]
      },
      {
        heading: 'NavList2',
        itemList: [
          {
            title: 'View 2.1',
            component: View21Component,
            status: 0
          },
          {
            title: 'View 2.2',
            component: View22Component,
            status: 0
          },
          {
            title: 'View 2.3 (Disabled)',
            component: View23Component,
            status: 0,
            disabled: true
          },
          {
            title: 'View 2.4 (Disabled)',
            component: null,
            status: 0
          }
        ]
      }
    ];
  }

  public handleNavigationChange(navData) {
    /**
     * It will be showing the current and previous itemIndexes relative to myNavbarList
     * Output will be in format : {current: { navIndex: 0, itemIndex: 0}, prev: {navIndex:0, itemIndex: 1}
     */
    console.log('navData', navData);

  }
}
