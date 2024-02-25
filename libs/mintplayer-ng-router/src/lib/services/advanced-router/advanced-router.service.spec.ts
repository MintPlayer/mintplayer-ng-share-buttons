import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AdvancedRouter } from './advanced-router.service';
import { AdvancedRouterModule } from '../../advanced-router.module';
import { ADVANCED_ROUTER_CONFIG } from '../../providers/index';
import { AdvancedRouterConfig } from '../../interfaces/advanced-router-config';

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
        provide: ADVANCED_ROUTER_CONFIG,
        useValue: <AdvancedRouterConfig>{
          navigationDelay: 5,
          queryParams: {
            'lang': 'preserve',
            'return-url': '',
            'options': 'merge'
          },
        }
      }]
    });
    advancedRouter = TestBed.inject(AdvancedRouter);
  });

  it('should be created', () => {
    expect(advancedRouter).toBeTruthy();
  });
});
