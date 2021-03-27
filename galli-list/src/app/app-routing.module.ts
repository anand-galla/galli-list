import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import * as components from './components';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: 'tasks', component: components.HomeComponent, canActivate: [AuthGuard] },
  { path: 'tasks/edit/:taskId', component: components.CreateTaskComponent, canActivate: [AuthGuard] },
  { path: 'lists/:taskListId', component: components.HomeComponent, canActivate: [AuthGuard] },
  { path: 'new-list', component: components.CreateTaskListComponent, canActivate: [AuthGuard] },
  { path: 'login', component: components.LoginComponent },
  { path: 'signup', component: components.SingupComponent },
  { path: '**', redirectTo: 'tasks' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
