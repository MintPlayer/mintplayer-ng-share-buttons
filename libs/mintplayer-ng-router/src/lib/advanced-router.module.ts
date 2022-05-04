import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedRouterLinkDirective } from './directives/advanced-router-link/advanced-router-link.directive';
import { ROUTER } from '@mintplayer/ng-router-provider';
import { AdvancedRouter } from '../lib/services/advanced-router/advanced-router.service';

@NgModule({
  imports: [CommonModule],
  declarations: [AdvancedRouterLinkDirective],
  exports: [AdvancedRouterLinkDirective],
  providers: [
    { provide: ROUTER, useClass: AdvancedRouter }
  ]
})
export class AdvancedRouterModule {}
