import { Routes } from '@angular/router';
import { PeopleComponent } from './people.component';

export const PEOPLE_ROUTES: Routes = [
  {
    path: '',
    component: PeopleComponent
  },
  {
    path: ':id',
    // component: PeopleComponent,
    loadComponent: () => import('./show/show.component').then((m) => m.ShowComponent)
  },
];