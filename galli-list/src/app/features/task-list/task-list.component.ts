import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import * as models from '../../models';
import * as sharedServices from '../../shared/services';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() tasks: models.Task[];

  toDoTasks: models.Task[];
  completedTasks: models.Task[];
  inCompleteTasks: models.Task[];

  taskSubscription: Subscription;
  taskStatus = models.TaskStatus;

  constructor(private localStorageService: sharedServices.LocalStorageService,
    private notificationService: sharedServices.NotificationService,
  ) { }

  ngOnInit(): void {
    this.filterTasks(this.tasks);

    this.localStorageService.changes$.subscribe((data: any) => {
      if (data.key === 'tasks') {
        this.tasks = data.value;
        this.filterTasks(this.tasks);
      }
    });
  }

  filterTasks(tasks: models.Task[]) {
    this.toDoTasks = tasks.filter(task => task.status === models.TaskStatus.Todo);
    this.completedTasks = tasks.filter(task => task.status === models.TaskStatus.Complete);
    this.inCompleteTasks = tasks.filter(task => task.status === models.TaskStatus.InComplete);
  }

  updateTaskStatus(identifier: string, status: models.TaskStatus) {
    this.tasks.find(task => task.identifier === identifier).status = status;
    this.localStorageService.set('tasks', this.tasks).subscribe((data) => {
      if (data) {
        this.notificationService.show({ type: 'success', message: 'Task status updated successfully' });
      }
    });
  }

  removeTask(identifier: string) {
    this.tasks = this.tasks.filter(task => task.identifier !== identifier);
    this.localStorageService.set('tasks', this.tasks).subscribe((data) => {
      if (data) {
        this.notificationService.show({ type: 'success', message: 'Task deleted successfully' });
      }
    });
  }

  ngOnDestroy() {
    this.taskSubscription.unsubscribe();
  }
}
