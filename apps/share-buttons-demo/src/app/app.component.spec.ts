import { Component, Input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

@Component({
  selector: 'facebook-share',
})
class FacebookShareMockComponent {
  @Input() shareRouterLink: any[] = [];
}

@Component({
  selector: 'twitter-share',
})
class TwitterShareMockComponent {
  @Input() shareRouterLink: any[] = [];
}

@Component({
  selector: 'linkedin-share',
})
class LinkedinShareMockComponent {
  @Input() shareRouterLink: any[] = [];
}

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        // Unit to test
        AppComponent,

        // Mock dependencies
        FacebookShareMockComponent,
        TwitterShareMockComponent,
        LinkedinShareMockComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title '@mintplayer/ng-share-buttons'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('@mintplayer/ng-share-buttons');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Welcome to @mintplayer/ng-share-buttons'
    );
  });
});