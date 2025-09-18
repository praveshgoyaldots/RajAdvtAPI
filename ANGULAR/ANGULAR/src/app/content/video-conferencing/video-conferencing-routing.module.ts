import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VcParticipantComponent } from './vc-participant/vc-participant.component';
import { VcParticipantAddUpdateComponent } from './vc-participant/vc-participant-add-update/vc-participant-add-update.component';
import { VCCreationComponent } from './vc-creation/vc-creation.component';
import { ReportComponent } from './report/report.component';
import { VcLocationMasterComponent } from './vc-location-master/vc-location-master.component';
import { ReportSummaryComponent } from './report/report-summary/report-summary.component';
import { ParticipantExcelUploadComponent } from './vc-participant/participant-excel-upload/participant-excel-upload.component';
import { DistrictReportComponent } from './report/district-report/district-report.component';
import { ChairpersonCatSummaryReportComponent } from './report/chairperson-cat-summary-report/chairperson-cat-summary-report.component';
import { CatDptSummaryReportComponent } from './report/cat-dpt-summary-report/cat-dpt-summary-report.component';
import { AdmDptCatSummaryReportComponent } from './report/adm-dpt-cat-summary-report/adm-dpt-cat-summary-report.component';

const routes: Routes = [
  {
    path: "",
    component: VcParticipantComponent,
  },
  {
    path: "participant",
    component: VcParticipantComponent,
  },
  {
    path: "participant/:id",
    component: VcParticipantComponent,
  },
  {
    path: "add",
    component: VcParticipantAddUpdateComponent,
  },
  {
    path: "add/:id",
    component: VcParticipantAddUpdateComponent,
  },
  {
    path: "VCCreation",
    component: VCCreationComponent,
  },
  {
    path: "report",
    component: ReportComponent,
  },
  {
    path: "report/:id",
    component: ReportComponent,
  },
  {
    path: "VcLocationMaster",
    component: VcLocationMasterComponent,
  },
    {
    path: "reportsummary",
    component: ReportSummaryComponent,
  },
    {
    path: "participantExcelupload",
    component: ParticipantExcelUploadComponent,
  },
  {
  path: "districtreport",
  component: DistrictReportComponent,
},
{
path: "chirpersoncategorysummaryreport",
component: ChairpersonCatSummaryReportComponent,
},
{
  path: "reportsummary/:ChairpersonCat",
  component: ReportSummaryComponent,
}
,
{
  path: "cat-dpt-summary-report",
  component: CatDptSummaryReportComponent,
},
{
  path: "adm-dpt-cat-summary-report",
  component: AdmDptCatSummaryReportComponent,
}
  // {
  //   path: "vcdistrictreport",
  //   component: VcGraphicalDistrictReportComponent,
  // },
  // {
  //   path: "vclocationreport",
  //   component: VcGraphicalLocationReportComponent,
  // },
  // {
  //   path: "vcparticipantreport",
  //   component: VcGraphicalParticipantReportComponent,
  // },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VideoConferencingRoutingModule {}
