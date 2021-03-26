import { Injectable, ModuleWithProviders } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collectionName = 'users';

  constructor(public fireService: AngularFirestore) { }

  createUser(uid: string, user: any) {
    user.uid = uid;
   
    this.fireService.collection(this.collectionName).doc(uid).set({ ...user });
  }
}
