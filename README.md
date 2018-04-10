# Angular5+ Stepper

Easy to use vertical stepper with configurable navigation items and dynamic views

## Installation
```
npm install --save angular5-stepper
```

## Usage

### app.module.ts
```typescript
  import { BrowserModule } from '@angular/platform-browser';
  import { NgModule } from '@angular/core';
  import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
  import {RouterModule} from "@angular/router";
  import {StepperModule} from 'angular5-stepper';
  
  import {ROUTES} from "./app.routing";
  
  import { AppComponent } from './app.component';
  
  @NgModule({
    declarations: [
      AppComponent,  
    ],
    imports: [
      BrowserModule,
      NgbModule.forRoot(),
      RouterModule.forRoot(ROUTES),
      StepperModule
    ],
    providers: [
    ],
    entryComponents: [
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }

```

### app.component.ts
```typescript
import {Component} from "@angular/core";
import {IStepNavbar} from "angular5-stepper";

/**
 * These are dynamic component for mapping views which needs to be mapped with menu item list
 * You can have your own components mapped here. I made these components for demo purposes.
 */
import {View11Component} from "../stepper-views/navlist1/view1-1/view1-1.component";
import {View12Component} from "../stepper-views/navlist1/view1-2/view1-2.component";
import {View21Component} from "../stepper-views/navlist2/view2-1/view2-1.component";
import {View22Component} from "../stepper-views/navlist2/view2-2/view2-2.component";
import {View23Component} from "../stepper-views/navlist2/view2-3/view2-3.component";

@Component({
    selector: 'app-cmp',
    template: `<stepper-container-cmp [navbarList]="myNavbarList"></stepper-container-cmp>`
})

export class AppComponent {
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
}
```


