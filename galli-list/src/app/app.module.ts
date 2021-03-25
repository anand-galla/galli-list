import { components } from './features/index';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as featureComponents from './features';
import * as authenticatinComponents from './authentication';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';

export const firebaseConfig = {
  apiKey: "AIzaSyDPZhoVxLBx1GUTy0NIQieVGm2NtwolEFY",
  authDomain: "galli-list.firebaseapp.com",
  projectId: "galli-list",
  storageBucket: "galli-list.appspot.com",
  messagingSenderId: "158754402733",
  appId: "1:158754402733:web:b5515d146fa09b6df5b124",
  measurementId: "G-SWZE1FZZP9"
};

@NgModule({
  declarations: [
    AppComponent,
    ...featureComponents.components,
    ...authenticatinComponents.components,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AngularFireModule,
    AngularFireModule.initializeApp(firebaseConfig),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
