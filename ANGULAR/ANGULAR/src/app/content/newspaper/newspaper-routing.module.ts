import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewspaperComponent } from './newspaper.component';
import { NewspaperAddUpdateComponent } from './newspaper-add-update/newspaper-add-update.component';
import { NewspaperDetailWithProgresslistComponent } from './newspaper-detail-with-progresslist/newspaper-detail-with-progresslist.component';

const routes: Routes = [
  {
    path: "news",
    component: NewspaperComponent,
  },
  {
    path: "add",
    component: NewspaperAddUpdateComponent,
  },
  {
    path: "add/:id",
    component: NewspaperAddUpdateComponent,
  },
  {
    path: "detail/:id",
    component: NewspaperDetailWithProgresslistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewspaperRoutingModule { }
