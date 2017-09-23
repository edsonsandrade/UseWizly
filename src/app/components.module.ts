import { NgModule}              from '@angular/core';


import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { DeleteMark }           from './components/deleteMark.component'

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule( {
  imports: [
    InfiniteScrollModule
  ],
  declarations: [
    DeleteMark
  ],
  exports: [ InfiniteScrollModule, DeleteMark ],

})

export class ComponentsModule {}
