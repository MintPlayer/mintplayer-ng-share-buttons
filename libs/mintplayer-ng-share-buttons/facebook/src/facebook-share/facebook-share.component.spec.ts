import { APP_BASE_HREF } from '@angular/common';
import { Component, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, UrlCreationOptions, UrlSegment, UrlSegmentGroup, UrlTree } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AdvancedRouter, QueryParamsConfig, QUERY_PARAMS_CONFIG } from '@mintplayer/ng-router';

import { FacebookShareComponent } from './facebook-share.component';

describe('FacebookShareComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: '', component: HomeComponent }
        ])
      ],
      declarations: [
        FacebookShareComponent,
        AppComponent,
        HomeComponent
      ],
      providers: [{
        provide: AdvancedRouter,
        useClass: MockAdvancedRouter
      }, {
        provide: APP_BASE_HREF,
        useValue: 'http://localhost/'
      }, {
        provide: QUERY_PARAMS_CONFIG,
        useValue: <QueryParamsConfig>{ }
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
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
  selector: 'test-app-component',
  template: `
    <h1>App</h1>
    <router-outlet></router-outlet>`
})
class AppComponent {
}

@Component({
  selector: 'test-home-component',
  template: `
    <h2>Home</h2>
    <facebook-share [shareRouterLink]='[]'></facebook-share>`
})
class HomeComponent {
}