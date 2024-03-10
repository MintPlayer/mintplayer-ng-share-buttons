import { APP_BASE_HREF, CommonModule, DOCUMENT, isPlatformServer } from '@angular/common';
import { InjectionToken, PLATFORM_ID, Provider } from '@angular/core';
import { BaseUrlService } from './services/base-url/base-url.service';
import { BootFuncParams } from './interfaces';
import { BOOT_FUNC_PARAMS } from './providers';

// // ALL PARAMETERS ARE BEING EVALUATED HERE RIGHTAWAY, NOT JUST AT THE TIME THEY'RE NEEDED
// export function getBaseUrl(baseUrlService: BaseUrlService, platformId?: any) {
//   return baseUrlService.getBaseUrl({ dropScheme: false });
// };

export const APP_BASE_HREF_RAW = new InjectionToken<string>('AppBaseHrefRaw');

function getRawBaseUrl(doc: any, platformId: any, bootFuncParams?: BootFuncParams) {
  const docAsDocument = <Document>doc;
  if (isPlatformServer(platformId)) {
    if (!bootFuncParams) {
      throw 'During SSR you need to provide BOOT_FUNC_PARAMS';
    }
    return bootFuncParams.origin + bootFuncParams.baseUrl.slice(0, -1);
  } else {
    const baseTags = docAsDocument.getElementsByTagName('base');
    if (baseTags.length === 0) {
      return null;
    } else {
      return baseTags[0].href;
    }
  }
}

export function provideBaseHref(useHref?: string | BootFuncParams): Provider[] {
  // TODO: apply options
  if (typeof useHref === 'string') {
    return [
      { provide: APP_BASE_HREF_RAW, useValue: useHref },
    ]
  } else if (useHref) {
    return [
      { provide: BOOT_FUNC_PARAMS, useValue: useHref },
      { provide: APP_BASE_HREF_RAW, useFactory: getRawBaseUrl, deps: [DOCUMENT, PLATFORM_ID, BOOT_FUNC_PARAMS] },
    ];
  } else {
    return [
      { provide: APP_BASE_HREF_RAW, useFactory: getRawBaseUrl, deps: [DOCUMENT, PLATFORM_ID] },
    ];
  }
}