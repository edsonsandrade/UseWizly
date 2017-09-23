import { NgModule}              from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { BrowserModule }        from '@angular/platform-browser';
import { HttpModule }           from '@angular/http';

import { UserComponent }        from './user.component';
import { UsersListComponent }   from './usersList.component';
import { UserPasswordComponent }  from './user-password/user-password.component';

import { UserService }          from './user.service';
import { UserRoutingModule }    from './user-routing.module';
import { CanDeactivateGuard }   from './can-deactivate-guard.service';

import { ComponentsModule }           from '../../components.module'

import { MaterialModule }       from '../../material.module';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule( {
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    HttpModule,
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    ComponentsModule
  ],
  declarations: [
    UserComponent,
    UsersListComponent,
    UserPasswordComponent
  ],
  entryComponents: [],
  providers: [ UserService,  CanDeactivateGuard]
})

export class UserModule {}
