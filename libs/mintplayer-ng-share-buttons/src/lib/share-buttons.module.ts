import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdvancedRouterModule } from '@mintplayer/ng-router';
import { FacebookShareComponent } from './components/facebook-share/facebook-share.component';
import { TwitterShareComponent } from './components/twitter-share/twitter-share.component';
import { LinkedinShareComponent } from './components/linkedin-share/linkedin-share.component';

@NgModule({
  declarations: [
    FacebookShareComponent,
    TwitterShareComponent,
    LinkedinShareComponent
  ],
  imports: [
    RouterModule,
    AdvancedRouterModule
  ],
  exports: [
    FacebookShareComponent,
    TwitterShareComponent,
    LinkedinShareComponent
  ]
})
export class ShareButtonsModule { }
