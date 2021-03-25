import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';

import * as sharedServices from '../shared/services';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn: boolean;

  constructor(public firebaseAuth: AngularFireAuth, 
    private localStorageService: sharedServices.LocalStorageService,
    private router: Router,
  ) { }

  async signIn(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password).then(res => {
      this.isLoggedIn = true;
      this.localStorageService.set('user', res.user);
    });
  }

  async signUp(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(res => {
      this.isLoggedIn = true;
      this.localStorageService.set('user', res.user);
    });
  }

  logOut() {
    this.firebaseAuth.signOut();
    this.localStorageService.remove('user');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
