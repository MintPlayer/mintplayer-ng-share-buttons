import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedRouterModule } from '@mintplayer/ng-router';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleComponent } from './people.component';

@NgModule({
  declarations: [PeopleComponent],
  imports: [CommonModule, AdvancedRouterModule, PeopleRoutingModule],
})
export class PeopleModule {}
