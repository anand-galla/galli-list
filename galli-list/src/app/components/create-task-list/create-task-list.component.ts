import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import * as services from '../../services';
import * as sharedServices from '../../shared/services';

@Component({
  selector: 'app-create-task-list',
  templateUrl: './create-task-list.component.html',
  styleUrls: ['./create-task-list.component.scss']
})
export class CreateTaskListComponent implements OnInit {

  taskListForm: FormGroup;

  constructor(private taskListService: services.TaskListService, private notificationService: sharedServices.NotificationService) { }

  ngOnInit(): void {
    this.buildForm();
    this.taskListService.taskListIdentifier.next(undefined);
  }

  buildForm() {
    this.taskListForm = new FormGroup({
      title: new FormControl('', Validators.required),
    });
  }

  createTaskList() {
    if (this.taskListForm.valid) {
      this.taskListService.createTaskList(this.taskListForm.value).then((res) => {
        this.buildForm();
        this.notificationService.show({ type: 'success', message: 'Task updated successfully.' });
      }).catch((error) => this.notificationService.show({ type: 'error', message: error.message }));
    } else {
      this.taskListForm.markAllAsTouched();
      this.notificationService.show({ type: 'warning', message: 'Please fill all the required fields.' });
    }
  }
}
