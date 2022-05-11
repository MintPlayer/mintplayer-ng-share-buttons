import { isPlatformServer } from '@angular/common';
import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { BaseUrlOptions } from '../../interfaces/base-url-options';
import { BASE_URL_OPTIONS } from '../../providers/base-url-options.provider';
import { BrowserBaseUrlService } from '../browser-base-url/browser-base-url.service';
import { ServerBaseUrlService } from '../server-base-url/server-base-url.service';

@Injectable({
  providedIn: 'root'
})
export class BaseUrlService {

  constructor(
    private browserBaseUrlService: BrowserBaseUrlService,
    private serverBaseUrlService: ServerBaseUrlService,
    @Optional() @Inject(PLATFORM_ID) private platformId?: any,
    @Optional() @Inject(BASE_URL_OPTIONS) private baseUrlOptions?: BaseUrlOptions,
  ) {
  }

  public getBaseUrl(baseUrlOptions?: Partial<BaseUrlOptions>) {
    let baseHref: string | null;
    if (isPlatformServer(this.platformId)) {
      baseHref = this.serverBaseUrlService.getBaseUrl();
    } else {
      baseHref = this.browserBaseUrlService.getBaseUrl();
    }

    const combinedBaseUrlOptions = this.baseUrlOptions ?? { };
    if (baseUrlOptions) {
      Object.assign(combinedBaseUrlOptions, baseUrlOptions);
    }

    const trimmed = this.applyOptionsToUrl(baseHref, combinedBaseUrlOptions ?? null);
    return trimmed;
  }
  
  private applyOptionsToUrl(url: string | null, baseUrlOptions?: Partial<BaseUrlOptions>) {
    if (url === null) {
      return null;
    }
    
    // Trim the scheme
    if (!!baseUrlOptions && baseUrlOptions.dropScheme) {
      url = url.replace(/^https?:\/\//gi, '//');
    }

    // Slice the trailing /
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }

    return url;
  }

}
