import { Inject, Injectable, Optional } from '@angular/core';
import { BootFuncParams } from '../../interfaces/boot-func-params';
import { BOOT_FUNC_PARAMS } from '../../providers/boot-func-params.provider';

@Injectable({
  providedIn: 'root'
})
export class ServerBaseUrlService {

  constructor(
    @Optional() @Inject(BOOT_FUNC_PARAMS) private bootFuncParams: BootFuncParams,
  ) {
  }

  public getBaseUrl() {
    if (this.bootFuncParams === null) {
      return null;
    } else {
      return this.bootFuncParams.origin + this.bootFuncParams.baseUrl.slice(0, -1);
    }
  }

}
