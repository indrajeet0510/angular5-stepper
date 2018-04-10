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

