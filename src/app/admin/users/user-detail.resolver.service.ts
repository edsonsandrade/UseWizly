
import { Injectable }             from '@angular/core';
import { Router,
         Resolve,
         RouterStateSnapshot,
         ActivatedRouteSnapshot } from '@angular/router';
import { User }                   from './user';
import { UserService }            from './user.service';

@Injectable()
export class UserDetailResolver implements Resolve<User> {

  constructor(private us: UserService, private router: Router) {};

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Promise<User> {

      let id = route.params['id'];

      return this.us.getUser(id).then( user => {

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
