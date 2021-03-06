import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { Params } from '@angular/router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ExternalUrlService } from '../../services/external-url/external-url.service';
import { TwitterSdkService } from '../../services/twitter-sdk/twitter-sdk.service';

@Component({
  selector: 'twitter-share',
  templateUrl: './twitter-share.component.html',
  styleUrls: ['./twitter-share.component.scss']
})
export class TwitterShareComponent implements OnDestroy, AfterViewInit {

  constructor(
    private twitterSdk: TwitterSdkService,
    private externalUrlService: ExternalUrlService
  ) {
    this.isViewInited$
      .pipe(filter(i => !!i), take(1))
      .subscribe((inited) => {
        this.twitterSdk.loadTwitterSdk();
      });
    
    combineLatest([this.twitterSdk.twitterSdkReady$.pipe(filter(r => !!r), take(1)), this.commands$, this.queryParams$])
      .pipe(filter(([ready, commands]) => !!ready))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([r, commands, queryParams]) => {
        // Update href
        const href = this.externalUrlService.buildUrl(commands, queryParams);
        console.log('twitter href', href);
        this.href$.next(href);
      });
    
    this.href$
      .pipe(filter((href) => !!href))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((href) => {
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            this.wrapper.nativeElement.innerHTML = `<a href="https://twitter.com/share" class="twitter-share-button" data-url="${href}" data-size="${this.size}" data-text="${this.text}" data-count="none">Tweet</a>`;
            (<any>window)['twttr'] && (<any>window)['twttr'].widgets.load();
          }, 20);
        }
      });
  }

  private destroyed$ = new Subject();
  private isViewInited$ = new BehaviorSubject<boolean>(false);
  private commands$ = new BehaviorSubject<any[]>([]);
  private queryParams$ = new BehaviorSubject<Params>({});
  private href$ = new BehaviorSubject<string | null>(null);
  
  //#region shareRouterLink
  @Input() set shareRouterLink(value: string | any[]) {
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
  @Input() text = '';
  //#endregion
  //#region size
  @Input() size: 'large' | 'small' = 'large';
  //#endregion
  
  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement>;

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  ngAfterViewInit() {
    this.isViewInited$.next(true);
  }

}
