import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeopleComponent } from './people.component';

const routes: Routes = [
  { path: '', component: PeopleComponent },
  { path: ':id', component: PeopleComponent, loadChildren: () => import('./show/show.module').then((m) => m.ShowModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeopleRoutingModule {}
