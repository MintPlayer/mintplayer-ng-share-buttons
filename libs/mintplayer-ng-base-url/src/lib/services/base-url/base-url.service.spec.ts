import { TestBed } from '@angular/core/testing';
import { BootFuncParams } from '../../interfaces/boot-func-params';
import { BOOT_FUNC_PARAMS } from '../../providers/boot-func-params.provider';
import { BASE_URL } from '../../providers/base-url.provider';
import { BrowserBaseUrlService } from '../browser-base-url/browser-base-url.service';
import { ServerBaseUrlService } from '../server-base-url/server-base-url.service';
import { BaseUrlService } from './base-url.service';

describe('BaseUrlService', () => {
  let service: BaseUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: BaseUrlService, useClass: BaseUrlService },
        { provide: BASE_URL, useValue: 'http://example.test' },
        { provide: BOOT_FUNC_PARAMS, useValue: <BootFuncParams>{ origin: 'http://example.test', baseUrl: '/' } },
        { provide: BrowserBaseUrlService, useClass: MockBrowserBaseUrlService },
        { provide: ServerBaseUrlService, useClass: MockServerBaseUrlService },
      ]
    });
    service = TestBed.inject(BaseUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the correct base url', () => {
    const baseUrl = service.getBaseUrl();
    expect(baseUrl).toBe('http://example.test');
  });
});

class MockBrowserBaseUrlService {
  getBaseUrl() {
    return 'http://example.test';
  }
}
class MockServerBaseUrlService {

}