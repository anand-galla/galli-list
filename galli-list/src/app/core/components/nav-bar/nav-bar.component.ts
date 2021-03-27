import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import * as sharedServices from 'src/app/shared/services';
import * as services from '../../../services';
import * as models from '../../../models';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isUserLoggedIn: boolean;
  taskLists$: Observable<models.TaskList[]>;
  taskListIdentifier: string;

  constructor(private authService: services.AuthenticationService,
    private taskListService: services.TaskListService,
    private snackBarService: sharedServices.SnackBarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      if (params['taskListId']) {
        this.taskListIdentifier = params['taskListId'];
      } else {
        this.taskListIdentifier = '';
      }

      console.log(this.taskListIdentifier);
      this.taskListService.taskListIdentifier = this.taskListIdentifier;
    });
   }

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.isUserLoggedIn = !!data;
    });

    this.getTaskLists();
  }

  getTaskLists() {
    this.taskLists$ = this.taskListService.getTaskLists();
  }

  removeTaskList(identifier: string) {
    this.taskListService.removeTaskList(identifier).then(() => {
      this.snackBarService.show('Removed task list', 'Delete', 2000);
    }).catch((error) => console.log(error));
  }

  singOut() {
    this.authService.signOut().then(() => this.router.navigate(['/login'])).catch((error) => console.log(error));
  }
}
