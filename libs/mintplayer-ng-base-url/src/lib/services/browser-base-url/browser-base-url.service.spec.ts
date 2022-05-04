import { TestBed } from '@angular/core/testing';

import { BrowserBaseUrlService } from './browser-base-url.service';

describe('BrowserBaseUrlService', () => {
  let service: BrowserBaseUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserBaseUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
