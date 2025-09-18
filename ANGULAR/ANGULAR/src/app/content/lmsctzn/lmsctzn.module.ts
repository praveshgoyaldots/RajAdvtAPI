import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LmsctznRoutingModule } from './lmsctzn-routing.module';
import { NewEntryComponent } from './new-entry/new-entry.component';

@NgModule({
  declarations: [NewEntryComponent],
  imports: [
    CommonModule,
    LmsctznRoutingModule
  ]
})
export class LmsctznModule { }
