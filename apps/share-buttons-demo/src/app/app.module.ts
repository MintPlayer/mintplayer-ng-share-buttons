import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ShareButtonsModule } from '@mintplayer/ng-share-buttons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, ShareButtonsModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
