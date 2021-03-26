import { HomeComponent } from './home/';
import { TaskListComponent } from './task-list';
import { CreateTaskComponent } from './create-task';
import * as authenticationComponents from './authentication';

export const components : any[] = [ 
    HomeComponent, 
    TaskListComponent,
    CreateTaskComponent,
    ...authenticationComponents.components,
];

export * from './home';
export * from './task-list';
export * from './create-task';
export * from './authentication';