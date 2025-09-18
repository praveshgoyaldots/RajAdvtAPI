import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { AdvertisementComponent } from "./advertisement.component";
import { AddAdvertisementComponent } from "./add-advertisement/add-advertisement.component";
import { UpdateAdvertisementComponent } from "./update-advertisement/update-advertisement.component";
import { DetailAdvertisementComponent } from "./detail-advertisement/detail-advertisement.component";
import { DeleteAdvertisementComponent } from "./delete-advertisement/delete-advertisement.component";
import { RedesignRequestByPlatformUserComponent } from "./redesign-request-by-platform-user/redesign-request-by-platform-user.component";
import { RedesignRequestForAdminComponent } from "./redesign-request-for-admin/redesign-request-for-admin.component";
import { RequestDetailComponent } from "./redesign-request-for-admin/request-detail/request-detail.component";
import { AdvListForAdmindepartmentDepartmentUserComponent } from "./adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component";
import { AdvertisementRedesignRequestIdModel } from "src/app/Shared/Model/advertisement.model";
import { DownloadAdvertisementComponent } from "./adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component";
import { GovermenttAchivementOrAdvertisementComponent } from "./govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component";
import { AchievementsComponent } from "./achievements/achievements.component";
import { AddUpdateAchievementsComponent } from "./achievements/add-update-achievements/add-update-achievements.component";
import { DetailAchievementsComponent } from "./achievements/detail-achievements/detail-achievements.component";
import { VisitorCounterReportComponent } from "./visitor-counter-report/visitor-counter-report.component";
import { VisitorCounterDetailReportComponent } from "./visitor-counter-detail-report/visitor-counter-detail-report.component";
import { AchievementsCatSummaryReportComponent } from './achievements/achievements-cat-summary-report/achievements-cat-summary-report.component';
import { JankalyanAdvertisementComponent } from './jankalyan-advertisement/jankalyan-advertisement.component';
import { AddupdateJankalyanAdvertisementComponent } from './jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component';
import { DateWiseVisitorCountReportComponent } from "./date-wise-visitor-count-report/date-wise-visitor-count-report.component";
const routes: Routes = [
  {
    path: "",
    component: AdvertisementComponent,
  },
  {
    path: "add",
    component: AddAdvertisementComponent,
  },
  {
    path: "update/:id",
    component: UpdateAdvertisementComponent,
  },
  {
    path: "detail/:id",
    component: DetailAdvertisementComponent,
  },
  {
    path: "delete/:id",
    component: DeleteAdvertisementComponent,
  },
  {
    path: "redesignrequestbyuser/:id",
    component: RedesignRequestByPlatformUserComponent,
  },
  {
    path: "redesignrequestforadmin",
    component: RedesignRequestForAdminComponent,
  },
  {
    path: "redesigndetailforadmin/:id",
    component: RequestDetailComponent,
  },
  {
    path: "advforadmindepartmentuserdepartment",
    component: AdvListForAdmindepartmentDepartmentUserComponent,
  },
  {
    path: "downloadadvertisement/:id",
    component: DownloadAdvertisementComponent,
  },
  {
    path: "GovermenttAchivementOrAdvertisement",
    component: GovermenttAchivementOrAdvertisementComponent,
  },
  {
    path: "achievements",
    component: AchievementsComponent,
  },
  {
    path: "e-booklet/:catCode",
    component: AchievementsComponent,
  },
  {
    path: "add-e-booklet",
    component: AddUpdateAchievementsComponent,
  },
  {
    path: "update-e-booklet/:id",
    component: AddUpdateAchievementsComponent,
  },
  {
    path: "achievements/detail/:id",
    component: DetailAchievementsComponent,
  },
  {
    path: "achievements/add-achievements",
    component: AddUpdateAchievementsComponent,
  },
  {
    path: "achievements/update-achievements/:id",
    component: AddUpdateAchievementsComponent,
  },
  {
    path: "achievements/update-achievements/:id/:report",
    component: AddUpdateAchievementsComponent,
  },
  {
    path: "achievements/update-achievements-comment/:id",
    component: AddUpdateAchievementsComponent,
  },
  {
    path: "visitorcounterreport",
    component: VisitorCounterReportComponent,
  },
  {
    path: "visitorcounterdetailreport",
    component: VisitorCounterDetailReportComponent,
  },
  {
    path: "date-wise-visitor-count-report",
    component: DateWiseVisitorCountReportComponent,
  },
  {
    path: "achievementcatsummaryreport",
    component: AchievementsCatSummaryReportComponent,
  },
  {
    path: "jankalyan-advertisement",
    component: JankalyanAdvertisementComponent,
  },
  {
    path: "jankalyan-advertisement/add-jankalyan-advertisement",
    component: AddupdateJankalyanAdvertisementComponent,
  },
  {
    path: "jankalyan-advertisement/update-jankalyan-advertisement/:id",
    component: AddupdateJankalyanAdvertisementComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvertisementrRoutingModule { }
