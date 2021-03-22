import { OverlayRef } from '@angular/cdk/overlay';

export class ToastRef {
    constructor(readonly overlay: OverlayRef) { }
  
    close() {
      this.overlay.dispose();
    }
}

// export class ToastRef {

//     constructor(private overlay: OverlayRef) { }

    

//     close() {
//         this.overlay.dispose();
//     }

//     isVisible() {
//         return this.overlay && this.overlay.overlayElement;
//     }

//     getPosition() {
//         return this.overlay.overlayElement.getBoundingClientRect();
//     }

//     updatePosition(positionStrategy: any) {
//         this.overlay.updatePositionStrategy(positionStrategy);
//     }
// }