import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {RouterModule} from "@angular/router";

import {ROUTES} from "./app.routing";

import { AppComponent } from './app.component';

import {PageNotFoundComponent} from "./components/page-not-found/page-not-found.component";
import {NavbarComponent} from "./components/navbar/navbar.component";

import {StepperDemoComponent} from "./components/stepper-demo/stepper-demo.component";
import {StepperModule} from "angular5-stepper";
import {View11Component} from "./components/stepper-views/navlist1/view1-1/view1-1.component";
import {View12Component} from "./components/stepper-views/navlist1/view1-2/view1-2.component";
import {View21Component} from "./components/stepper-views/navlist2/view2-1/view2-1.component";
import {View22Component} from "./components/stepper-views/navlist2/view2-2/view2-2.component";
import {View23Component} from "./components/stepper-views/navlist2/view2-3/view2-3.component";

@NgModule({
  declarations: [
    AppComponent,

    PageNotFoundComponent,

    NavbarComponent,

    StepperDemoComponent,
    View11Component,
    View12Component,
    View21Component,
    View22Component,
    View23Component,

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
    View11Component,
    View12Component,
    View21Component,
    View22Component,
    View23Component
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
