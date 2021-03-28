import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import * as services from '../../../services';
import * as sharedServices from '../../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;

  constructor(private authenticationService: services.AuthenticationService,
    private notificationService: sharedServices.NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildLogInForm();
  }

  buildLogInForm() {
    this.logInForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  logIn() {
    this.authenticationService.signIn(this.logInForm.value.email, this.logInForm.value.password).then(() => {
      this.router.navigate(['../']);
    }).catch((error) => this.notificationService.show({ type: 'error', message: error.message }));
  }
}
