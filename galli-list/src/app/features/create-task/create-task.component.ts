import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-task',
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.scss']
})
export class CreateTaskComponent implements OnInit {
  currentDate: Date;
  title: string = '';
  description: string = '';
  constructor() { }

  ngOnInit(): void {
    
  }

  createTask() {
    alert(this.currentDate);
  }

}
