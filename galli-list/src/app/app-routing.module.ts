import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTaskComponent, HomeComponent } from './features';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit/task/:id', component: CreateTaskComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
