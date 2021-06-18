import { TestBed } from '@angular/core/testing';

import { NgShareButtonsService } from './ng-share-buttons.service';

describe('NgShareButtonsService', () => {
  let service: NgShareButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgShareButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
