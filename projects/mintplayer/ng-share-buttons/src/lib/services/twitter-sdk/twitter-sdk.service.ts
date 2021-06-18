import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterSdkService {
  private hasAlreadyStartedLoadingTwitterSdk = false;
  private isTwitterSdkReady = false;
  private scriptTag!: HTMLScriptElement;

  public twitterSdkReady$ = new BehaviorSubject<boolean>(
    (typeof window === 'undefined')
      ? false
      : (<any>window)['twttr'] !== undefined
  );

  public loadTwitterSdk() {
      if (!!this.isTwitterSdkReady) {
        this.twitterSdkReady$.next(true);
      } else if (!this.hasAlreadyStartedLoadingTwitterSdk) {
        // Ensure the script is inserted only once
        this.hasAlreadyStartedLoadingTwitterSdk = true;
        
        // Invocation
        this.scriptTag = window.document.createElement('script');
        this.scriptTag.id = 'twitter-wjs';
        this.scriptTag.src = 'https://platform.twitter.com/widgets.js';

        // Insert in DOM
        const firstScriptTag = window.document.getElementsByTagName('script')[0];
        if (!firstScriptTag) {
          document.head.appendChild(this.scriptTag);
        } else if (firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(this.scriptTag, firstScriptTag);
        } else {
          throw 'First script tag has no parent node';
        }

        this.isTwitterSdkReady = true;
        this.twitterSdkReady$.next(true);
      }
  }
}
