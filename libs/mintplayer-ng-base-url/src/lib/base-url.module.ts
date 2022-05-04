import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BASE_URL } from './providers';
import { BaseUrlService } from './services';

// ALL PARAMETERS ARE BEING EVALUATED HERE RIGHTAWAY, NOT JUST AT THE TIME THEY'RE NEEDED
export function getBaseUrl(baseUrlService: BaseUrlService) {
  return baseUrlService.getBaseUrl();
};

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [],
  providers: [
    { provide: BASE_URL, useFactory: getBaseUrl, deps: [BaseUrlService] },
  ]
})
export class BaseUrlModule {
  // static forRoot() : ModuleWithProviders<BaseUrlModule> {
  //   return {
  //     ngModule: BaseUrlModule,
  //     providers: [
  //       { provide: BASE_URL, useFactory: getBaseUrl }
  //     ]
  //   }
  // }
}