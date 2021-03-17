import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import * as coreComponents from './components';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [...coreComponents.components],
  exports: [ coreComponents.NavBarComponent],
})
export class CoreModule { }
