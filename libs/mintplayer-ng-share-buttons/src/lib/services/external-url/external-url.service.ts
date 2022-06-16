import { LocationStrategy } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Params, Router } from '@angular/router';
import { IRouter, ROUTER } from '@mintplayer/ng-router-provider';

@Injectable({
  providedIn: 'root'
})
export class ExternalUrlService {

  constructor(
    private router: Router,
    @Inject(ROUTER) private advancedRouter: IRouter,
    private locationStrategy: LocationStrategy
  ) {}

  buildUrl(commands: any[], queryParams: Params | null) {
    const router = this.advancedRouter || this.router;

    if ((commands.length === 1) && (/https?:\/\//.test(commands[0]))) {
      const href = commands[0];
      return href;
    } else {
      const urlTree = router.createUrlTree(commands, { queryParams });
      const urlSerialized = router.serializeUrl(urlTree);
      const href = this.locationStrategy.prepareExternalUrl(urlSerialized);
      return href;
    }
  }
}
