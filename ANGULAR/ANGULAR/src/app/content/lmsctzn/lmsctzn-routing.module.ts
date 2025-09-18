import { NewEntryComponent } from './new-entry/new-entry.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: NewEntryComponent,
  },
  {
    path: 'entry',
    component: NewEntryComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LmsctznRoutingModule { }
