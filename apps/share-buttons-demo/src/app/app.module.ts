import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BaseUrlModule } from '@mintplayer/ng-base-url';
import { FacebookShareComponent } from '@mintplayer/ng-share-buttons/facebook';
import { TwitterShareComponent } from '@mintplayer/ng-share-buttons/twitter';
import { LinkedinShareComponent } from '@mintplayer/ng-share-buttons/linkedin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FacebookShareComponent,
    TwitterShareComponent,
    LinkedinShareComponent,
    BaseUrlModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
