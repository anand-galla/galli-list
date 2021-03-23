import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import * as coreComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [...coreComponents.components],
  exports: [ coreComponents.NavBarComponent],
})
export class CoreModule { }
