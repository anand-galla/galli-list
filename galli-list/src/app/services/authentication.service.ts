import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as models from '../models';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private firebaseAuth: AngularFireAuth,
    private userService: UserService,
    private router: Router,
  ) { }

  signIn(email: string, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.signInWithEmailAndPassword(email, password).then(
        (res) => resolve(res),
        (error) => reject(error)
      );
    });
  }

  singUp(user: models.User, password: string) {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.createUserWithEmailAndPassword(user.email, password).then(
        (res) => {

          Object.assign(user, {
            'dateCreated': new Date(),            
          });

          this.userService.createUser(res.user.uid, user);
          resolve(res);

        }, (error) => reject(error)
      );
    });
  }

  signOut() {
    return new Promise<any>((resolve, reject) => {
      this.firebaseAuth.signOut().then((res) => resolve(res)).catch((error) => reject(error));
    });    
  }
}
