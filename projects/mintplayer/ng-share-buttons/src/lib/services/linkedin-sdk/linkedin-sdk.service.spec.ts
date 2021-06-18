import { TestBed } from '@angular/core/testing';

import { LinkedinSdkService } from './linkedin-sdk.service';

describe('LinkedinSdkService', () => {
  let service: LinkedinSdkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LinkedinSdkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
