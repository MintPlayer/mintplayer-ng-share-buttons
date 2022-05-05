import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonsModule } from '@mintplayer/ng-share-buttons';

import { ShowRoutingModule } from './show-routing.module';
import { ShowComponent } from './show.component';

@NgModule({
  declarations: [ShowComponent],
  imports: [CommonModule, ShareButtonsModule, ShowRoutingModule],
})
export class ShowModule {}
