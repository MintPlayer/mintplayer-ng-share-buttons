import { LocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Params } from '@angular/router';
import { BaseUrlService, BASE_URL } from '@mintplayer/ng-base-url';
import { AdvancedRouter } from '@mintplayer/ng-router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { TwitterSdkService } from '../../services/twitter-sdk/twitter-sdk.service';

@Component({
  selector: 'twitter-share',
  templateUrl: './twitter-share.component.html',
  styleUrls: ['./twitter-share.component.scss']
})
export class TwitterShareComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private router: AdvancedRouter,
    private locationStrategy: LocationStrategy,
    private twitterSdk: TwitterSdkService,
    private baseUrlService: BaseUrlService,
  ) {
    this.isViewInited$
      .pipe(filter(i => !!i), take(1))
      .subscribe((inited) => {
        this.twitterSdk.loadTwitterSdk();
      });
    
    combineLatest([this.twitterSdk.twitterSdkReady$, this.commands$, this.queryParams$])
      .pipe(filter(([ready, commands]) => !!ready))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([r, commands, queryParams]) => {
        // Update href
        let urlTree = this.router.createUrlTree(commands, { queryParams });
        let urlSerialized = this.router.serializeUrl(urlTree);
        let href = this.baseUrlService.getBaseUrl({ dropScheme: false }) + this.locationStrategy.prepareExternalUrl(urlSerialized);
        this.href$.next(href);
      });
    
    combineLatest([this.twitterSdk.twitterSdkReady$, this.href$])
      .pipe(filter(([ready, href]) => !!ready))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([ready, href]) => {
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            this.wrapper.nativeElement.innerHTML = `<a href="https://twitter.com/share" class="twitter-share-button" data-url="${href}" data-size="${this.size}" data-text="${this.text}" data-count="none">Tweet</a>`;
            (<any>window)['twttr'] && (<any>window)['twttr'].widgets.load();
          }, 20);
        }
      });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  private destroyed$ = new Subject();
  private isViewInited$ = new BehaviorSubject<boolean>(false);
  private commands$ = new BehaviorSubject<any[]>([]);
  private queryParams$ = new BehaviorSubject<Params>({});
  private href$ = new BehaviorSubject<string>('');

  ngAfterViewInit() {
    this.isViewInited$.next(true);
  }

  //#region routerLink
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
  //#region queryParams
  @Input() set queryParams(value: Params | null) {
    this.queryParams$.next(value ?? {});
  }
  //#endregion
  //#region text
  @Input() text: string = '';
  //#endregion
  //#region size
  @Input() size: 'large' | 'small' = 'large';
  //#endregion

  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement>;

}
