import { LocationStrategy } from '@angular/common';
import { Attribute, Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, UrlTree } from '@angular/router';
import { AdvancedRouter } from '../../services/advanced-router/advanced-router.service';

// See https://github.com/angular/angular/blob/master/packages/router/src/directives/router_link.ts#L256

@Directive({selector: 'a[advRouterLink],area[advRouterLink]'})
export class AdvancedRouterLinkDirective extends RouterLink {

  constructor(
    private advancedRouter: AdvancedRouter,
    private nativeRoute: ActivatedRoute,
    @Attribute('tabindex') tabIndexAttribute: string|null|undefined,
    nativeRouter: Router,
    renderer: Renderer2,
    element: ElementRef,
    nativeLocationStrategy: LocationStrategy
  ) {
    super(nativeRouter, nativeRoute, tabIndexAttribute, renderer, element, nativeLocationStrategy);
  }

  private nativeCommands: any[] = [];

  /**
   * Commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
   *   - **array**: commands to pass to {@link Router#createUrlTree Router#createUrlTree}.
   *   - **string**: shorthand for array of commands with just the string, i.e. `['/route']`
   *   - **null|undefined**: shorthand for an empty array of commands, i.e. `[]`
   * @see {@link Router#createUrlTree Router#createUrlTree}
   */
   @Input()
   set advRouterLink(commands: any[] | string | null | undefined) {
     if (commands != null) {
       this.nativeCommands = Array.isArray(commands) ? commands : [commands];
     } else {
       this.nativeCommands = [];
     }
   }

  override get urlTree(): UrlTree {
    return this.advancedRouter.createUrlTree(this.nativeCommands, {
      // If the `relativeTo` input is not defined, we want to use `this.route` by default.
      // Otherwise, we should use the value provided by the user in the input.
      // relativeTo: (<string>this.nativeCommands[0]).startsWith('/') ? null : this.relativeTo !== undefined ? this.relativeTo : this.nativeRoute,
      relativeTo: this.relativeTo !== undefined ? this.relativeTo : this.nativeRoute,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: '', // Drop queryparams and let the AdvancedRouter do all the work
      preserveFragment: this.attrBoolValue(this.preserveFragment),
    });
  }
  
  private attrBoolValue(s: any) {
    return s === '' || !!s;
  }
}