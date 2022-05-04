import { TestBed } from '@angular/core/testing';

import { TwitterSdkService } from './twitter-sdk.service';

describe('TwitterSdkService', () => {
  let service: TwitterSdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitterSdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
