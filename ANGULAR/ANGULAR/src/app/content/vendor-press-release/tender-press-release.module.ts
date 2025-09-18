import { AngularEditorModule } from '@kolkov/angular-editor';
// import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TenderPressReleaseRoutingModule } from './tender-press-release-routing.module';
import { PressReleaseComponent } from './press-release/press-release.component';
import { TendorComponent } from './tendor/tendor.component';
import { AppMaterialModule } from 'src/app/Shared/app-material/app-material.module';
import { AddupdatePressReleaseComponent } from './press-release/addupdate-press-release/addupdate-press-release.component';
import { AddupdateTenderComponent } from './tendor/addupdate-tender/addupdate-tender.component';
import { SchemeModule } from '../scheme/scheme.module';
import { TenderProgressDialogComponent } from './tendor/tender-progress-dialog/tender-progress-dialog.component';
import { TenderDetailComponent } from './tendor/tender-detail/tender-detail.component';
import { PressReleaseUserConfigrationComponent } from './press-release-user-configration/press-release-user-configration.component';
import { AddupdateUserConfigrationComponent } from './press-release-user-configration/addupdate-user-configration/addupdate-user-configration.component';
import { NgModule } from '@angular/core';
import { PressReleaseSubjectPasswordDialogComponent } from './press-release/press-release-subject-password-dialog/press-release-subject-password-dialog.component';
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


@NgModule({
  declarations: [PressReleaseComponent, TendorComponent, AddupdatePressReleaseComponent, AddupdateTenderComponent, TenderProgressDialogComponent, TenderDetailComponent, PressReleaseUserConfigrationComponent, AddupdateUserConfigrationComponent, PressReleaseSubjectPasswordDialogComponent, PressReleasesCreatedByUsersComponent, PressReleaseCategorySubcategoryComponent, PressReleaseDeptCatSubcatComponent, PressReleaseLookupcategoryComponent, PressReleaseDepartmentLookupcategoryComponent, PressReleaseVipDepartmentComponent, PressReleaseDistCatSubcatComponent, PressReleaseDistLookupCategoryComponent, PressReleaseDepartmentDistrictComponent, PressReleaseVipDistrictComponent, PressReleaseVipDeptDistComponent, PressReleaseMasterReportComponent, PressReleaseUserDateComponent],
entryComponents:[TenderProgressDialogComponent,AddupdateUserConfigrationComponent,PressReleaseSubjectPasswordDialogComponent],
  imports: [
    CommonModule,
    TenderPressReleaseRoutingModule,
    AppMaterialModule,
    SchemeModule,
    AngularEditorModule

  ]
})
export class VendorPressReleaseModule { }
