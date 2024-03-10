import { Component } from '@angular/core';
import { BaseUrlService } from '@mintplayer/ng-base-url';
import { AdvancedRouterLinkDirective } from '@mintplayer/ng-router';
import { FacebookShareComponent } from '@mintplayer/ng-share-buttons/facebook';
import { TwitterShareComponent } from '@mintplayer/ng-share-buttons/twitter';
import { LinkedinShareComponent } from '@mintplayer/ng-share-buttons/linkedin';

@Component({
  selector: 'mintplayer-ng-share-buttons-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    FacebookShareComponent,
    TwitterShareComponent,
    LinkedinShareComponent,
    AdvancedRouterLinkDirective
  ]
})
export class AppComponent {
  constructor(private baseUrlService: BaseUrlService) {
    this.baseUrl = baseUrlService.getBaseUrl({ subdomain: 'test' });
  }

  title = '@mintplayer/ng-share-buttons';
  baseUrl: string | null = '';
}
