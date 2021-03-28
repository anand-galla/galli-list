import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import * as models from '../../models';
import * as services from '../../services';
import * as sharedServices from '../../shared/services';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  @Input() taskListIdentifier: string;

  taskForm: FormGroup;
  task: models.Task;

  constructor(private taskService: services.TaskService,
    private notificationService: sharedServices.NotificationService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe(params => {
      if (params['taskId']) {
        const identifier = params['taskId'];
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
      date: new FormControl(task?.date || new Date(), Validators.required),
      description: new FormControl(task?.description || ''),
    });
  }

  getTask(identifier: string) {
    this.taskService.getTask(identifier).subscribe((data) => {
      this.task = data;
      this.buildTaskForm(data);
    });
  }

  createTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const task = new models.Task(formValue);
      task.taskListId = this.taskListIdentifier;

      this.taskService.createTask(task).then(() => {
        this.buildTaskForm();
        this.notificationService.show({ type: 'success', message: 'Task created successfully.' });
      }).catch((error) => this.notificationService.show({ type: 'error', message: error.message }));
    } else {
      this.taskForm.markAllAsTouched();
      this.notificationService.show({ type: 'warning', message: 'Please fill all the required fields.' });
    }
  }

  updateTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      this.task.title = formValue.title;
      this.task.description = formValue.description;
      this.task.date = formValue.date;

      this.taskService.updateTask(this.task.identifier, formValue).then((data) => {
        this.notificationService.show({ type: 'success', message: 'Task updated successfully.' });
      }).catch((error) => this.notificationService.show({ type: 'error', message: error.message }));
    } else {
      this.taskForm.markAllAsTouched();
      this.notificationService.show({ type: 'warning', message: 'Please fill all the required fields.' });
    }
  }
}
