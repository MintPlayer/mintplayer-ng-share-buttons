import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdvancedRouter } from './advanced-router.service';
import { QueryParamsConfig } from '../../interfaces/query-params-config';
import { QUERY_PARAMS_CONFIG } from '../../providers/query-params-config.provider';
import { AdvancedRouterModule } from '../../advanced-router.module';

// OK
describe('Router', () => {
  let advancedRouter: AdvancedRouter;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        AdvancedRouterModule
      ],
      providers: [{
        provide: QUERY_PARAMS_CONFIG,
        useValue: <QueryParamsConfig>{
          'lang': 'preserve',
          'return-url': '',
          'options': 'merge'
        }
      }]
    });
    advancedRouter = TestBed.inject(AdvancedRouter);
  });

  it('should be created', () => {
    expect(advancedRouter).toBeTruthy();
  });
});