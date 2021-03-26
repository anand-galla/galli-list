import { Injectable, ModuleWithProviders } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private collectionName = 'users';

  constructor(public fireService: AngularFirestore) { }

  createUser(uId: string, user: any) {
    this.fireService.collection(this.collectionName).doc(uId).set({ ...user });
  }
}
