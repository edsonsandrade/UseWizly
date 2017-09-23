import { Injectable }           from '@angular/core';
import { CanDeactivate,
         ActivatedRouteSnapshot,
         RouterStateSnapshot,
         Router}  from '@angular/router';

import { MdDialog }               from '@angular/material';
import { DialogConfirmService }   from '../../services/dialog-confirm.service';

import { UserComponent }        from './user.component';

@Injectable()
export class CanDeactivateGuard implements CanDeactivate<UserComponent> {

  constructor(
    private dialog: MdDialog,
    private router: Router) {

  }

  canDeactivate(
    component:  UserComponent,
    route:      ActivatedRouteSnapshot,
    state:      RouterStateSnapshot
  ): Promise<boolean> | boolean {

    if (JSON.stringify(component.user)===JSON.stringify( component.originalValues))
      return true;

      return window.confirm(component.language.messages._editExit)


  }
}
