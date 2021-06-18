import { LocationStrategy } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, Input, IterableDiffer, IterableDiffers, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { BASE_URL } from '@mintplayer/ng-base-url';
import { AdvancedRouter } from '@mintplayer/ng-router';
import { FacebookSdkService } from '../../services/facebook-sdk/facebook-sdk.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';

@Component({
  selector: 'facebook-share',
  templateUrl: './facebook-share.component.html',
  styleUrls: ['./facebook-share.component.scss']
})
export class FacebookShareComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private router: AdvancedRouter,
    private locationStrategy: LocationStrategy,
    private facebookSdk: FacebookSdkService,
    @Inject(BASE_URL) private baseUrl: string
  ) {
    this.destroyed$
      .pipe(filter(d => !!d))
      .subscribe((d) => {
        console.log('destroyed = true');
      });

    this.isViewInited$
      .pipe(filter(i => !!i), take(1))
      .subscribe((inited) => {
        console.log('Button inited');
        this.facebookSdk.loadFacebookSdk();
      });
    
    this.facebookSdk.facebookSdkReady$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((ready) => {
        console.log('SDK ready 1');
      });

    combineLatest([this.facebookSdk.facebookSdkReady$, this.commands$])
      .pipe(filter(([ready, commands]) => !!ready))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([r, commands]) => {
        console.log('SDK ready');

        // Update href
        let urlTree = this.router.createUrlTree(commands);
        let urlSerialized = this.router.serializeUrl(urlTree);
        let href = this.baseUrl + this.locationStrategy.prepareExternalUrl(urlSerialized);
        this.href$.next(href);
      });
    
    combineLatest([this.facebookSdk.facebookSdkReady$, this.href$])
      .pipe(filter(([ready, href]) => !!ready))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([ready, href]) => {
        console.log('new href', href);

        if (typeof window !== 'undefined') {
          setTimeout(() => {
            let h = `<div class="fb-share-button" data-href="${href}" data-size="${this.size}" data-layout="${this.layout}"></div>`;
            console.log("Set innerHtml to", h);
            this.wrapper.nativeElement.innerHTML = h;
            (<any>window)['FB'] && (<any>window)['FB'].XFBML.parse();
          }, 20);
        }
      });
    
    console.log('Load facebook sdk');
    this.facebookSdk.loadFacebookSdk();
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  private destroyed$ = new Subject();
  private isViewInited$ = new BehaviorSubject<boolean>(false);
  private commands$ = new BehaviorSubject<any[]>([]);
  private href$ = new BehaviorSubject<string>('');

  ngAfterViewInit() {
    this.isViewInited$.next(true);
  }

  //#region url
  @Input() set routerLink(value: string | any[]) {
    if (value === null) {
      this.commands$.next([]);
    } else if (Array.isArray(value)) {
      this.commands$.next(value);
    } else {
      this.commands$.next([value]);
    }
  }
  //#endregion
  //#region size
  @Input() size: 'large' | 'small' = 'large';
  //#endregion
  //#region layout
  @Input() layout: 'icon_link' | 'box_count' | 'button_count' | 'button' = 'button_count';
  //#endregion

  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement>;

}
