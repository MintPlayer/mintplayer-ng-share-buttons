import { LocationStrategy } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BASE_URL } from '@mintplayer/ng-base-url';
import { AdvancedRouter } from '@mintplayer/ng-router';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { LinkedinSdkService } from '../../services/linkedin-sdk/linkedin-sdk.service';

@Component({
  selector: 'linkedin-share',
  templateUrl: './linkedin-share.component.html',
  styleUrls: ['./linkedin-share.component.scss']
})
export class LinkedinShareComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private router: AdvancedRouter,
    private locationStrategy: LocationStrategy,
    private linkedinSdk: LinkedinSdkService,
    @Inject(BASE_URL) private baseUrl: string
  ) {
    this.isViewInited$
      .pipe(filter(i => !!i), take(1))
      .subscribe((inited) => {
        this.linkedinSdk.loadLinkedinSdk();
      });
    
    combineLatest([this.linkedinSdk.LinkedinSdkReady$, this.commands$])
      .pipe(filter(([ready, commands]) => !!ready))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([r, commands]) => {
        // Update href
        let urlTree = this.router.createUrlTree(commands);
        let urlSerialized = this.router.serializeUrl(urlTree);
        let href = this.baseUrl + this.locationStrategy.prepareExternalUrl(urlSerialized);
        this.href$.next(href);
      });
    
    combineLatest([this.linkedinSdk.LinkedinSdkReady$, this.href$])
      .pipe(filter(([ready, href]) => !!ready))
      .pipe(takeUntil(this.destroyed$))
      .subscribe(([ready, href]) => {
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
  //#region text
  @Input() text: string = '';
  //#endregion

  @ViewChild('wrapper') wrapper!: ElementRef<HTMLDivElement>;

}