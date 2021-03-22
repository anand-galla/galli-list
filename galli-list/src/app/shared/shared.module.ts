import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';

import * as sharedComponents from './components';

@NgModule({
  declarations: [ ...sharedComponents.components ],
  imports: [
    CommonModule,
    OverlayModule,
  ],
  exports: [
     ...sharedComponents.components,
    OverlayModule,
  ],
})
export class SharedModule { }
