import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {
  componentType: string;

  constructor(private readonly overlay: OverlayRef, 
      private type?: string,
  ) {
      this.componentType = type;
  }

  close() {
      this.overlay.dispose();
  }

  isVisible() {
      return this.overlay && this.overlay.overlayElement;
  }

  getPosition() {
      return this.overlay.overlayElement.getBoundingClientRect();
  }

  updatePosition(positionStrategy: any) {
      this.overlay.updatePositionStrategy(positionStrategy);
  }
}