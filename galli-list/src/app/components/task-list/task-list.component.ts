import { Component, OnDestroy, OnInit } from '@angular/core';
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
  tasks: models.Task[];

  toDoTasks: models.Task[];
  completedTasks: models.Task[];
  inCompleteTasks: models.Task[];

  taskStatus = models.TaskStatus;
  taskSubscription: Subscription;

  constructor(private taskService: services.TaskService,
    private snackBarService: sharedServices.SnackBarService,
  ) { }

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskSubscription = this.taskService.getTasks().subscribe((data) => {
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
      this.taskService.updateTask(task.identifier, task).then((data) => this.snackBarService.show('Status updated', 'Update', 2000))
            .catch((error) => console.log(error));
    }    
  }

  removeTask(task: models.Task) {
    if (confirm('Are you sure you want to delete the task?')) {
      this.taskService.removeTask(task.identifier).then(() => this.snackBarService.show('Task removed', 'Delete', 2000))
          .catch((error) => console.log(error));
    }    
  }

  ngOnDestroy() {
    this.taskSubscription?.unsubscribe();
  }
}
