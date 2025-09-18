import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComplaintSoftwareComponent } from './complaint-software.component';
import { AddUpdateComplaintComponent } from './add-update-complaint/add-update-complaint.component';
import { ComplaintSoftwareDetailComponent } from './complaint-software-detail/complaint-software-detail.component';
import { EntryTypeComponent } from './Masters/entry-type/entry-type.component';
import { StatusComponent } from './Masters/status/status.component';

const routes: Routes = [
  {
    path: '',
    component: ComplaintSoftwareComponent,
  },

  {
    path: 'compliantList',
    component: ComplaintSoftwareComponent
  },
  {
    path: 'compliantListAddUpdate',
    component: AddUpdateComplaintComponent
  },
  {
    path: 'compliantListAddUpdate/:id',
    component: AddUpdateComplaintComponent
  },
  {
    path: "detail/:id",
    component: ComplaintSoftwareDetailComponent
  },

  {
    path: 'master/entrytype',
    component: EntryTypeComponent
  },
  {
    path: 'master/status',
    component: StatusComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComplaintSoftwareRoutingModule { }
