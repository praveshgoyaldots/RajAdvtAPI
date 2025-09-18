import { AngularEditorModule } from '@kolkov/angular-editor';
import { HereMapAdressSearchComponent } from './here-map-adress-search/here-map-adress-search.component';
import { GlobalListSearchComponent } from './../../global-list-search/global-list-search.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SchemeRoutingModule } from './scheme-routing.module';
import { SchemeComponent } from './scheme.component';
import { UpdateSchemeComponent } from './update-scheme/update-scheme.component';
import { DeleteSchemeComponent } from './delete-scheme/delete-scheme.component';
import { DetailSchemeComponent } from './detail-scheme/detail-scheme.component';
import { AddSchemeComponent } from './add-scheme/add-scheme.component';
import { FaqSchemeComponent } from './faq-scheme/faq-scheme.component';
import { AppMaterialModule } from 'src/app/Shared/app-material/app-material.module';
import { MonitoringParametersSchemeComponent } from './monitoring-parameters-scheme/monitoring-parameters-scheme.component';
import { DataEntryComponent } from './monitoring-parameters-scheme/data-entry/data-entry.component';
import { DataEntryDialogComponent } from './monitoring-parameters-scheme/data-entry/data-entry-dialog/data-entry-dialog.component';
import { MPCountWithSchemeComponent } from './monitoring-parameters-scheme/m-p-count-with-scheme/m-p-count-with-scheme.component';
import { MPMonthlyCountBySchemeComponent } from './monitoring-parameters-scheme/m-p-monthly-count-by-scheme/m-p-monthly-count-by-scheme.component';
import { AssignSchemeComponent } from './assign-scheme/assign-scheme.component';
import { SetPriorityComponent } from './set-priority/set-priority.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { AssignSchemeToUserComponent } from './assign-scheme/assign-scheme-to-user/assign-scheme-to-user.component';
import { UpdateGroupSchemeComponent } from './update-group-scheme/update-group-scheme.component';
import { ContactPersonDialogComponent } from './contact-person-dialog/contact-person-dialog.component';
import { DeptOfcContactDetailComponent } from './dept-ofc-contact-detail/dept-ofc-contact-detail.component';
import { SendnotificationtoDeptComponent } from './sendnotificationto-dept/sendnotificationto-dept.component';
import { UpdateSchemeBeneficiaryComponent } from './update-scheme-beneficiary/update-scheme-beneficiary.component';


@NgModule({
  declarations: [
    SchemeComponent,
    AddSchemeComponent,
    UpdateSchemeComponent,
    DeleteSchemeComponent,
    DetailSchemeComponent,
    FaqSchemeComponent,
    MonitoringParametersSchemeComponent,
    DataEntryComponent,
    DataEntryDialogComponent,
    GlobalListSearchComponent,
    MPCountWithSchemeComponent,
    MPMonthlyCountBySchemeComponent,
    AssignSchemeComponent,
    SetPriorityComponent,
    AssignSchemeToUserComponent,
    UpdateGroupSchemeComponent,
    ContactPersonDialogComponent,
    HereMapAdressSearchComponent,
    DeptOfcContactDetailComponent,
    SendnotificationtoDeptComponent,
    UpdateSchemeBeneficiaryComponent
  ],
  entryComponents:[DataEntryDialogComponent, MPCountWithSchemeComponent,ContactPersonDialogComponent,HereMapAdressSearchComponent,SendnotificationtoDeptComponent,DeptOfcContactDetailComponent,UpdateSchemeBeneficiaryComponent],
  exports: [
    GlobalListSearchComponent

  ],
  imports: [CommonModule, SchemeRoutingModule, AppMaterialModule, CKEditorModule,AngularEditorModule]
})
export class SchemeModule { }
