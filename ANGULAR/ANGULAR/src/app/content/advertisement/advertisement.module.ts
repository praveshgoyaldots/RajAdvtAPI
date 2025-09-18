import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdvertisementrRoutingModule } from "./advertisementr-routing.module";
import { AdvertisementComponent } from "./advertisement.component";
import { DetailAdvertisementComponent } from "./detail-advertisement/detail-advertisement.component";
import { DeleteAdvertisementComponent } from "./delete-advertisement/delete-advertisement.component";
import { UpdateAdvertisementComponent } from "./update-advertisement/update-advertisement.component";
import { AddAdvertisementComponent } from "./add-advertisement/add-advertisement.component";
import { AppMaterialModule } from "src/app/Shared/app-material/app-material.module";
import { RedesignRequestByPlatformUserComponent } from "./redesign-request-by-platform-user/redesign-request-by-platform-user.component";
import { RedesignRequestForAdminComponent } from "./redesign-request-for-admin/redesign-request-for-admin.component";
import { RequestDetailComponent } from "./redesign-request-for-admin/request-detail/request-detail.component";
import { RedesignApproveDialogComponent } from "./redesign-request-for-admin/redesign-approve-dialog/redesign-approve-dialog.component";
import { AdvListForAdmindepartmentDepartmentUserComponent } from './adv-list-for-admindepartment-department-user/adv-list-for-admindepartment-department-user.component';
import { DownloadAdvertisementComponent } from './adv-list-for-admindepartment-department-user/download-advertisement/download-advertisement.component';
import { AdvertisementRawdataComponent } from './adv-list-for-admindepartment-department-user/download-advertisement/advertisement-rawdata/advertisement-rawdata.component';
import { NgxJsonViewerModule } from "ngx-json-viewer";
import { GovermenttAchivementOrAdvertisementComponent } from './govermentt-achivement-or-advertisement/govermentt-achivement-or-advertisement.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { DetailAchievementsComponent } from './achievements/detail-achievements/detail-achievements.component';
import { AddUpdateAchievementsComponent } from './achievements/add-update-achievements/add-update-achievements.component';
import { VisitorCounterReportComponent } from './visitor-counter-report/visitor-counter-report.component';
import { VisitorCounterDetailReportComponent } from './visitor-counter-detail-report/visitor-counter-detail-report.component';
import { AchievementsCatSummaryReportComponent } from './achievements/achievements-cat-summary-report/achievements-cat-summary-report.component';
import { JankalyanAdvertisementComponent } from './jankalyan-advertisement/jankalyan-advertisement.component';
import { AddupdateJankalyanAdvertisementComponent } from './jankalyan-advertisement/addupdate-jankalyan-advertisement/addupdate-jankalyan-advertisement.component';
import { SchemeModule } from '../scheme/scheme.module';
import { DateWiseVisitorCountReportComponent } from './date-wise-visitor-count-report/date-wise-visitor-count-report.component';


@NgModule({
  declarations: [
    AddAdvertisementComponent,
    AdvertisementComponent,
    DetailAdvertisementComponent,
    DeleteAdvertisementComponent,
    UpdateAdvertisementComponent,
    RedesignRequestByPlatformUserComponent,
    RedesignRequestForAdminComponent,
    RequestDetailComponent,
    RedesignApproveDialogComponent,
    AdvListForAdmindepartmentDepartmentUserComponent,
    DownloadAdvertisementComponent,
    AdvertisementRawdataComponent,
    GovermenttAchivementOrAdvertisementComponent,
    AchievementsComponent,
    DetailAchievementsComponent,
    AddUpdateAchievementsComponent,
    VisitorCounterReportComponent,
    VisitorCounterDetailReportComponent,
    AchievementsCatSummaryReportComponent,
    JankalyanAdvertisementComponent,
    AddupdateJankalyanAdvertisementComponent,
    DateWiseVisitorCountReportComponent,
  ],
  entryComponents: [RedesignApproveDialogComponent, AdvertisementRawdataComponent],
  imports: [CommonModule, NgxJsonViewerModule, AdvertisementrRoutingModule, AppMaterialModule, SchemeModule]
})
export class AdvertisementModule { }
