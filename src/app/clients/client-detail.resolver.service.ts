
import { Injectable }             from '@angular/core';
import { Router,
         Resolve,
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { Client }                 from './client';
import { ClientsService }         from './clients.service';

@Injectable()
export class ClientDetailResolver implements Resolve<Client> {

  constructor(private cs: ClientsService, private router: Router) {};

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<Client> {

      let id = route.params['id'];

      return this.cs.getClient(id).then( user => {

        console.log(id)
        if (user) {
          return user;
        } else {
          this.router.navigate(['/usersList']);
          return null;
        }

      });
    }
}
