import { Component, OnInit } from '@angular/core';

import * as sharedServices from '../../shared/services';
import * as models from '../../models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  localStorageChanges$ = this.localStorageService.changes$;
  tasks: models.Task[] = [];

  constructor(private localStorageService: sharedServices.LocalStorageService) { }

  ngOnInit(): void {
    this.getTasks();
    
    this.localStorageChanges$.subscribe((data: any) => {
      if (data?.key == 'tasks') {
        this.tasks = data?.value || [];
      }
    });
  }

  getTasks() {
    this.localStorageService.get('tasks').subscribe((data) => {
      this.tasks = data?.map(d => new models.Task(d)) || [];
    });
  }
}
