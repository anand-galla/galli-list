import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Guid } from 'guid-typescript';

import * as models from '../../models';
import * as sharedServices from '../../shared/services';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  @Input() tasks: models.Task[];
  taskForm: FormGroup;

  constructor(private localStorageService: sharedServices.LocalStorageService,
    private notificationService: sharedServices.NotificationService,
  ) { }

  ngOnInit(): void {
    this.buildFormGroup();
  }

  buildFormGroup() {
    this.taskForm = new FormGroup({
      title: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      description: new FormControl(''),
    });
  }

  createTask() {
    if (this.taskForm.valid) {
      const task = new models.Task(this.taskForm.value);
      task.identifier = Guid.create().toString();
      task.status = models.TaskStatus.Todo;
      console.log(task);
      this.tasks.push(task);
      this.localStorageService.set('tasks', this.tasks).subscribe((data) => {
        if (data) {
          this.buildFormGroup();
          this.notificationService.show({ type: 'success', message: 'Task created successfully' });
        }
      });
    } else {
      this.notificationService.show({ type: 'warning', message: 'Please add all the required fields' });
      this.taskForm.markAllAsTouched();
    }
  }
}
