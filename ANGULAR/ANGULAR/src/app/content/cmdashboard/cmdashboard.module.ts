import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { CmoletterComponent } from "./cmoletter/cmoletter.component";
import { CmdashboardComponent } from "./cmdashboard.component";
import { CmdashboardRoutingModule } from "./cmdashboard-routing.module";
import { AppMaterialModule } from "src/app/Shared/app-material/app-material.module";
import { CmistaskComponent } from "./cmistask/cmistask.component";
import { RecruitmentStatusComponent } from "./recruitmentstatus/recruitmentstatus.component";
import { ProjectMonitoringComponent } from "./project-monitoring/project-monitoring.component";
import { FilterDailogComponent } from "./filter-dailog/filter-dailog.component";
import { MatDialogModule } from "@angular/material";
import { SchemedashboardComponent } from "./schemedashboard/schemedashboard.component";
import { FilterComponent } from "./cmistask/filter/filter.component";
import { RecruitmentStatusFilterComponent } from "./recruitmentstatus/recruitment-status-filter/recruitment-status-filter.component";
import { ProjectmonitoringFilterComponent } from "./project-monitoring/projectmonitoring-filter/projectmonitoring-filter.component";
import { ZoomCMOLetterdailogComponent } from "./cmoletter/zoom-cmoletterdailog/zoom-cmoletterdailog.component";
import { GovtOrderDashboardComponent } from "./govt-order-dashboard/govt-order-dashboard.component";
import { ZoomcmistaskdailogComponent } from "./cmistask/zoomcmistaskdailog/zoomcmistaskdailog.component";
import { SchemedashboardzoomdailogComponent } from "./schemedashboard/schemedashboardzoomdailog/schemedashboardzoomdailog.component";
import { ZOOMgovtorderdashboardComponent } from "./govt-order-dashboard/zoomgovtorderdashboard/zoomgovtorderdashboard.component";
import { ZOOMProjectmonitoringComponent } from "./project-monitoring/zoomprojectmonitoring/zoomprojectmonitoring.component";
import { ZoomrecruitmentstatusComponent } from "./recruitmentstatus/zoomrecruitmentstatus/zoomrecruitmentstatus.component";
import { DashboardHelpDocumentComponent } from '../master/dashboard-help-document/dashboard-help-document.component';

@NgModule({
  declarations: [
    CmoletterComponent,
    CmdashboardComponent,
    CmistaskComponent,
    RecruitmentStatusComponent,
    ProjectMonitoringComponent,
    FilterDailogComponent,
    SchemedashboardComponent,
    FilterComponent,
    FilterComponent,
    RecruitmentStatusFilterComponent,
    ProjectmonitoringFilterComponent,
    ZoomCMOLetterdailogComponent,
    GovtOrderDashboardComponent,
    ZoomcmistaskdailogComponent,
    SchemedashboardzoomdailogComponent,
    ZOOMgovtorderdashboardComponent,
    ZOOMProjectmonitoringComponent,
    ZoomrecruitmentstatusComponent,
    DashboardHelpDocumentComponent
  ],
  imports: [
    CommonModule,
    CmdashboardRoutingModule,
    AppMaterialModule,
    MatDialogModule
  ],
  entryComponents: [
    FilterComponent,
    RecruitmentStatusFilterComponent,
    ProjectmonitoringFilterComponent,
    ZoomCMOLetterdailogComponent,
    ZoomcmistaskdailogComponent,
    SchemedashboardzoomdailogComponent,
    ZOOMgovtorderdashboardComponent,
    ZOOMProjectmonitoringComponent,
    ZoomrecruitmentstatusComponent,
    DashboardHelpDocumentComponent
  ],

  exports: [],
  providers: [DatePipe]
})
export class CmdashboardModule {}
