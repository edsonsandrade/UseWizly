import { NgModule}              from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms';
import { BrowserModule }        from '@angular/platform-browser';
import { HttpModule }           from '@angular/http';

import { ClientsComponent }        from './clients.component';
import { ClientsService }          from './clients.service';
import { ClientsListComponent }    from './clientsList.component';

import { ComponentsModule }        from '../components.module'

//import { UserService }          from './user.service';
import { UserRoutingModule }    from './clients-routing.module';
//import { CanDeactivateGuard }   from './can-deactivate-guard.service';

import { MaterialModule }       from '../material.module';

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
    ClientsComponent,
    ClientsListComponent
  ],
  entryComponents: [],
  providers: [ ClientsService ]
  // providers: [ ClientsService,  CanDeactivateGuard]
})

export class ClientsModule {}
