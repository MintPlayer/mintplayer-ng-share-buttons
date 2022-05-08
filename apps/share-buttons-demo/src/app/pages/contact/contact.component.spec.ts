import { Component, Input } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ContactComponent } from './contact.component';

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

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        // Unit to test
        ContactComponent,
      
        // Mock dependencies
        FacebookShareMockComponent,
        TwitterShareMockComponent,
        LinkedinShareMockComponent,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
