import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookShareComponent } from '@mintplayer/ng-share-buttons/facebook';
import { TwitterShareComponent } from '@mintplayer/ng-share-buttons/twitter';
import { LinkedinShareComponent } from '@mintplayer/ng-share-buttons/linkedin';

import { ShowRoutingModule } from './show-routing.module';
import { ShowComponent } from './show.component';

@NgModule({
  declarations: [ShowComponent],
  imports: [
    CommonModule,
    FacebookShareComponent,
    TwitterShareComponent,
    LinkedinShareComponent,
    ShowRoutingModule
  ],
})
export class ShowModule {}
