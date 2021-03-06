import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterSdkService {

  constructor(@Inject(DOCUMENT) private document: Document) {
  }

  private hasAlreadyStartedLoadingTwitterSdk = false;
  private isTwitterSdkReady = false;
  private scriptTag!: HTMLScriptElement;

  public twitterSdkReady$ = new BehaviorSubject<boolean>(
    (typeof window === 'undefined')
      ? false
      : (<any>window)['twttr'] !== undefined
  );

  public loadTwitterSdk() {
      if (this.isTwitterSdkReady) {
        this.twitterSdkReady$.next(true);
      } else if (!this.hasAlreadyStartedLoadingTwitterSdk) {
        // Ensure the script is inserted only once
        this.hasAlreadyStartedLoadingTwitterSdk = true;
        
        // Invocation
        this.scriptTag = this.document.createElement('script');
        this.scriptTag.id = 'twitter-wjs';
        this.scriptTag.src = 'https://platform.twitter.com/widgets.js';

        // Insert in DOM
        const firstScriptTag = this.document.getElementsByTagName('script')[0];
        if (!firstScriptTag) {
          this.document.head.appendChild(this.scriptTag);
        } else if (firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(this.scriptTag, firstScriptTag);
        } else {
          this.document.head.appendChild(this.scriptTag);
        }

        this.isTwitterSdkReady = true;
        this.twitterSdkReady$.next(true);
      }
  }
}
