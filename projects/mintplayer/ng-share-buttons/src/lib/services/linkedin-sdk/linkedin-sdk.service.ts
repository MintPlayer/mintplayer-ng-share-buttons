import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkedinSdkService {
  private hasAlreadyStartedLoadingLinkedinSdk = false;
  private isLinkedinSdkReady = false;
  private scriptTag!: HTMLScriptElement;

  public LinkedinSdkReady$ = new BehaviorSubject<boolean>(
    (typeof window === 'undefined')
      ? false
      : (<any>window)['IN'] !== undefined
  );

  public loadLinkedinSdk() {
      if (!!this.isLinkedinSdkReady) {
        this.LinkedinSdkReady$.next(true);
      } else if (!this.hasAlreadyStartedLoadingLinkedinSdk) {
        // Ensure the script is inserted only once
        this.hasAlreadyStartedLoadingLinkedinSdk = true;
        
        // Invocation
        this.scriptTag = window.document.createElement('script');
        this.scriptTag.src = '//platform.linkedin.com/in.js';
        this.scriptTag.innerHTML = ' lang: en_US';

        // Insert in DOM
        const firstScriptTag = window.document.getElementsByTagName('script')[0];
        if (!firstScriptTag) {
          document.head.appendChild(this.scriptTag);
        } else if (firstScriptTag.parentNode) {
          firstScriptTag.parentNode.insertBefore(this.scriptTag, firstScriptTag);
        } else {
          throw 'First script tag has no parent node';
        }

        this.isLinkedinSdkReady = true;
        this.LinkedinSdkReady$.next(true);
      }
  }
}
