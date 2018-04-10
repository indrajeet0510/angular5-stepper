import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import { StepperContainerComponent } from './components/stepper-container/stepper-container.component';
import { StepperNavbarComponent } from './components/stepper-navbar/stepper-navbar.component';
import { StepperViewComponent } from './components/stepper-view/stepper-view.component';
import {ComponentFactoryService} from "./providers/component-factory.service";
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    StepperContainerComponent,
    StepperNavbarComponent,
    StepperViewComponent
  ],
  providers: [
    ComponentFactoryService
  ],
  exports: [
    StepperContainerComponent,
    StepperNavbarComponent,
    StepperViewComponent
  ]
})
export class StepperModule {

}
