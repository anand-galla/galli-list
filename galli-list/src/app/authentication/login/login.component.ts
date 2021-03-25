import { FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import { FirebaseService } from './../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  logInForm: FormGroup;

  constructor(private firebaseService: FirebaseService,
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

  async logIn() {
    await this.firebaseService.signIn(this.logInForm.value.email, this.logInForm.value.password);
    if (this.firebaseService.isLoggedIn) {
      this.router.navigate(['../']);
    }
  }
}
