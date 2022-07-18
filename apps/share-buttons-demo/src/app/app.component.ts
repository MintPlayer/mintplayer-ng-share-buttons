import { Component } from '@angular/core';
import { BaseUrlService } from '@mintplayer/ng-base-url';

@Component({
  selector: 'mintplayer-ng-share-buttons-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private baseUrlService: BaseUrlService) {
    this.baseUrl = baseUrlService.getBaseUrl({ subdomain: 'test' });
  }

  title = '@mintplayer/ng-share-buttons';
  baseUrl: string | null = '';
}
