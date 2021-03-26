import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FirebaseService } from 'src/app/services';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss']
})
export class SingupComponent implements OnInit {
  singUpForm: FormGroup;

  constructor(private firebaseService: FirebaseService) { }

  ngOnInit(): void {
    this.buildLogInForm();
  }

  buildLogInForm() {
    this.singUpForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }

  async signUp() {
    await this.firebaseService.signUp(this.singUpForm.value.email, this.singUpForm.value.password);
    if (this.firebaseService.isLoggedIn) {
      alert('User created Successfull');
    }
  }

}
