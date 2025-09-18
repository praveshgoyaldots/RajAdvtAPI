import { AuthGuardService } from "./helper/auth-guard.service";
import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadAllModules } from "@angular/router";
import { TemporaryLoginComponent } from "./temporary-login/temporary-login.component";
import { UpdateUserProfileComponent } from './content/master/user/update-user-profile/update-user-profile.component';
import { CamparetiveModule } from './content/camparetive/camparetive.module';
import { DepartmentWebsiteModule } from './content/department-website/department-website.module';
import { VendorPressReleaseModule } from "./content/vendor-press-release/tender-press-release.module";
import { CmisDetailReportComponent } from './content/master/cmis-summary-report/cmis-detail-report/cmis-detail-report.component';
import { NoOfComplianceComponent } from "./content/master/no-of-compliance/no-of-compliance.component";
import { ComplianceNoOfEntryInJankalyanComponent } from "./content/master/compliance-no-of-entry-in-jankalyan/compliance-no-of-entry-in-jankalyan.component";
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from "./content/home/home.component";

const routes: Routes = [
  // {
  //   path: "", redirectTo: "cmdashboard", pathMatch: "full", canActivate: [AuthGuardService],
  // },


  { path: "", redirectTo: "home", pathMatch: "full", canActivate: [AuthGuardService], },
  { path: "home", component: HomeComponent, pathMatch: "full" },

  { path: "detail-report/:module/:dept", component: CmisDetailReportComponent, pathMatch: "full" },
  { path: "detail-report/:transCoreId", component: CmisDetailReportComponent, pathMatch: "full" },
  { path: "detail-report/:module/:dept/:dsb", component: CmisDetailReportComponent, pathMatch: "full" },
  { path: "detail-report/:module/:dept/:status", component: CmisDetailReportComponent, pathMatch: "full" },
  { path: "detail-report/:module/:dept/:status/:dsb", component: CmisDetailReportComponent, pathMatch: "full" },
  { path: "master/no-of-ompliance-dsb/:dpt/:module/:dptCode/:moduleId/:dsb", component: NoOfComplianceComponent, pathMatch: "full" },
  { path: "master/no-of-entry-in-jankalyan-dsb/:dpt/:module/:dptCode/:moduleId/:dsb", component: ComplianceNoOfEntryInJankalyanComponent, pathMatch: "full" },
  { path: "master/no-of-entry-in-jankalyan/:dpt/:module/:dptCode/:moduleId/:dsb", component: ComplianceNoOfEntryInJankalyanComponent, pathMatch: "full" },

  { path: "master/no-of-entry-in-jankalyan-dsb/:dpt/:module/:dptCode/:moduleId/:dsb/:expected", component: ComplianceNoOfEntryInJankalyanComponent, pathMatch: "full" },
  { path: "master/no-of-entry-in-jankalyan/:dpt/:module/:dptCode/:moduleId/:dsb/:expected", component: ComplianceNoOfEntryInJankalyanComponent, pathMatch: "full" },

  { path: "master/no-of-ompliance-dsb/:dpt/:module/:dptCode/:moduleId/:status/:dsb", component: NoOfComplianceComponent, pathMatch: "full" },
  { path: "master/no-of-entry-in-jankalyan-dsb/:dpt/:module/:dptCode/:moduleId/:status/:dsb", component: ComplianceNoOfEntryInJankalyanComponent, pathMatch: "full" },
  { path: "master/no-of-entry-in-jankalyan/:dpt/:module/:dptCode/:moduleId/:status/:dsb", component: ComplianceNoOfEntryInJankalyanComponent, pathMatch: "full" },

  { path: "master/no-of-entry-in-jankalyan-dsb/:dpt/:module/:dptCode/:moduleId/:status/:dsb/:expected", component: ComplianceNoOfEntryInJankalyanComponent, pathMatch: "full" },
  { path: "master/no-of-entry-in-jankalyan/:dpt/:module/:dptCode/:moduleId/:status/:dsb/:expected", component: ComplianceNoOfEntryInJankalyanComponent, pathMatch: "full" },


  { path: "login", component: TemporaryLoginComponent, pathMatch: "full" }, // For LiveTesst login
  { path: "updateuserprofile", component: UpdateUserProfileComponent, pathMatch: "full" }, // For LiveTesst login
  {
    path: "lms",
    loadChildren: "./content/lms/lms.module#LmsModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "viplms",
    loadChildren: "./content/viplms/viplms.module#ViplmsModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "lmsctzn",
    loadChildren: "./content/lmsctzn/lmsctzn.module#LmsctznModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "cmdashboard",

    loadChildren: "./content/cmdashboard/cmdashboard.module#CmdashboardModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "cmis-dashboard",
    loadChildren:
      "./content/cmisdashboard/cmisdashboard.module#CMISDashboardModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "master",
    loadChildren: "./content/master/master.module#MasterModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "scheme",
    loadChildren: "./content/scheme/scheme.module#SchemeModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "advertisement",
    loadChildren:
      "./content/advertisement/advertisement.module#AdvertisementModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "order",
    loadChildren: "./content/order/order.module#OrderModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "vcreport",
    loadChildren:
      "./content/vc-graphical-report/vc-graphical-report.module#VcGraphicalReportModule",
  },
  {
    path: "vc",
    loadChildren:
      "./content/video-conferencing/video-conferencing.module#VideoConferencingModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "compliant",
    loadChildren:
      "./content/complaint-software/complaint-software.module#ComplaintSoftwareModule",
    //  canActivate: [AuthGuardService],
  },
  {
    path: "newspaper",
    loadChildren:
      "./content/newspaper/newspaper.module#NewspaperModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "camparative",
    loadChildren:
      "./content/camparetive/camparetive.module#CamparetiveModule",
    canActivate: [AuthGuardService],
  },
  {
    path: "department-website",
    loadChildren:
      "./content/department-website/department-website.module#DepartmentWebsiteModule",
    canActivate: [AuthGuardService],
  }
  ,
  {
    path: "tender-press-release",
    loadChildren:
      "./content/vendor-press-release/tender-press-release.module#VendorPressReleaseModule",
    canActivate: [AuthGuardService],

  }
  , { path: "**", component: PageNotFoundComponent }, // For LiveTesst login

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: "enabled", preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
