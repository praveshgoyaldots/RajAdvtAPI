import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddupdatePressReleaseComponent } from './press-release/addupdate-press-release/addupdate-press-release.component';
import { PressReleaseComponent } from './press-release/press-release.component';
import { TendorComponent } from './tendor/tendor.component';
import { AddupdateTenderComponent } from './tendor/addupdate-tender/addupdate-tender.component';
import { TenderDetailComponent } from './tendor/tender-detail/tender-detail.component';
import { PressReleaseUserConfigrationComponent } from './press-release-user-configration/press-release-user-configration.component';
import { PressReleasesCreatedByUsersComponent } from './report/press-releases-created-by-users/press-releases-created-by-users.component';
import { PressReleaseCategorySubcategoryComponent } from './report/press-release-category-subcategory/press-release-category-subcategory.component';
import { PressReleaseDeptCatSubcatComponent } from './report/press-release-dept-cat-subcat/press-release-dept-cat-subcat.component';
import { PressReleaseLookupcategoryComponent } from './report/press-release-lookupcategory/press-release-lookupcategory.component';
import { PressReleaseDepartmentLookupcategoryComponent } from './report/press-release-department-lookupcategory/press-release-department-lookupcategory.component';
import { PressReleaseVipDepartmentComponent } from './report/press-release-vip-department/press-release-vip-department.component';
import { PressReleaseDistCatSubcatComponent } from './report/press-release-dist-cat-subcat/press-release-dist-cat-subcat.component';
import { PressReleaseDistLookupCategoryComponent } from './report/press-release-dist-lookup-category/press-release-dist-lookup-category.component';
import { PressReleaseDepartmentDistrictComponent } from './report/press-release-department-district/press-release-department-district.component';
import { PressReleaseVipDistrictComponent } from './report/press-release-vip-district/press-release-vip-district.component';
import { PressReleaseVipDeptDistComponent } from './report/press-release-vip-dept-dist/press-release-vip-dept-dist.component';
import { PressReleaseMasterReportComponent } from './press-release-master-report/press-release-master-report.component';
import { PressReleaseUserDateComponent } from './report/press-release-user-date/press-release-user-date.component';
const routes: Routes = [
  {
    path: "",
    component: PressReleaseComponent,
  },
  {
    path: "press-release",
    component: PressReleaseComponent,
  },

  {
    path: "press-release/add",
    component: AddupdatePressReleaseComponent,
  },
  {
    path: "press-release/update/:id",
    component: AddupdatePressReleaseComponent,
  },

  {
    path: "tendor",
    component: TendorComponent,
  },
  {
    path: "tendor/add",
    component: AddupdateTenderComponent,
  },
  {
    path: "tendor/update/:id",
    component: AddupdateTenderComponent,
  },
  {
    path: "tendor/Detail/:id",
    component: TenderDetailComponent,
  },
  {
    path: "user-configration",
    component: PressReleaseUserConfigrationComponent,
  },
  {
    path: "report/created-by-user",
    component: PressReleasesCreatedByUsersComponent
  },
  {
    path: "report/category-subcategory",
    component: PressReleaseCategorySubcategoryComponent
  },
  {
    path: "report/dept-cat-subcat",
    component: PressReleaseDeptCatSubcatComponent
  },
  {
    path: "report/lookupcategory",
    component: PressReleaseLookupcategoryComponent
  },
  {
    path: "report/department-lookupcat",
    component: PressReleaseDepartmentLookupcategoryComponent
  },
  {
    path: "report/vip-department",
    component: PressReleaseVipDepartmentComponent
  },
  {
    path: "report/dist-cat-subcat",
    component: PressReleaseDistCatSubcatComponent
  },
  {
    path: "report/dist-lookupcat",
    component: PressReleaseDistLookupCategoryComponent
  },
  {
    path: "report/department-district",
    component: PressReleaseDepartmentDistrictComponent
  },
  {
    path: "report/vip-district",
    component: PressReleaseVipDistrictComponent
  },
  {
    path: "report/vip-dept-dist",
    component: PressReleaseVipDeptDistComponent
  },
  {
    path: "report/user-date",
    component: PressReleaseUserDateComponent
  },
  {
    path: "report/master",
    component: PressReleaseMasterReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TenderPressReleaseRoutingModule { }
