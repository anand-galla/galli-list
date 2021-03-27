import { HomeComponent } from './home/';
import { TaskListComponent } from './task-list';
import { CreateTaskComponent } from './create-task';
import { CreateTaskListComponent } from './create-task-list';

import * as authenticationComponents from './authentication';

export const components : any[] = [ 
    HomeComponent, 
    TaskListComponent,
    CreateTaskComponent,
    CreateTaskListComponent,
    ...authenticationComponents.components,
];

export * from './home';
export * from './task-list';
export * from './create-task';
export * from './authentication';
export * from './create-task-list';