import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent } from 'ng-mocks';
import { FacebookShareComponent } from '@mintplayer/ng-share-buttons/facebook';
import { TwitterShareComponent } from '@mintplayer/ng-share-buttons/twitter';
import { LinkedinShareComponent } from '@mintplayer/ng-share-buttons/linkedin';
import { AppComponent } from './app.component';

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
        MockComponent(FacebookShareComponent),
        MockComponent(TwitterShareComponent),
        MockComponent(LinkedinShareComponent)
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