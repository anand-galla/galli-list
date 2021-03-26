import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { AngularFireList } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import Timestamp = firebase.firestore.Timestamp;

import * as models from '../models';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private collectionName = 'tasks';

  taskList: AngularFireList<any>;

  constructor(public fireService: AngularFirestore) { }

  createTask(task: models.Task) {
    return this.fireService.collection(this.collectionName).add({...task});
  }

  getTask(identifier: string) {
    return this.fireService.collection(this.collectionName).doc(identifier).snapshotChanges().pipe(map(item => {
      const data = item.payload.data() as any;
      Object.keys(data).filter((key) => data[key] instanceof Timestamp).forEach(key => data[key] = data[key].toDate())
      data.identifier = item.payload.id;
      return data;
    }));
  }

  getTasks() {
    return this.fireService.collection(this.collectionName)
                .snapshotChanges()
                .pipe(map(changes => {
                  return changes.map(item => {
                    const data = item.payload.doc.data() as any;
                    Object.keys(data).filter((key) => data[key] instanceof Timestamp).forEach(key => data[key] = data[key].toDate())
                    data.identifier = item.payload.doc.id;
                    return data;
                  });
                }));
  }

  updateTask(identifier: string, task: models.Task) {
    return this.fireService.collection(this.collectionName).doc(identifier).update(task);
  }

  removeTask(identifier: string) {
    return this.fireService.collection(this.collectionName).doc(identifier).delete();
  }
}
