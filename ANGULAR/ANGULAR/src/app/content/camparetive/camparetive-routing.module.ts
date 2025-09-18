import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { KpiCategoryComponent } from './master/kpi-category/kpi-category.component';
import { AddupdatecamparativeParameterComponent } from './master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component';
import { CamparativeParameterMasterComponent } from './master/camparative-parameter-master/camparative-parameter-master.component';
import { CamparativeYearMasterComponent } from './master/camparative-year-master/camparative-year-master.component';
import { CamparativeTargetEntryComponent } from './camparative-target-entry/camparative-target-entry.component';
import { AddupdateCamparativeTargetEntryComponent } from './camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component';
import { AddupdateCurrentGovernmentEntryComponent } from './current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component';
import { CurrentGovernmentEntryComponent } from './current-government-entry/current-government-entry.component';
import { AddupdatePreviousGovernmentEntryComponent } from './previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component';
import { PreviousGovernmentEntryComponent } from './previous-government-entry/previous-government-entry.component';
import { EBookletComponent } from './e-booklet/e-booklet.component';
import { DistrictkpiComponent } from './districtkpi/districtkpi.component';
import { AddUpdateDistrictkpiComponent } from './districtkpi/add-update-districtkpi/add-update-districtkpi.component';
import { DepartmentalProgressComponent } from './departmental-progress/departmental-progress.component';
import { AddUpdateDepartmentalProgressComponent } from './departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component';
import { DistrictProgressComponent } from './district-progress/district-progress.component';
import { AddUpdateDistrictProgressComponent } from './district-progress/add-update-district-progress/add-update-district-progress.component';

const routes: Routes = [
  {
    path: "kpicategory",
    component: KpiCategoryComponent,
  },
  {
    path: "camparativeparameter",
    component: CamparativeParameterMasterComponent,
  },
  {
    path: "add",
    component: AddupdatecamparativeParameterComponent,
  },
  {
    path: "update/:id",
    component: AddupdatecamparativeParameterComponent,
  },
   {
    path: "yearmaster",
    component: CamparativeYearMasterComponent,
  },
  {
    path: "camparativetargetentry",
    component: CamparativeTargetEntryComponent,
  },
  {
    path: "camparativtargetentry/add",
    component: AddupdateCamparativeTargetEntryComponent,
  },
  {
    path: "camparativtargetentry/update/:id",
    component: AddupdateCamparativeTargetEntryComponent,
  },
  // current government Entry
  {
    path: "current-government-entry",
    component: CurrentGovernmentEntryComponent,
  },
  {
    path: "current-government-entry/add",
    component: AddupdateCurrentGovernmentEntryComponent,
  },
  {
    path: "current-government-entry/update/:id",
    component: AddupdateCurrentGovernmentEntryComponent,
  },
   // current government Entry
   {
    path: "previous-government-entry",
    component: PreviousGovernmentEntryComponent,
  },
  {
    path: "previous-government-entry/add",
    component: AddupdatePreviousGovernmentEntryComponent,
  },
  {
    path: "previous-government-entry/update/:id",
    component: AddupdatePreviousGovernmentEntryComponent,
  },
  {
    path: "e-booklet",
    component: EBookletComponent,
  },
  // current government Entry
  {
    path: "district-kpi",
    component: DistrictkpiComponent,
  }
  ,
  {
    path: "district-kpi/add",
    component: AddUpdateDistrictkpiComponent,
  },
  {
    path: "district-kpi/update/:id",
    component: AddUpdateDistrictkpiComponent,
  },
  {
    path: "departmental-progress",
    component: DepartmentalProgressComponent,
  },
  {
    path: "departmental-progress/add",
    component: AddUpdateDepartmentalProgressComponent,
  },
   {
    path: "departmental-progress/update/:id",
    component: AddUpdateDepartmentalProgressComponent,
  },
  {
    path: "district-progress",
    component: DistrictProgressComponent,
  },
  {
    path: "district-progress/update/:id",
    component: AddUpdateDistrictProgressComponent,
  },
  {
    path: "district-progress/add",
    component: AddUpdateDistrictProgressComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamparetiveRoutingModule { }
