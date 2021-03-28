import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';

import * as models from '../../models';
import * as services from '../../services';
import * as sharedServices from '../../shared/services';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit, OnDestroy {
  @Input() taskListIdentifier: string;
  
  tasks: models.Task[];

  toDoTasks: models.Task[];
  completedTasks: models.Task[];
  inCompleteTasks: models.Task[];

  taskStatus = models.TaskStatus;
  taskSubscription: Subscription;

  constructor(private taskService: services.TaskService,
    private notificationService: sharedServices.NotificationService,
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.taskListIdentifier) {
      this.getTasks();
    }
  }

  getTasks() {
    this.taskSubscription = this.taskService.getTasks(this.taskListIdentifier).subscribe((data) => {
      this.tasks = data?.map(d => new models.Task(d));
      this.filterTasks(data);
    });
  }

  filterTasks(tasks: models.Task[]) {
    this.toDoTasks = tasks.filter(task => task.status === models.TaskStatus.Todo);
    this.completedTasks = tasks.filter(task => task.status === models.TaskStatus.Complete);
    this.inCompleteTasks = tasks.filter(task => task.status === models.TaskStatus.InComplete);
  }

  updateTaskStatus(task: models.Task, status: models.TaskStatus) {
    if (task.status !== status) {
      task.status = status;
      this.taskService.updateTaskStatus(task.identifier, task).then(() => this.notificationService.show({ type: 'success', message: 'Status updated successfully.' }))
            .catch((error) => this.notificationService.show({ type: 'error', message: error.message }));
    }   
  }

  removeTask(task: models.Task) {
    if (confirm('Are you sure you want to delete the task?')) {
      this.taskService.removeTask(task.identifier).then(() => this.notificationService.show({ type: 'success', message: 'Task removed successfully.' }))
          .catch((error) => this.notificationService.show({ type: 'error', message: error.message }));
    }
  }

  ngOnDestroy() {
    this.taskSubscription?.unsubscribe();
  }
}
