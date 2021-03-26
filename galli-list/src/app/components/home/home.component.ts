import { Component, OnInit } from '@angular/core';

import * as sharedServices from '../../shared/services';
import * as models from '../../models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
}
