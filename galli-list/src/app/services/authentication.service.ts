import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import * as models from '../models';
import { UserService } from './user.service';
import { switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  user$: Observable<models.User>;
  userId: string;

  constructor(private firebaseAuth: AngularFireAuth,
    private fireService: AngularFirestore,
    private userService: UserService,
    private router: Router,
  ) {
    this.user$ = this.firebaseAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          this.userId = user.uid;
          return this.fireService.doc<models.User>(`users/${user.uid}`).valueChanges();
        } else {
          this.userId = null;
          return of(null);
        }
      })
    )
   }

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
