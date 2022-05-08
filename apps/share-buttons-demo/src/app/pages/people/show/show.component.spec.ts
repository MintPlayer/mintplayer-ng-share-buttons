import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ShowComponent } from './show.component';

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

describe('ShowComponent', () => {
  let component: ShowComponent;
  let fixture: ComponentFixture<ShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      declarations: [
        // Unit to test  
        ShowComponent,

        // Mock dependencies
        FacebookShareMockComponent,
        TwitterShareMockComponent,
        LinkedinShareMockComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
