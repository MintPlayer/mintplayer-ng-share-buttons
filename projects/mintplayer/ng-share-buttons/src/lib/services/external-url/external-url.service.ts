import { LocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import { Params } from '@angular/router';
import { BaseUrlService } from '@mintplayer/ng-base-url';
import { AdvancedRouter } from '@mintplayer/ng-router';

@Injectable({
  providedIn: 'root'
})
export class ExternalUrlService {

  constructor(
    private router: AdvancedRouter,
    private baseUrlService: BaseUrlService,
    private locationStrategy: LocationStrategy
  ) {}

  buildUrl(commands: any[], queryParams: Params | null) {
    if ((commands.length === 1) && (/https?:\/\//.test(commands[0]))) {
      const href = commands[0];
      return href;
    } else {
      const urlTree = this.router.createUrlTree(commands, { queryParams });
      const urlSerialized = this.router.serializeUrl(urlTree);
      const href = this.baseUrlService.getBaseUrl({ dropScheme: false }) + this.locationStrategy.prepareExternalUrl(urlSerialized);
      return href;
    }
  }
}
