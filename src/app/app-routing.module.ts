import { NgModule}              from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard }      from './services/can-deactivate-guard.service';
import { APP_BASE_HREF } from '@angular/common';

const appRoutes: Routes = [
  { path: 'clients', redirectTo: '/clientsList', pathMatch: 'full'},
  { path: '', redirectTo: '/usersList', pathMatch: 'full'},
]

@NgModule( {
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard,
    { provide: APP_BASE_HREF, useValue: '/' }
  ]
})

export class AppRoutingModule {}
