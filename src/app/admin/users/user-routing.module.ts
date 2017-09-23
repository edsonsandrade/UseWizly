import { NgModule}                from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { UserComponent }          from './user.component';
import { UsersListComponent }     from './usersList.component';
import { UserPasswordComponent }  from './user-password/user-password.component';

import { UserDetailResolver }     from './user-detail.resolver.service';

import { CanDeactivateGuard }     from './can-deactivate-guard.service';

const usersRoutes: Routes = [
  { path: 'usersList',
    component: UsersListComponent,
    children: [
      {
        path: 'newUser',
        component: UserComponent,
      },
      {
        path: ':id/editPwd',
        component: UserPasswordComponent,
        resolve: {
          user: UserDetailResolver
        }        
      },
      {
        path: ':id',
        component: UserComponent,
        canDeactivate: [CanDeactivateGuard],
        resolve: {
          user: UserDetailResolver
        }
      }
    ]
  },
];

@NgModule( {
  imports: [
    RouterModule.forChild(usersRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    UserDetailResolver
  ]
})

export class UserRoutingModule {}
