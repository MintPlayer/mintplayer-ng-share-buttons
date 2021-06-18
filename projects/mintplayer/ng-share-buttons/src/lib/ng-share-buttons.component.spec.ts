import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgShareButtonsComponent } from './ng-share-buttons.component';

describe('NgShareButtonsComponent', () => {
  let component: NgShareButtonsComponent;
  let fixture: ComponentFixture<NgShareButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgShareButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgShareButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
