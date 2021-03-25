import { Component, OnInit } from '@angular/core';

import * as sharedServices from 'src/app/shared/services';
import { FirebaseService } from 'src/app/services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isUserLoggedIn: boolean;

  constructor(private localStorageService: sharedServices.LocalStorageService,
    private firebaseService: FirebaseService,
  ) {
    this.localStorageService.get('user').subscribe((data) => {
      if (data) {
        this.isUserLoggedIn = true;
      } else {
        this.isUserLoggedIn = false;
      }
    })
   }

  ngOnInit(): void {
    this.localStorageService.changes$.subscribe((data: any) => {
      if (data?.key == 'user' && data.value) {
        this.isUserLoggedIn = true;
      }
    });
  }

  logOut() {
    this.firebaseService.logOut();
  }
}
