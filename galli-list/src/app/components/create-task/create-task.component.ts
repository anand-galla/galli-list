import { Component, OnInit } from '@angular/core';
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
  taskForm: FormGroup;
  task: models.Task;

  constructor(private taskService: services.TaskService,
    private snackBarService: sharedServices.SnackBarService,
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

      this.taskService.updateTask(this.task.identifier, formValue).then((data) => {
        console.log(data);
        this.snackBarService.show('Task updated', 'Update', 2000);
      }).catch((error) => console.log(error));
    } else {
      this.taskForm.markAllAsTouched();
    }
  }
}
