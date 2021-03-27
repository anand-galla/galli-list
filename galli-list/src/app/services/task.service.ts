import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

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

  constructor(public fireService: AngularFirestore, private authService: AuthenticationService, private utilityService: sharedServices.UtilityService) { }

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
              .pipe(map(item => this.utilityService.processFirestoreObject(item.payload)));
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

                return changes.map(item => this.utilityService.processFirestoreObject(item.payload.doc));
              }));
  }

  updateTask(identifier: string, { title, date, description }: models.Task) {
    const dateUpdated = new Date();
    return this.fireService.collection(this.collectionName).doc(identifier).update({ title, date, description, dateUpdated });
  }

  removeTask(identifier: string) {
    return this.fireService.collection(this.collectionName).doc(identifier).update({ isDeleted: true });
  }
}
