import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { VcParticipantComponent } from "./vc-participant/vc-participant.component";
import { AppMaterialModule } from "src/app/Shared/app-material/app-material.module";
import { VideoConferencingRoutingModule } from "./video-conferencing-routing.module";
import { VcParticipantAddUpdateComponent } from "./vc-participant/vc-participant-add-update/vc-participant-add-update.component";
import { VcParticipantReportDialogComponent } from "./vc-participant/vc-participant-report-dialog/vc-participant-report-dialog.component";
import { VCCreationComponent } from "./vc-creation/vc-creation.component";
import { AddUpdateVCCreationComponent } from "./vc-creation/add-update-vccreation/add-update-vccreation.component";
import { VcLocationMasterComponent } from "./vc-location-master/vc-location-master.component";
import { AddUpdateVCLocationMasterComponent } from "./vc-location-master/add-update-vclocation-master/add-update-vclocation-master.component";
import { ReportComponent } from './report/report.component';
import { ReportSummaryComponent } from './report/report-summary/report-summary.component';
import { ParticipantExcelUploadComponent } from './vc-participant/participant-excel-upload/participant-excel-upload.component';
import { DistrictReportComponent } from './report/district-report/district-report.component';
import { ChairpersonCatSummaryReportComponent } from './report/chairperson-cat-summary-report/chairperson-cat-summary-report.component';
import { CatDptSummaryReportComponent } from './report/cat-dpt-summary-report/cat-dpt-summary-report.component';
import { AdmDptCatSummaryReportComponent } from './report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component';


@NgModule({
  declarations: [
    VcParticipantComponent,
    VcParticipantAddUpdateComponent,
    VcParticipantReportDialogComponent,
    VCCreationComponent,
    AddUpdateVCCreationComponent,
    VcLocationMasterComponent,
    AddUpdateVCLocationMasterComponent,
    ReportComponent,
    ReportSummaryComponent,
    ParticipantExcelUploadComponent,
    DistrictReportComponent,
    ChairpersonCatSummaryReportComponent,
    CatDptSummaryReportComponent,
    AdmDptCatSummaryReportComponent,

  ],
  entryComponents: [
    VcParticipantReportDialogComponent,
    AddUpdateVCCreationComponent,
    AddUpdateVCLocationMasterComponent,
  ],
  imports: [CommonModule, VideoConferencingRoutingModule, AppMaterialModule],
})
export class VideoConferencingModule {}
