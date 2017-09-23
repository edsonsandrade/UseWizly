import { NgModule}              from '@angular/core';

import {MdCardModule,
        MdInputModule,
        MdButtonModule,
        MdIconModule,
        MdGridListModule,
        MdListModule,
        MdSelectModule,
        MdDialog,
        MdDialogModule,
        MdSlideToggleModule}            from '@angular/material';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule( {
  imports: [
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdGridListModule,
    MdListModule,
    MdSelectModule,
    MdSlideToggleModule,
    BrowserAnimationsModule,
    MdDialogModule
  ],
  exports: [
    MdCardModule,
    MdInputModule,
    MdButtonModule,
    MdIconModule,
    MdGridListModule,
    MdListModule,
    MdSelectModule,
    MdSlideToggleModule,
    BrowserAnimationsModule,
    MdDialogModule
  ],
  providers: [ MdDialog]
})

export class MaterialModule {}
