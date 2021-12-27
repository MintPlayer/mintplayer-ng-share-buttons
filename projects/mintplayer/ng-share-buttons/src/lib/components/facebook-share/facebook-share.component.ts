import { LocationStrategy } from '@angular/common';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, Inject, Input, IterableDiffer, IterableDiffers, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { filter, map, take, takeUntil } from 'rxjs/operators';
import { BaseUrlService, BASE_URL } from '@mintplayer/ng-base-url';
import { AdvancedRouter } from '@mintplayer/ng-router';
import { FacebookSdkService } from '../../services/facebook-sdk/facebook-sdk.service';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { Params } from '@angular/router';

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
    private baseUrlService: BaseUrlService,
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
        let urlTree = this.router.createUrlTree(commands, { queryParams });
        let urlSerialized = this.router.serializeUrl(urlTree);
        let href = this.baseUrlService.getBaseUrl({ dropScheme: false }) + this.locationStrategy.prepareExternalUrl(urlSerialized);
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

  ngOnInit() {
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
  //#region size
  @Input() size: 'large' | 'small' = 'large';
  //#endregion
  //#region layout
  @Input() layout: 'icon_link' | 'box_count' | 'button_count' | 'button' = 'button_count';
  //#endregion

  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement>;

}
