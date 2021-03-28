import { Component, OnDestroy, OnInit } from '@angular/core';

import * as models from '../../models';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  animations: [models.toastAnimations.fadeToast],
})
export class ToastComponent implements OnInit, OnDestroy {
  animationState: models.ToastAnimationState;

  private intervalId: any;
  iconType: string;
  toastData: models.ToastData;

  constructor(
    public readonly data: models.ToastData,
    public readonly ref: models.ToastRef,
  ) {
    this.toastData = new models.ToastData(data);
    this.animationState = this.toastData.restrictAutoClose ? 'none' : 'default';
  }

  ngOnInit(): void {
    // setting default time to show toast is 10 seconds.
    this.intervalId = setTimeout(() => this.animationState = 'closing', this.toastData.duration || 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.intervalId);
  }

  close() {
    this.ref.close();
  }

  onFadeFinished(event: any) {
    const toState = event?.toState;
    const isFadeOut = (toState as models.ToastAnimationState) === 'closing';
    const isFinished = this.animationState === 'closing';

    if (isFinished && isFadeOut && !this.toastData.restrictAutoClose) {
      this.close();
    }
  }

}
