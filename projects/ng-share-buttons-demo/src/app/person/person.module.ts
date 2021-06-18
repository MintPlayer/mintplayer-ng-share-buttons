import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShareButtonsModule } from '@mintplayer/ng-share-buttons';

import { PersonRoutingModule } from './person-routing.module';
import { PersonComponent } from './person.component';


@NgModule({
  declarations: [
    PersonComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ShareButtonsModule,
    PersonRoutingModule
  ]
})
export class PersonModule { }
