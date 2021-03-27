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

  constructor(private taskListService: services.TaskListService, private snackBarService: sharedServices.SnackBarService) { }

  ngOnInit(): void {
    this.buildForm();
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
        this.snackBarService.show('New list created', 'Create', 2000);
      });
    } else {
      this.taskListForm.markAllAsTouched();
    }
  }

}
