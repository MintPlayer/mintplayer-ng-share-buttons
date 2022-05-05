import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';
import { filter, take, takeUntil } from 'rxjs/operators';
import { FacebookSdkService } from '../../services/facebook-sdk/facebook-sdk.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { Params } from '@angular/router';
import { ExternalUrlService } from '../../services/external-url/external-url.service';

@Component({
  selector: 'facebook-share',
  templateUrl: './facebook-share.component.html',
  styleUrls: ['./facebook-share.component.scss']
})
export class FacebookShareComponent implements OnDestroy, AfterViewInit {

  constructor(
    private facebookSdk: FacebookSdkService,
    private externalUrlService: ExternalUrlService
  ) {
    this.isViewInited$
      .pipe(filter(i => !!i), take(1))
      .subscribe((inited) => {
        this.facebookSdk.loadFacebookSdk();
      });
    
    combineLatest([this.facebookSdk.facebookSdkReady$.pipe(filter(r => !!r), take(1)), this.commands$, this.queryParams$])
      .pipe(filter(([ready, commands]) => !!ready))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([r, commands, queryParams]) => {
        // Update href
        const href = this.externalUrlService.buildUrl(commands, queryParams);
        this.href$.next(href);
      });
    
    this.href$
      .pipe(filter((href) => !!href))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((href) => {
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            this.wrapper.nativeElement.innerHTML = `<div class="fb-share-button" data-href="${href}" data-size="${this.size}" data-layout="${this.layout}"></div>`;
            (<any>window)['FB'] && (<any>window)['FB'].XFBML.parse(this.wrapper.nativeElement);
          }, 20);
        }
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
  }

  private destroyed$ = new Subject();
  private isViewInited$ = new BehaviorSubject<boolean>(false);
  private commands$ = new BehaviorSubject<any[]>([]);
  private queryParams$ = new BehaviorSubject<Params>({});
  private href$ = new BehaviorSubject<string | null>(null);

  ngAfterViewInit() {
    this.isViewInited$.next(true);
  }

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
  //#region size
  @Input() size: 'large' | 'small' = 'large';
  //#endregion
  //#region layout
  @Input() layout: 'icon_link' | 'box_count' | 'button_count' | 'button' = 'button_count';
  //#endregion

  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement>;

}
