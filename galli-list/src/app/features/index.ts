import { HomeComponent } from './home/';
import { TaskListComponent } from './task-list';
import { CreateTaskComponent } from './create-task';


export const components : any[] = [ 
    HomeComponent, 
    TaskListComponent,
    CreateTaskComponent,
];

export * from './home';
export * from './task-list';
export * from './create-task';