import { SingupComponent } from './authentication/singup/singup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTaskComponent, HomeComponent } from './features';
import { LoginComponent } from './authentication';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'edit/task/:id', component: CreateTaskComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SingupComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
