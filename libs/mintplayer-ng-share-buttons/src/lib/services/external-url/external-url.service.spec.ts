import { Component, Injectable } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, UrlCreationOptions, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BASE_URL } from '@mintplayer/ng-base-url';
import { AdvancedRouter, QueryParamsConfig, QUERY_PARAMS_CONFIG } from '@mintplayer/ng-router';

import { ExternalUrlService } from './external-url.service';

describe('ExternalUrlService', () => {
  let service: ExternalUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent }
        ])
      ],
      declarations: [
        HomeComponent
      ],
      providers: [{
        provide: AdvancedRouter,
        useClass: MockAdvancedRouter
      }, {
        provide: BASE_URL,
        useValue: 'http://localhost/'
      }, {
        provide: QUERY_PARAMS_CONFIG,
        useValue: <QueryParamsConfig>{ }
      }]
    });
    service = TestBed.inject(ExternalUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

@Injectable({
  providedIn: 'root'
})
class MockAdvancedRouter {
  
  constructor(private router: Router) {
  }

  createUrlTree(commands: any[], extras?: UrlCreationOptions) : UrlTree {
    let urlTree = new UrlTree();

    // Segments
    urlTree.root = new UrlSegmentGroup(
      commands.map(c => new UrlSegment(
        (<string>c).startsWith('/')
          ? (<string>c).substring(1)
          : <string>c,
        { }
      )),
      { }
    );

    // QueryParams
    if ((typeof extras !== 'undefined') && (typeof extras.queryParams !== 'undefined') && (extras.queryParams !== null)) {
      urlTree.queryParams = extras.queryParams;
    } else {
      urlTree.queryParams = { };
    }

    return urlTree;
  }

  serializeUrl(url: UrlTree) {
    return this.router.serializeUrl(url);
  }
}

@Component({
  selector: 'test-home-component',
  template: `<h2>Home</h2>`
})
class HomeComponent {
}