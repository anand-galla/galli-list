import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';

import * as models from '../models';
import * as sharedServices from '../shared/services';
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
    Object.assign(task, { dateCreated: new Date() });

    return this.fireService.collection(this.collectionName).add({...task});
  }

  getTask(identifier: string) {
    return this.fireService
              .collection(this.collectionName)
              .doc(identifier)
              .snapshotChanges()
              .pipe(map(item => this.processFirestoreObject(item.payload)));
  }

  getTasks(listIdentifier: string) {
    return this.fireService
              .collection(this.collectionName)
              .snapshotChanges()
              .pipe(map(changes => {
                changes = changes.filter(change => {
                  const data = (change.payload.doc.data() as any);
                  return !data.isDeleted && data.uid === this.authService.userId && (!listIdentifier || data.taskListId === listIdentifier);
                });

                return changes.map(item => this.processFirestoreObject(item.payload.doc));
              }));
  }

  updateTask(identifier: string, { title, date, description, status }: models.Task) {
    const dateUpdated = new Date();
    return this.fireService.collection(this.collectionName).doc(identifier).update({ title, date, description, status, dateUpdated });
  }

  removeTask(identifier: string) {
    return this.fireService.collection(this.collectionName).doc(identifier).update({ isDeleted: true });
  }

  private processFirestoreObject(docObject: any) {
    const data = docObject.data() as any;
    Object.keys(data).filter((key) => data[key] instanceof Timestamp).forEach(key => data[key] = data[key].toDate())
    data.identifier = docObject.id;
    return data;
  }
}
