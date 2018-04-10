import { Routes } from '@angular/router';
import {PageNotFoundComponent} from "./components/page-not-found";
import {StepperDemoComponent} from "./components/stepper-demo/stepper-demo.component";

export const ROUTES: Routes = [
  { path: '', redirectTo: 'demo', pathMatch: 'full' },
  { path: 'demo', component: StepperDemoComponent},
  { path: '**',    component: PageNotFoundComponent }

];
