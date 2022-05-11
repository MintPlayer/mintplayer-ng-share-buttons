import { APP_BASE_HREF, CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BaseUrlService } from './services/base-url/base-url.service';

// ALL PARAMETERS ARE BEING EVALUATED HERE RIGHTAWAY, NOT JUST AT THE TIME THEY'RE NEEDED
export function getBaseUrl(baseUrlService: BaseUrlService) {
  return baseUrlService.getBaseUrl();
};

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [
    { provide: APP_BASE_HREF, useFactory: getBaseUrl, deps: [BaseUrlService] },
  ]
})
export class BaseUrlModule {
  // static forRoot() : ModuleWithProviders<BaseUrlModule> {
  //   return {
  //     ngModule: BaseUrlModule,
  //     providers: [
  //       { provide: APP_BASE_HREF, useFactory: getBaseUrl }
  //     ]
  //   }
  // }
}