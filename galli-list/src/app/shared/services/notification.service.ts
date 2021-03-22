import { Injectable, Injector } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';

import { ToastData, ToastRef } from '../models';
import { ToastComponent } from '../components';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private toastsList: ToastRef[] = [];

  constructor(
    private _overlayService: Overlay,
    private parentInjector: Injector,
  ){ }

  show(data: any) {
    const positionStrategy = this.getPositionStrategy();

    // It create a container in our application that will host our toast message.
    const overlayRef = this._overlayService.create({ positionStrategy: positionStrategy, disposeOnNavigation: true }); 

    data = new ToastData(data);
    const toastRef = new ToastRef(overlayRef);

    // Creating an Custom injector to pass data into component.
    const injector = this.getInjector(data, toastRef, this.parentInjector);

    const toastPortal = new ComponentPortal(ToastComponent, null, injector); // It create an instance of our component.
    overlayRef.attach(toastPortal); // Attaching component to overlay container.
  
    // this.toastsList.push(toastRef);

    return toastRef;
  }

  getInjector(data: ToastData, toastRef: ToastRef, parentInjector: Injector) {
    const tokens = new WeakMap();

    tokens.set(ToastData, data);
    tokens.set(ToastRef, toastRef);

    return new PortalInjector(parentInjector, tokens);
  }

  /**
   * This method configures the position of the toast where we want to show.
   */
  getPositionStrategy(value?: string) {
    return this._overlayService
              .position()
              .global()
              .top(value)
              .right('20px');
  }

  /**
   * In order to stack the toast messages below each other
   * this method returns position of last toast.
   */
  // getPosition() {
  //   const lastActiveToast = this.toastsList?.filter(toast => toast.isVisible())?.pop(); // Finding last active toast.
  //   const position = lastActiveToast ? lastActiveToast?.getPosition().bottom : 20;

  //   return position + 'px';
  // }
}
