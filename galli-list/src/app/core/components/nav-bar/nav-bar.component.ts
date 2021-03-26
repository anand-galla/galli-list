import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import * as sharedServices from 'src/app/shared/services';
import * as services from '../../../services';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  isUserLoggedIn: boolean;

  constructor(private authenticationServicce: services.AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  singOut() {
    this.authenticationServicce.signOut().then(() => this.router.navigate(['../'])).catch((error) => console.log(error));
  }
}
