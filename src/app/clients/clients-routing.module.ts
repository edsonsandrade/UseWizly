import { NgModule}                from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';

import { ClientsComponent }          from './clients.component';
import { ClientsListComponent }      from './clientsList.component';

import { ClientDetailResolver }     from './client-detail.resolver.service';

//import { CanDeactivateGuard }     from './can-deactivate-guard.service';

const clientsRoutes: Routes = [
  { path: 'clientsList',
    component: ClientsListComponent,
    // children: [
    //   {
    //     path: 'newUser',
    //     component: UserComponent,
    //   },
    //   {
    //     path: ':id/editPwd',
    //     component: UserPasswordComponent,
    //     resolve: {
    //       user: UserDetailResolver
    //     }
    //   },
    //   {
    //     path: ':id',
    //     component: UserComponent,
    //     canDeactivate: [CanDeactivateGuard],
    //     resolve: {
    //       user: UserDetailResolver
    //     }
    //   }
    // ]
  },
];

@NgModule( {
  imports: [
    RouterModule.forChild(clientsRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    ClientDetailResolver
  ]
})

export class UserRoutingModule {}
