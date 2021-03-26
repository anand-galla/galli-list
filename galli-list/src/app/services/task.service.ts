import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

import * as models from '../models';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private collectionName = 'tasks';

  taskList: AngularFireList<any>;

  constructor(public fireService: AngularFirestore, private authService: AuthenticationService) { }

  createTask(task: models.Task) {
    task.uid = this.authService.userId;
    Object.assign(task, {
      'dateCreated': new Date(),            
    });
    
    return this.fireService.collection(this.collectionName).add({...task});
  }

  getTask(identifier: string) {
    return this.fireService
              .collection(this.collectionName)
              .doc(identifier)
              .snapshotChanges()
              .pipe(map(item => this.processFirestoreObject(item.payload)));
  }

  getTasks() {
    return this.fireService
              .collection(this.collectionName)
              .snapshotChanges()
              .pipe(map(changes => {
                changes = changes.filter(change => (change.payload.doc.data() as any).uid === this.authService.userId)
                return changes.map(item => this.processFirestoreObject(item.payload.doc));
              }));
  }

  updateTask(identifier: string, task: models.Task) {
    Object.assign(task, {
      'dateUpdated': new Date(),            
    });

    return this.fireService.collection(this.collectionName).doc(identifier).update(task);
  }

  removeTask(identifier: string) {
    return this.fireService.collection(this.collectionName).doc(identifier).delete();
  }

  private processFirestoreObject(docObject: any) {
    const data = docObject.data() as any;
    Object.keys(data).filter((key) => data[key] instanceof Timestamp).forEach(key => data[key] = data[key].toDate())
    data.identifier = docObject.id;
    return data;
  }
}
