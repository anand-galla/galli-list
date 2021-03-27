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
  activeListIdentifier: string;

  constructor(private authService: services.AuthenticationService,
    private taskListService: services.TaskListService,
    private snackBarService: sharedServices.SnackBarService,
    private router: Router,
  ) {
   }

  ngOnInit(): void {
    this.authService.user$.subscribe((data) => {
      this.isUserLoggedIn = !!data;
    });

    this.taskLists$ = this.taskListService.getTaskLists();
    this.taskListService.taskListIdentifier.subscribe((data) => this.activeListIdentifier = data);
  }

  removeTaskList(identifier: string) {
    if (confirm('Are you sure you want to delete the selected list?')) {
      this.taskListService.removeTaskList(identifier).then(() => {
        if (this.activeListIdentifier === identifier) {
          this.router.navigate(['/tasks']); 
        }
        this.snackBarService.show('Removed task list', 'Delete', 2000);
      }).catch((error) => console.log(error));
    }    
  }

  singOut() {
    this.authService.signOut().then(() => this.router.navigate(['/login'])).catch((error) => console.log(error));
  }
}
