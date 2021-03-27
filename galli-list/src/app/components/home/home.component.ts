import { Component, OnInit } from '@angular/core';

import * as services from '../../services';
import * as models from '../../models';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  taskListIdentifier: string;

  constructor(private activatedRoute: ActivatedRoute, private taskListService: services.TaskListService) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['taskListId']) {
        this.taskListIdentifier = params['taskListId'];
      } else {
        this.taskListIdentifier = '';
      }

      this.taskListService.taskListIdentifier.next(this.taskListIdentifier);
    });
   }

  ngOnInit(): void {
  }
}
