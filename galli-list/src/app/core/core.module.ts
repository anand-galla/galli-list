import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

import * as coreComponents from './components';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatTooltipModule,
  ],
  declarations: [...coreComponents.components],
  exports: [ coreComponents.NavBarComponent],
})
export class CoreModule { }
