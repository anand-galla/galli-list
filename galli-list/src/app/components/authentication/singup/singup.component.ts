import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as models from '../../../models';
import * as services from '../../../services';
import * as sharedServices from '../../../shared';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  singUpForm: FormGroup;

  constructor(private authenticationService: services.AuthenticationService,
    private notificationService: sharedServices.NotificationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.buildLogInForm();
  }

  buildLogInForm() {
    this.singUpForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  signUp() {
    if (this.singUpForm.valid) {
      const formValue = this.singUpForm.value;
      const user = new models.User({
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email
      });

      this.authenticationService.singUp(user, formValue.password).then((res) => {
        this.router.navigate(['/tasks']);
        this.notificationService.show({ type: 'success', message: 'Account created successfully.' });
      }, (error) => this.notificationService.show({ type: 'error', message: error.message }));
    } else {
      this.singUpForm.markAllAsTouched();
      this.notificationService.show({ type: 'warning', message: 'Please fill all the required fields.' });
    }
  }
}
