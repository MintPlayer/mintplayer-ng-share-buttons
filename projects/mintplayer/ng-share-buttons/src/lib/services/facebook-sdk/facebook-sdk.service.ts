import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacebookSdkService {
  private hasAlreadyStartedLoadingFacebookSdk = false;
  private isFacebookSdkReady = false;
  private scriptTag!: HTMLScriptElement;

  public facebookSdkReady$ = new BehaviorSubject<boolean>(
    (typeof window === 'undefined')
      ? false
      : (<any>window)['FB'] !== undefined
  );

  public loadFacebookSdk() {
      if (!!this.isFacebookSdkReady) {
        this.facebookSdkReady$.next(true);
      } else if (!this.hasAlreadyStartedLoadingFacebookSdk) {
        // Ensure the script is inserted only once
        this.hasAlreadyStartedLoadingFacebookSdk = true;
        
        // Invocation
        this.scriptTag = window.document.createElement('script');
        this.scriptTag.id = 'facebook-jssdk';
        this.scriptTag.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.0';

        // Insert in DOM
        const firstScriptTag = window.document.getElementsByTagName('script')[0];
        if (!firstScriptTag) {
          document.head.appendChild(this.scriptTag);
        } else if (firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(this.scriptTag, firstScriptTag);
        } else {
          throw 'First script tag has no parent node';
        }

        this.isFacebookSdkReady = true;
        this.facebookSdkReady$.next(true);
      }
  }
}
