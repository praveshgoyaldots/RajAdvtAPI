import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CamparetiveRoutingModule } from "./camparetive-routing.module";
import { AppMaterialModule } from "src/app/Shared/app-material/app-material.module";
import { KpiCategoryComponent } from "./master/kpi-category/kpi-category.component";
import { AddupdatekpiCategoryComponent } from "./master/kpi-category/addupdatekpi-category/addupdatekpi-category.component";
import { CamparativeParameterMasterComponent } from "./master/camparative-parameter-master/camparative-parameter-master.component";
import { AddupdatecamparativeParameterComponent } from "./master/camparative-parameter-master/addupdatecamparative-parameter/addupdatecamparative-parameter.component";
import { GlobalListSearchComponent } from "src/app/global-list-search/global-list-search.component";
import { SchemeModule } from '../scheme/scheme.module';
import { CamparativeYearMasterComponent } from './master/camparative-year-master/camparative-year-master.component';
import { AddupdatecomparativeYearMasterComponent } from './master/camparative-year-master/addupdatecomparative-year-master/addupdatecomparative-year-master.component';
import { CamparativeTargetEntryComponent } from './camparative-target-entry/camparative-target-entry.component';
import { AddupdateCamparativeTargetEntryComponent } from './camparative-target-entry/addupdate-camparative-target-entry/addupdate-camparative-target-entry.component';
import { CurrentGovernmentEntryComponent } from './current-government-entry/current-government-entry.component';
import { AddupdateCurrentGovernmentEntryComponent } from './current-government-entry/addupdate-current-government-entry/addupdate-current-government-entry.component';
import { PreviousGovernmentEntryComponent } from './previous-government-entry/previous-government-entry.component';
import { AddupdatePreviousGovernmentEntryComponent } from './previous-government-entry/addupdate-previous-government-entry/addupdate-previous-government-entry.component';
import { EBookletComponent } from './e-booklet/e-booklet.component';
import { DistrictkpiComponent } from './districtkpi/districtkpi.component';
import { AddUpdateDistrictkpiComponent } from './districtkpi/add-update-districtkpi/add-update-districtkpi.component';
import { DepartmentalProgressComponent } from './departmental-progress/departmental-progress.component';
import { AddUpdateDepartmentalProgressComponent } from './departmental-progress/add-update-departmental-progress/add-update-departmental-progress.component';
import { DistrictProgressComponent } from './district-progress/district-progress.component';
import { AddUpdateDistrictProgressComponent } from './district-progress/add-update-district-progress/add-update-district-progress.component';

@NgModule({
  declarations: [
    KpiCategoryComponent,
    AddupdatekpiCategoryComponent,
    CamparativeParameterMasterComponent,
    AddupdatecamparativeParameterComponent,
    CamparativeYearMasterComponent,
    AddupdatecomparativeYearMasterComponent,
    CamparativeTargetEntryComponent,
    AddupdateCamparativeTargetEntryComponent,
    CurrentGovernmentEntryComponent,
    AddupdateCurrentGovernmentEntryComponent,
    PreviousGovernmentEntryComponent,
    AddupdatePreviousGovernmentEntryComponent,
    EBookletComponent,
    DistrictkpiComponent,
    AddUpdateDistrictkpiComponent,
    DepartmentalProgressComponent,
    AddUpdateDepartmentalProgressComponent,
    DistrictProgressComponent,
    AddUpdateDistrictProgressComponent,
  ],
  entryComponents: [AddupdatekpiCategoryComponent,AddupdatecomparativeYearMasterComponent],
  imports: [CommonModule, CamparetiveRoutingModule, AppMaterialModule,SchemeModule],
})
export class CamparetiveModule {}
