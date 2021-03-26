import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as components from './components';

const routes: Routes = [
  { path: '', component: components.HomeComponent },
  { path: 'edit/task/:id', component: components.CreateTaskComponent },
  { path: 'login', component: components.LoginComponent },
  { path: 'signup', component: components.SingupComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
