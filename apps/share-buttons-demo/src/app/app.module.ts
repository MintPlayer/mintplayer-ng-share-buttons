import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BaseUrlModule } from '@mintplayer/ng-base-url';
import { ADVANCED_ROUTER_CONFIG, AdvancedRouterConfig, provideAdvancedRouter } from '@mintplayer/ng-router';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,

    // Load if you want `prepareExternalUrl` to include the scheme and hostname
    BaseUrlModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
