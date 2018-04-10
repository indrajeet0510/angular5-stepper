import {ComponentFactoryResolver, Injectable, ViewContainerRef, ComponentRef} from "@angular/core";

@Injectable()
export class ComponentFactoryService {
  constructor(private factoryResolver: ComponentFactoryResolver) {

  }
  public createComponent(rootViewContainer: ViewContainerRef, dIComponent: any): ComponentRef<any>{
    const factory = this.factoryResolver
      .resolveComponentFactory(dIComponent);
    const component = factory
      .create(rootViewContainer.parentInjector);
    rootViewContainer.insert(component.hostView);
    return component;
  }

}
