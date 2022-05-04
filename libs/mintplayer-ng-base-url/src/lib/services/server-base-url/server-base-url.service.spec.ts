import { TestBed } from '@angular/core/testing';
import { BOOT_FUNC_PARAMS } from '../../providers/boot-func-params.provider';

import { ServerBaseUrlService } from './server-base-url.service';

describe('ServerBaseUrlService', () => {
  let service: ServerBaseUrlService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        { provide: BOOT_FUNC_PARAMS, useValue: 'http://example.test' },
      ]
    });
    service = TestBed.inject(ServerBaseUrlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
