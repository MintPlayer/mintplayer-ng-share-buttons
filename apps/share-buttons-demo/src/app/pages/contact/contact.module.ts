import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShareButtonsModule } from '@mintplayer/ng-share-buttons';

import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, ShareButtonsModule, ContactRoutingModule],
})
export class ContactModule {}
