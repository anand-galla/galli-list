import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';

import * as models from '../models';
import * as sharedServices from '../shared/services';

import { map } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class TaskListService {
  private taskListName = 'taskList';
  public taskListIdentifier: string;

  constructor(private fireService: AngularFirestore, 
    private authService: AuthenticationService,
    private utilityService: sharedServices.UtilityService,
    private router: Router,
  ) { }

  createTaskList(list: models.TaskList) {
    if (!this.authService.userId) {
      this.router.navigate(['/login']);
    }

    list.uid = this.authService.userId;
    Object.assign(list, { dateCreated: new Date() });

    console.log(list);
    return this.fireService.collection(this.taskListName).add({ ...list });
  }

  getTaskLists() {
    return this.fireService.collection(this.taskListName).snapshotChanges().pipe(map(changes => {
      changes = changes.filter(change => (change.payload.doc.data() as any).uid === this.authService.userId)
      return changes.map(item => this.utilityService.processFirestoreObject(item.payload.doc));
    }));
  }

  removeTaskList(identifier: string) {
    return this.fireService.collection(this.taskListName).doc(identifier).delete();
  }
}
