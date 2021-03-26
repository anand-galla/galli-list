import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Guid } from 'guid-typescript';

import * as models from '../../models';
import * as services from '../../services';
import * as sharedServices from '../../shared/services';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  taskForm: FormGroup;
  task: models.Task;

  constructor(private taskService: services.TaskService,
    private notificationService: sharedServices.NotificationService,
    private snackBarService: sharedServices.SnackBarService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        const identifier = params['id'];
        this.getTask(identifier);
      } else {
        this.buildTaskForm();
      }
    })
  }

  ngOnInit(): void {
   
  }

  buildTaskForm(task?: models.Task) {
    this.taskForm = new FormGroup({
      title: new FormControl(task?.title || '', Validators.required),
      date: new FormControl(task?.date || '', Validators.required),
      description: new FormControl(task?.description || ''),
    });
  }

  getTask(identifier: string) {
    this.taskService.getTask(identifier).subscribe((data) => {
      console.log(data);
      this.task = data;
      this.buildTaskForm(data);
    });
  }

  createTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task = new models.Task(formValue);

      this.taskService.createTask(task).then((res) => {
        this.buildTaskForm();
        this.snackBarService.show('Task created', 'Create', 2000);
      }).catch((error) => {
        console.log(error);
      });
    } else {
      this.taskForm.markAllAsTouched();
    }
  }

  updateTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      this.task.title = formValue.title;
      this.task.description = formValue.description;
      this.task.date = formValue.date;

      this.taskService.updateTask(this.task.identifier, this.task).then((data) => {
        console.log(data);
        this.snackBarService.show('Task updated', 'Update', 2000);
      }).catch((error) => console.log(error));
    }
  }

  // getTask(identifier: string) {
  //   this.localStorageService.get('tasks').subscribe((data) => {
  //     this.tasks = data || [];
  //     // this.task = this.tasks.find(task => task.identifier === identifier);
  //     this.buildFormGroup(this.task);
  //   });
  // }



  // createTask() {
  //   if (this.taskForm.valid) {
  //     const task = new models.Task(this.taskForm.value);
  //     // task.identifier = Guid.create().toString();
  //     task.status = models.TaskStatus.Todo;
  //     this.tasks.push(task);
  //     this.localStorageService.set('tasks', this.tasks).subscribe((data) => {
  //       if (data) {
  //         this.buildFormGroup();
  //         this.snackBarService.show('Task created', 'Create', 2000);
  //       }
  //     });
  //   } else {
  //     this.taskForm.markAllAsTouched();
  //   }
  // }

  // updateTask() {
  //   if (this.taskForm.valid) {
  //     const formValue = this.taskForm.value;
  //     this.task.title = formValue.title;
  //     this.task.description = formValue.description;
  //     this.task.date = formValue.date;

  //     // const taskIndex = this.tasks.findIndex(task => task.identifier === this.taskIdentifier);
  //     // this.tasks[taskIndex] = this.task;
  //     this.localStorageService.set('tasks', this.tasks).subscribe((data) => {
  //       if (data) {
  //         this.snackBarService.show('Task updated', 'Create', 2000);
  //       }
  //     });
  //   } else {
  //     this.taskForm.markAllAsTouched();
  //   }
  // }
}
