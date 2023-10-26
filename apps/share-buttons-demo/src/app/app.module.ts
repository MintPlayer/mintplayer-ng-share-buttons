import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BaseUrlModule } from '@mintplayer/ng-base-url';
import { FacebookShareComponent } from '@mintplayer/ng-share-buttons/facebook';
import { TwitterShareComponent } from '@mintplayer/ng-share-buttons/twitter';
import { LinkedinShareComponent } from '@mintplayer/ng-share-buttons/linkedin';
import { AdvancedRouterModule } from '@mintplayer/ng-router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FacebookShareComponent,
    TwitterShareComponent,
    LinkedinShareComponent,

    // Load if you want `prepareExternalUrl` to include the scheme and hostname
    BaseUrlModule,

    // Load if you want to support custom query params handling
    AdvancedRouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
