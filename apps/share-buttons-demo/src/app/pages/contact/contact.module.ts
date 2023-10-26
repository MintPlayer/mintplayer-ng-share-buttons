import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacebookShareComponent } from '@mintplayer/ng-share-buttons/facebook';
import { TwitterShareComponent } from '@mintplayer/ng-share-buttons/twitter';
import { LinkedinShareComponent } from '@mintplayer/ng-share-buttons/linkedin';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [
    CommonModule,
    FacebookShareComponent,
    TwitterShareComponent,
    LinkedinShareComponent,
    ContactRoutingModule
  ],
})
export class ContactModule {}
