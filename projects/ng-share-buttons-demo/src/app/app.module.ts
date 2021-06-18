import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { QueryParamsConfig, QUERY_PARAMS_CONFIG } from '@mintplayer/ng-router';
import { ShareButtonsModule } from '@mintplayer/ng-share-buttons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ShareButtonsModule,
    AppRoutingModule
  ],
  providers: [{
    provide: QUERY_PARAMS_CONFIG,
    useValue: <QueryParamsConfig>{
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
