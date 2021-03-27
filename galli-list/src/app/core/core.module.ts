import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

import * as coreComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
  ],
  declarations: [...coreComponents.components],
  exports: [ coreComponents.NavBarComponent],
})
export class CoreModule { }
