import { LocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Params } from '@angular/router';
import { BaseUrlService, BASE_URL } from '@mintplayer/ng-base-url';
import { AdvancedRouter } from '@mintplayer/ng-router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { ExternalUrlService } from '../../services/external-url/external-url.service';
import { LinkedinSdkService } from '../../services/linkedin-sdk/linkedin-sdk.service';

@Component({
  selector: 'linkedin-share',
  templateUrl: './linkedin-share.component.html',
  styleUrls: ['./linkedin-share.component.scss']
})
export class LinkedinShareComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private linkedinSdk: LinkedinSdkService,
    private externalUrlService: ExternalUrlService
  ) {
    this.isViewInited$
      .pipe(filter(i => !!i), take(1))
      .subscribe((inited) => {
        this.linkedinSdk.loadLinkedinSdk();
      });
    
    combineLatest([this.linkedinSdk.LinkedinSdkReady$.pipe(filter(r => !!r), take(1)), this.commands$, this.queryParams$])
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
            this.wrapper.nativeElement.innerHTML = `<script type="IN/Share" data-url="${href}" data-size="${this.size}" data-text="${this.text}"></script>`;
            (<any>window)['IN'] && (<any>window)['IN'].parse();
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
  //#region text
  @Input() text: string = '';
  //#endregion

  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement>;

}
