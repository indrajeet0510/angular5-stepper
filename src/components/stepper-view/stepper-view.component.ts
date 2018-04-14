import {
  Component, Input, ViewContainerRef,
  ViewChild, AfterViewInit, EventEmitter, Output,
  ComponentRef
} from '@angular/core';
import {  Subscription, BehaviorSubject} from 'rxjs';
import { ComponentFactoryService} from '../../providers/component-factory.service';
import { IStepItem} from '../../models/step-item.model';
@Component({
  selector: 'stepper-view-cmp',
  templateUrl: './stepper-view.component.html'
})
export class StepperViewComponent implements AfterViewInit{
  @Input() public activeListItem: BehaviorSubject<IStepItem>;
  @Output() public navigate: EventEmitter<boolean>;
  public activeItem: IStepItem;
  public activeItemSubscription: Subscription;
  @ViewChild('stepperview', {
    read: ViewContainerRef
  }) public viewContainerRef: ViewContainerRef;
  private currentComponent: ComponentRef<any>;
  constructor(private componentSvc: ComponentFactoryService) {
    this.navigate = new EventEmitter();
  }

  public ngAfterViewInit() {
    this.activeItem = (this.activeListItem) ? this.activeListItem['value'] : null;
    this.handleItemChange(this.activeItem);
    this.activeItemSubscription = this.activeListItem
      .subscribe((item: any) => this.handleItemChange(item));
  }

  public ngOnDestroy() {
    this.activeItemSubscription.unsubscribe();
  }

  private handleItemChange(activeItem: IStepItem) {
      this.activeItem = activeItem;
      if(!this.activeItem.component) {
        this.viewContainerRef.remove();
        (this.currentComponent) ? this.currentComponent.destroy() : null;
      } else {
        this.viewContainerRef.remove();
        this.currentComponent = this.componentSvc
          .createComponent(this.viewContainerRef, this.activeItem.component);
        let backSub: Subscription;
        let nextSub: Subscription;
        if (this.currentComponent && this.currentComponent['instance']) {
          if (this.currentComponent.instance.back instanceof EventEmitter) {

            backSub = this.currentComponent
              .instance.back.subscribe(() => this.navigate.emit(false));
          }
          if (this.currentComponent.instance.next instanceof EventEmitter) {

            nextSub = this.currentComponent
              .instance.next.subscribe(() => this.navigate.emit(true));
          }
          this.currentComponent.changeDetectorRef.detectChanges();
          this.currentComponent.onDestroy(() => {
            if (backSub) {
              backSub.unsubscribe();
            }
            if (nextSub) {
              nextSub.unsubscribe();
            }
          });
        }
      }
  }
}
