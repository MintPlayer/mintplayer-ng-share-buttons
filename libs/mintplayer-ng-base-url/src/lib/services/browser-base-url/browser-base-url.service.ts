import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Optional } from '@angular/core';
import { BaseUrlOptions } from '../../interfaces/base-url-options';
import { BASE_URL_OPTIONS } from '../../providers/base-url-options.provider';

@Injectable({
  providedIn: 'root'
})
export class BrowserBaseUrlService {

  constructor(
    @Inject(DOCUMENT) document: any,
    @Optional() @Inject(BASE_URL_OPTIONS) private baseUrlOptions: BaseUrlOptions,
  ) {
      this.document = document;
  }
  
  private document: Document;
  public getBaseUrl() {
    const baseTags = this.document.getElementsByTagName('base');
    if (baseTags.length === 0) {
      return null;
    } else {
      return baseTags[0].href;
    }
  }
}
