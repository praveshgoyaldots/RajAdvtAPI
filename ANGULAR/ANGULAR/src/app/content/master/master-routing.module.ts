import { TransferdeptComponent } from './transferdept/transferdept.component';
import { HelpDocumentComponent } from "./help-document/help-document.component";
import { PageMasterComponent } from "./page-master/page-master.component";
import { DownlevelConfigurationComponent } from "./Permission/dashboard-permission/downlevel-configuration/downlevel-configuration.component";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { SectorComponent } from "./sector/sector.component";
import { LookupComponent } from "./lookup/lookup.component";
import { ModeOfDeliveryComponent } from "./mode-of-delivery/mode-of-delivery.component";
import { UserComponent } from "./user/user.component";
import { UpdateUserComponent } from "./user/update-user/update-user.component";
import { AddUserComponent } from "./user/add-user/add-user.component";
import { DetailUserComponent } from "./user/detail-user/detail-user.component";
import { LookupTypeComponent } from "./lookup-type/lookup-type.component";
import { AdvertisementCategoryComponent } from "./advertisement-category/advertisement-category.component";
import { AdvertisementSubCategoryComponent } from "./advertisement-sub-category/advertisement-sub-category.component";
import { PlatformComponent } from "./platform/platform.component";
import { AdvNotificationComponent } from "./adv-notification/adv-notification.component";
import { AddupdateAdvNotificationComponent } from "./adv-notification/addupdate-adv-notification/addupdate-adv-notification.component";
import { AdvApprovalDetailComponent } from "./adv-approval-detail/adv-approval-detail.component";
import { AddupdateApprovalDetailComponent } from "./adv-approval-detail/addupdate-approval-detail/addupdate-approval-detail.component";
import { UserDefaultPermissionComponent } from "./Permission/user-default-permission/user-default-permission.component";
import { SchemeTypeComponent } from "./scheme-type/scheme-type.component";
import { SchemeOutputComponent } from "./scheme-output/scheme-output.component";
import { SchemeBeneficialCategoryComponent } from "./scheme-beneficial-category/scheme-beneficial-category.component";
import { SchemeCategoryComponent } from "./scheme-category/scheme-category.component";
import { SchemeUploadFileComponent } from "./scheme-upload-file/scheme-upload-file.component";
import { SchemeRequiredDocumentCategoryComponent } from "./scheme-required-document-category/scheme-required-document-category.component";
import { SchemeCommonComponent } from "./scheme-common/scheme-common.component";
import { DashboardPermissionComponent } from "./Permission/dashboard-permission/dashboard-permission.component";
import { SelfConfigurationComponent } from "./Permission/dashboard-permission/self-configuration/self-configuration.component";
import { NotificationEmailTemplatesComponent } from "./notification-email-templates/notification-email-templates.component";
import { AddUpdateEmailComponent } from "./notification-email-templates/add-update-email/add-update-email.component";
import { NotificationSmsTemplatesComponent } from "./notification-sms-templates/notification-sms-templates.component";
import { AddUpdateSmsComponent } from "./notification-sms-templates/add-update-sms/add-update-sms.component";
import { NotificationTemplateTypeComponent } from "./notification-template-type/notification-template-type.component";
import { OfficeComponent } from "./office/office.component";
import { AddOfficeComponent } from "./office/add-office/add-office.component";
import { UpdateOfficeComponent } from "./office/update-office/update-office.component";
import { DetailOfficeComponent } from "./office/detail-office/detail-office.component";
import { AddUpdatePageMasterComponent } from "./page-master/add-update-page-master/add-update-page-master.component";
import { SpecificUserPermissionComponent } from "./Permission/specific-user-permission/specific-user-permission.component";
import { MonitoringParameterMasterComponent } from "./monitoring-parameter-master/monitoring-parameter-master.component";
import { MonitoringParameterLookupComponent } from "./monitoring-parameter-lookup/monitoring-parameter-lookup.component";
import { ClientIdForServiceComponent } from "./client-id-for-service/client-id-for-service.component";
import { GovermentAchivementComponent } from "./goverment-achivement/goverment-achivement.component";
import { AddUpdateGovermentAchivementComponent } from "./goverment-achivement/add-update-goverment-achivement/add-update-goverment-achivement.component";
import { CitizenLetterTypeComponent } from "./citizen-letter-type/citizen-letter-type.component";
import { DepartmentSetupComponent } from "./department-setup/department-setup.component";
import { DepartmentSetupAddEditComponent } from "./department-setup/department-setup-add-edit/department-setup-add-edit.component";
import { DepartmentAuthoritySignatoryComponent } from "./department-authority-signatory/department-authority-signatory.component";
import { DepartmentAuthoritySignatoryAddEditComponent } from "./department-authority-signatory/department-authority-signatory-add-edit/department-authority-signatory-add-edit.component";
import { DepartmentReferenceComponent } from "./department-reference/department-reference.component";
import { DepartmentReferenceAddEditComponent } from "./department-reference/department-reference-add-edit/department-reference-add-edit.component";
import { AddLetterTypeComponent } from "./citizen-letter-type/add-letter-type/add-letter-type.component";
import { UpdateLetterTypeComponent } from "./citizen-letter-type/update-letter-type/update-letter-type.component";
import { DetailLetterTypeComponent } from "./citizen-letter-type/detail-letter-type/detail-letter-type.component";
import { CitizenAttachmentComponent } from "./citizen-attachment/citizen-attachment.component";
import { AddCitizenAttachmentComponent } from "./citizen-attachment/add-citizen-attachment/add-citizen-attachment.component";
import { UpdateCitizenAttachmentComponent } from "./citizen-attachment/update-citizen-attachment/update-citizen-attachment.component";
import { DetailCitizenAttachmentComponent } from "./citizen-attachment/detail-citizen-attachment/detail-citizen-attachment.component";
import { AchievementCategoryMasterComponent } from "./achievement-category-master/achievement-category-master.component";
import { AchievementSubCategoryMasterComponent } from "./achievement-sub-category-master/achievement-sub-category-master.component";
import { CCCategoryComponent } from "./cccategory/cccategory.component";
import { OrderSubtypeMasterComponent } from "./order-subtype-master/order-subtype-master.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { AddUpdateGalleryComponent } from "./gallery/add-update-gallery/add-update-gallery.component";
import { GalleryDetailComponent } from "./gallery/gallery-detail/gallery-detail.component";
import { AdminDepartmentComponent } from "./admin-department/admin-department.component";
import { DepartmentMasterComponent } from "./department-master/department-master.component";
import { MapCcCategoryToReferenceComponent } from "./cccategory/map-cc-category-to-reference/map-cc-category-to-reference.component";
import { UserNotificationComponent } from "./user/user-notification/user-notification.component";
import { AddUpdateDepartmentComponent } from "./department-master/add-update-department/add-update-department.component";
import { CancellationReasonComponent } from "./cancellation-reason/cancellation-reason.component";
import { ImportantDecisionComponent } from "./important-decision/important-decision.component";
import { DetailImportantDecisionComponent } from "./important-decision/detail-important-decision/detail-important-decision.component";
import { AddupdateImportantDecisionComponent } from "./important-decision/addupdate-important-decision/addupdate-important-decision.component";
import { ImportantdecisionsubcategorymasterComponent } from "./importantdecisionsubcategorymaster/importantdecisionsubcategorymaster.component";
import { AddUpdateImportantDicisionSubCategoryMasterComponent } from "./importantdecisionsubcategorymaster/add-update-important-dicision-sub-category-master/add-update-important-dicision-sub-category-master.component";
import { JankalyanlogSummaryReportComponent } from "./jankalyanlog-summary-report/jankalyanlog-summary-report.component";
import { JankalyanlogDetailReportComponent } from "./jankalyanlog-detail-report/jankalyanlog-detail-report.component";
import { ImpDecSummaryReportComponent } from "./important-decision/imp-dec-summary-report/imp-dec-summary-report.component";
import { ImportantDecisionDepartmentReportComponent } from "./important-decision/important-decision-department-report/important-decision-department-report.component";
import { DepartmentUserProfileComponent } from './department-master/department-user-profile/department-user-profile.component';
import { DepartmentUserProfileUpdateComponent } from './department-master/department-user-profile-update/department-user-profile-update.component';
import { ImportantDecisionDetailReportComponent } from './important-decision/important-decision-detail-report/important-decision-detail-report.component';
import { DepartmentProfileComponent } from './department-master/department-profile/department-profile.component';
import { DepartmentProfileAddUpdateComponent } from './department-master/department-profile/department-profile-add-update/department-profile-add-update.component';
import { JankalyanEntryMasterComponent } from './jankalyan-entry-master/jankalyan-entry-master.component';
import { AddUpdateJankalyanEntryMasterComponent } from './jankalyan-entry-master/add-update-jankalyan-entry-master/add-update-jankalyan-entry-master.component';
import { DepartmentContactDetailsComponent } from './department-contact-details/department-contact-details.component';
import { DptContactDetailsAddUpdateComponent } from './department-contact-details/dpt-contact-details-add-update/dpt-contact-details-add-update.component';
import { AddUpdateDesignationMasterComponent } from './designation-master/add-update-designation-master/add-update-designation-master.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { JankalyanSummeryReportforallModuleComponent } from './jankalyan-summery-reportforall-module/jankalyan-summery-reportforall-module.component';
import { SendStatusEmailComponent } from './send-status-email/send-status-email.component';
import { UpdateUserProfileComponent } from './user/update-user-profile/update-user-profile.component';
import { JankalyanCategoryMasterComponent } from './jankalyan-category-master/jankalyan-category-master.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { ChiefMinisterProfileComponent } from './chief-minister-profile/chief-minister-profile.component';
import { AddUpdateChiefMinisterProfileComponent } from './chief-minister-profile/add-update-chief-minister-profile/add-update-chief-minister-profile.component';
import { DetailChiefMinisterProfileComponent } from './chief-minister-profile/detail-chief-minister-profile/detail-chief-minister-profile.component';
import { ProjectMasterComponent } from './project-master/project-master.component';
import { AddUpdateProjectMasterComponent } from './project-master/add-update-project-master/add-update-project-master.component';
import { VcParticipantCategoryMasterComponent } from './vc-participant-category-master/vc-participant-category-master.component';
import { ProjectSubCategoryComponent } from './project-sub-category/project-sub-category.component';
import { ProjectCategoryMasterComponent } from './project-category-master/project-category-master.component';
import { ProjectMileStoneComponent } from './project-mile-stone/project-mile-stone.component';
import { NewsClassificationMasterComponent } from './news-classification-master/news-classification-master.component';
import { NewsSubjectMasterComponent } from './news-subject-master/news-subject-master.component';
import { NewsNewspaperMasterComponent } from './news-newspaper-master/news-newspaper-master.component';
import { MLAContituencyMasterComponent } from './mlacontituency-master/mlacontituency-master.component';
import { ProjectSubSubCategoryMasterComponent } from './project-sub-sub-category-master/project-sub-sub-category-master.component';
import { ProjectSchemeCategoryComponent } from './project-scheme-category/project-scheme-category.component';
import { ProjectMasterReportComponent } from './project-master/project-master-report/project-master-report.component';
import { MpconstituencyMasterComponent } from './mpconstituency-master/mpconstituency-master.component';
import { ChildPageMasterComponent } from './child-page-master/child-page-master.component';
import { ChildPageMasterAddUpdateComponent } from './child-page-master/child-page-master-add-update/child-page-master-add-update.component';
import { CMISSummaryReportComponent } from './cmis-summary-report/cmis-summary-report.component';
import { CmisDetailReportComponent } from './cmis-summary-report/cmis-detail-report/cmis-detail-report.component';
import { ProjectSummaryReportComponent } from './project-master/project-summary-report/project-summary-report.component';
import { ProjectDynamicLabelSummaryReportComponent } from './project-master/project-dynamic-label-summary-report/project-dynamic-label-summary-report.component';
import { DepartmentWiseProjectSummaryReportComponent } from './project-master/department-wise-project-summary-report/department-wise-project-summary-report.component';
import { WebServiceMasterDataComponent } from './web-service-master-data/web-service-master-data.component';
import { CmisComplianceReportComponent } from './cmis-compliance-report/cmis-compliance-report.component';
import { CmisAchievementDetailReportComponent } from './cmis-achievement-detail-report/cmis-achievement-detail-report.component';
import { CmisAchievementSummaryReportComponent } from './cmis-achievement-summary-report/cmis-achievement-summary-report.component';
import { CmisComplianceDptModuleSummaryReportComponent } from './cmis-compliance-dpt-module-summary-report/cmis-compliance-dpt-module-summary-report.component';
import { HelpDocumentTypeMasterComponent } from './help-document-type-master/help-document-type-master.component';
import { AddUpdateAchievementCategoryMasterComponent } from './achievement-category-master/add-update-achievement-category-master/add-update-achievement-category-master.component';
import { OrderTypeMasterComponent } from './order-type-master/order-type-master.component';
import { AddUpdateOrderTypeMasterComponent } from './order-type-master/add-update-order-type-master/add-update-order-type-master.component';
import { JanCategoryAddUpdateDialogComponent } from './jankalyan-category-master/jan-category-add-update-dialog/jan-category-add-update-dialog.component';
import { ChiranjeeviTestimonialComponent } from './chiranjeevi-testimonial/chiranjeevi-testimonial.component';
import { ProjectMasterDetailComponent } from './project-master/project-master-detail/project-master-detail.component';
import { ComplianceNoOfEntryInJankalyanComponent } from './compliance-no-of-entry-in-jankalyan/compliance-no-of-entry-in-jankalyan.component';
import { NoOfComplianceComponent } from './no-of-compliance/no-of-compliance.component';
import { ProjectDepartmentStatusSummaryReportComponent } from './project-master/project-department-status-summary-report/project-department-status-summary-report.component';
import { BeneficiaryCategoryMasterComponent } from './beneficiary-category-master/beneficiary-category-master.component';
import { AddupdateBeneficiaryCategoryMasterComponent } from './beneficiary-category-master/addupdate-beneficiary-category-master/addupdate-beneficiary-category-master.component';
import { AddUpdateJanConfigurationComponent } from './jankalyan-configuration-master/add-update-jan-configuration/add-update-jan-configuration.component';
import { JankalyanConfigurationMasterComponent } from './jankalyan-configuration-master/jankalyan-configuration-master.component';

const routes: Routes = [
  {
    path: "",
    component: SectorComponent,
  },

  {
    path: "sector",
    component: SectorComponent,
  },
  {
    path: "lookup",
    component: LookupComponent,
  },
  {
    path: "lookup/:id",
    component: LookupComponent,
  },
  {
    path: "usertype",
    component: UserTypeComponent,
  },
  {
    path: "usertype/:id",
    component: UserTypeComponent,
  },
  // {
  //   path: 'modeofdel',
  //   component: ModeOfDeliveryComponent
  // },
  {
    path: "user",
    component: UserComponent,
  },
  {
    path: "user/add",
    component: AddUserComponent,
  },
  {
    path: "user/update/:id",
    component: UpdateUserComponent,
  },
  {
    path: "user/detail/:id",
    component: DetailUserComponent,
  },
  {
    path: "permission/userdefaultpermission",
    component: UserDefaultPermissionComponent,
  },
  {
    path: "permission/userspecificpermission",
    component: SpecificUserPermissionComponent,
  },
  {
    path: "lookupType",
    component: LookupTypeComponent,
  },
  {
    path: "modeofdelivery",
    component: ModeOfDeliveryComponent,
  },
  {
    path: "advertisementCategory",
    component: AdvertisementCategoryComponent,
  },
  {
    path: "advertisementSubCategory",
    component: AdvertisementSubCategoryComponent,
  },
  {
    path: "platform",
    component: PlatformComponent,
  },
  {
    path: "advnotification",
    component: AdvNotificationComponent,
  },
  {
    path: "advAddUpdatenotification",
    component: AddupdateAdvNotificationComponent,
  },
  {
    path: "advAddUpdatenotification/:id",
    component: AddupdateAdvNotificationComponent,
  },
  {
    path: "advapprovaldetail",
    component: AdvApprovalDetailComponent,
  },
  {
    path: "advAddUpdateapprovaldetail",
    component: AddupdateApprovalDetailComponent,
  },
  {
    path: "advAddUpdateapprovaldetail/:id",
    component: AddupdateApprovalDetailComponent,
  },
  {
    path: "permission/userdefaultpermission",
    component: UserDefaultPermissionComponent,
  },
  {
    path: "permission/dashboardpermission",
    component: DashboardPermissionComponent,
  },
  {
    path: "advertisementSubCategory",
    component: AdvertisementSubCategoryComponent,
  },
  {
    path: "permission/selfconfiguration",
    component: SelfConfigurationComponent,
  },
  {
    path: "permission/downlevelconfiguration",
    component: DownlevelConfigurationComponent,
  },
  {
    path: "schemetype",
    component: SchemeTypeComponent,
  },
  {
    path: "schemeoutput",
    component: SchemeOutputComponent,
  },
  {
    path: "schemebeneficialcategory",
    component: SchemeBeneficialCategoryComponent,
  },
  {
    path: "schemecategory",
    component: SchemeCategoryComponent,
  },
  {
    path: "schemeuploadfilecategory",
    component: SchemeUploadFileComponent,
  },
  {
    path: "schemerequireddocumentcategory",
    component: SchemeRequiredDocumentCategoryComponent,
  },
  {
    path: "schemecommonmaster",
    component: SchemeCommonComponent,
  },
  {
    path: "office",
    component: OfficeComponent,
  },
  {
    path: "office/add",
    component: AddOfficeComponent,
  },
  {
    path: "office/update/:id",
    component: UpdateOfficeComponent,
  },
  {
    path: "office/detail/:id",
    component: DetailOfficeComponent,
  },
  {
    path: "emailtemplates",
    component: NotificationEmailTemplatesComponent,
  },
  {
    path: "emailtemplates/add/:id",
    component: AddUpdateEmailComponent,
  },
  {
    path: "emailtemplates/add",
    component: AddUpdateEmailComponent,
  },
  {
    path: "smstemplates",
    component: NotificationSmsTemplatesComponent,
  },
  {
    path: "smstemplates/add/:id",
    component: AddUpdateSmsComponent,
  },
  {
    path: "smstemplates/add",
    component: AddUpdateSmsComponent,
  },
  {
    path: "templatestypes",
    component: NotificationTemplateTypeComponent,
  },
  {
    path: "pagemaster",
    component: PageMasterComponent,
  },
  {
    path: "pagemaster/add",
    component: AddUpdatePageMasterComponent,
  },
  {
    path: "pagemaster/update/:pagecode",
    component: AddUpdatePageMasterComponent,
  },
  {
    path: "helpdocument",
    component: HelpDocumentComponent,
  },
  {
    path: "monitoringparametermaster",
    component: MonitoringParameterMasterComponent,
  },
  {
    path: "monitoringparameterlookup",
    component: MonitoringParameterLookupComponent,
  },
  {
    path: "createclient",
    component: ClientIdForServiceComponent,
  },
  {
    path: "GenerateAchivement",
    component: GovermentAchivementComponent,
  },
  {
    path: "AddupdateGenerateAchivement",
    component: AddUpdateGovermentAchivementComponent,
  },
  {
    path: "AddupdateGenerateAchivement/:id",
    component: AddUpdateGovermentAchivementComponent,
  },
  {
    path: "departmentsetup",
    component: DepartmentSetupComponent,
  },
  {
    path: "departmentsetupadd",
    component: DepartmentSetupAddEditComponent,
  },
  {
    path: "departmentsetupadd/:id",
    component: DepartmentSetupAddEditComponent,
  },
  {
    path: "projectmaster",
    component: ProjectMasterComponent,
  },
  {
    path: "projectmasteradd",
    component: AddUpdateProjectMasterComponent,
  },
  {
    path: "projectmasteradd/:id",
    component: AddUpdateProjectMasterComponent,
  },
  {
    path: "projectmasterdetail/:id",
    component: ProjectMasterDetailComponent,
  },
  {
    path: "projectmasterdetailReport/:id/:report",
    component: ProjectMasterDetailComponent,
  },
  {
    path: "departmentauthoritysignatory",
    component: DepartmentAuthoritySignatoryComponent,
  },
  {
    path: "departmentauthoritysignatoryadd",
    component: DepartmentAuthoritySignatoryAddEditComponent,
  },
  {
    path: "departmentauthoritysignatoryadd/:id",
    component: DepartmentAuthoritySignatoryAddEditComponent,
  },
  {
    path: "departmentreference",
    component: DepartmentReferenceComponent,
  },
  {
    path: "departmentreferenceadd",
    component: DepartmentReferenceAddEditComponent,
  },
  {
    path: "departmentreferenceadd/:id",
    component: DepartmentReferenceAddEditComponent,
  },
  {
    path: "citizen-letter-type",
    component: CitizenLetterTypeComponent,
  },
  {
    path: "citizen-letter-type/add",
    component: AddLetterTypeComponent,
  },
  {
    path: "citizen-letter-type/update/:id",
    component: UpdateLetterTypeComponent,
  },
  {
    path: "citizen-letter-type/detail/:id",
    component: DetailLetterTypeComponent,
  },
  {
    path: "citizen-attachment",
    component: CitizenAttachmentComponent,
  },
  {
    path: "citizen-attachment/add",
    component: AddCitizenAttachmentComponent,
  },
  {
    path: "citizen-attachment/update/:id",
    component: UpdateCitizenAttachmentComponent,
  },
  {
    path: "citizen-attachment/detail/:id",
    component: DetailCitizenAttachmentComponent,
  },
  {
    path: "achievement-category",
    component: AchievementCategoryMasterComponent,
  },
  {
    path: "achievement-category/add",
    component: AddUpdateAchievementCategoryMasterComponent,
  },
  {
    path: "achievement-category/update/:id",
    component: AddUpdateAchievementCategoryMasterComponent,
  },
  {
    path: "achievement-sub-category",
    component: AchievementSubCategoryMasterComponent,
  },
  {
    path: "cc-category",
    component: CCCategoryComponent,
  },
  {
    path: "cc-category-mapping",
    component: MapCcCategoryToReferenceComponent,
  },
  {
    path: "orderSubtype",
    component: OrderSubtypeMasterComponent,
  },
  {
    path: "orderSubtype/:id",
    component: OrderSubtypeMasterComponent,
  },
  {
    path: "AdminDepartment",
    component: AdminDepartmentComponent,
  },
  {
    path: "AdminDepartment/:id",
    component: AdminDepartmentComponent,
  },
  {
    path: "DepartmentMaster",
    component: DepartmentMasterComponent,
  },
  {
    path: "DepartmentMasteradd",
    component: AddUpdateDepartmentComponent,
  },
  {
    path: "DepartmentMasteradd/:id",
    component: AddUpdateDepartmentComponent,
  },
  {
    path: "gallery",
    component: GalleryComponent,
  },
  {
    path: "gallery/add",
    component: AddUpdateGalleryComponent,
  },
  {
    path: "gallery/update/:id",
    component: AddUpdateGalleryComponent,
  },
  {
    path: "gallery/detail/:id",
    component: GalleryDetailComponent,
  },
  {
    path: "usernotification",
    component: UserNotificationComponent,
  },
  {
    path: "cancellationreason",
    component: CancellationReasonComponent,
  },
  {
    path: "ImportantDecision",
    component: ImportantDecisionComponent,
  },

  {
    path: "ImportantDecision/detail/:id",
    component: DetailImportantDecisionComponent,
  },
  {
    path: "ImportantDecision/add-ImportantDecision",
    component: AddupdateImportantDecisionComponent,
  },
  {
    path: "ImportantDecision/update-ImportantDecision/:id",
    component: AddupdateImportantDecisionComponent,
  },

  {
    path: "ImportantDecision/update-ImportantDecisionComment/:id",
    component: AddupdateImportantDecisionComponent,
  },

  {
    path: "Impdecsubcat",
    component: ImportantdecisionsubcategorymasterComponent,
  },
  {
    path: "Impdecsubcat/:id",
    component: AddUpdateImportantDicisionSubCategoryMasterComponent,
  },
  {
    path: "jankalyanlogsummaryreport",
    component: JankalyanlogSummaryReportComponent,
  },
  {
    path: "jankalyansummaryreport",
    component: JankalyanSummeryReportforallModuleComponent,
  },
  {
    path: "jankalyanlogdetailtreport",
    component: JankalyanlogDetailReportComponent,
  },
  {
    path: "impdecsummaryreport/jankalyanlogdetailtreport/:dept",
    component: JankalyanlogDetailReportComponent,
  },
  {
    path: "impdecsummaryreport",
    component: ImpDecSummaryReportComponent,
  }
  ,
  {
    path: "impdecsummaryreport/:dept",
    component: ImpDecSummaryReportComponent,
  },
  {
    path: "impdecdepartmentcountreport",
    component: ImportantDecisionDepartmentReportComponent,
  },
  {
    path: "departmentprofilelist",
    component: DepartmentUserProfileComponent,
  },
  {
    path: "departmentprofileupdate/:id",
    component: DepartmentUserProfileUpdateComponent,
  },
  {
    path: "importantdecisionDetailreport",
    component: ImportantDecisionDetailReportComponent,
  },
  {
    path: "JankalyanEntryType",
    component: JankalyanEntryMasterComponent,
  },
  {
    path: "JankalyanEntryType/add",
    component: AddUpdateJankalyanEntryMasterComponent,
  },
  {
    path: "JankalyanEntryType/update/:id",
    component: AddUpdateJankalyanEntryMasterComponent,
  },
  {
    path: "designationmaster",
    component: DesignationMasterComponent,
  },
  {
    path: "designationmaster/add",
    component: AddUpdateDesignationMasterComponent,
  },
  {
    path: "designationmaster/update/:id",
    component: AddUpdateDesignationMasterComponent,
  }
  ,
  {
    path: "beneficiary-category-master",
    component: BeneficiaryCategoryMasterComponent,
  },
  {
    path: "beneficiary-category-master/add",
    component: AddupdateBeneficiaryCategoryMasterComponent,
  },
  {
    path: "beneficiary-category-master/update/:id",
    component: AddupdateBeneficiaryCategoryMasterComponent,
  },
  {
    path: "dptprofilelist",
    component: DepartmentProfileComponent,
  },
  {
    path: "dptprofileaddupdate",
    component: DepartmentProfileAddUpdateComponent,
  }, {
    path: "dptprofileaddupdate/:id",
    component: DepartmentProfileAddUpdateComponent,
  },
  {
    path: "dptcontactdetails",
    component: DepartmentContactDetailsComponent,
  },
  {
    path: "dptcontactdetailsaddupdate",
    component: DptContactDetailsAddUpdateComponent,
  },
  {
    path: "dptcontactdetailsaddupdate/:id",
    component: DptContactDetailsAddUpdateComponent,
  },
  {
    path: "sendemailstatus",
    component: SendStatusEmailComponent,
  }
  ,
  {
    path: "jancategorylist",
    component: JankalyanCategoryMasterComponent,
  },
  {
    path: "jancategorylist/add",
    component: JanCategoryAddUpdateDialogComponent,
  },
  {
    path: "jancategorylist/update/:id",
    component: JanCategoryAddUpdateDialogComponent,
  },

  {
    path: "chief-minister-profile",
    component: ChiefMinisterProfileComponent,
  },
  {
    path: "chief-minister-profile/add",
    component: AddUpdateChiefMinisterProfileComponent,
  },
  {
    path: "chief-minister-profile/update/:id",
    component: AddUpdateChiefMinisterProfileComponent,
  },
  {
    path: "chief-minister-profile/detail/:id",
    component: DetailChiefMinisterProfileComponent,
  }
  ,
  {
    path: "vc-participant-category",
    component: VcParticipantCategoryMasterComponent,
  }
  ,
  {
    path: "project-sub-category",
    component: ProjectSubCategoryComponent,
  },
  {
    path: "project-category",
    component: ProjectCategoryMasterComponent,
  },
  {
    path: "project-milestone",
    component: ProjectMileStoneComponent,
  },
  {
    path: "news-classification",
    component: NewsClassificationMasterComponent,
  }
  ,
  {
    path: "news-subject",
    component: NewsSubjectMasterComponent,
  },
  {
    path: "news-newspaper",
    component: NewsNewspaperMasterComponent,
  },
  {
    path: "mla-constituency",
    component: MLAContituencyMasterComponent,
  },
  {
    path: "project-sub-subcategory",
    component: ProjectSubSubCategoryMasterComponent,
  }
  ,
  {
    path: "project-scheme-category",
    component: ProjectSchemeCategoryComponent,
  }
  ,
  {
    path: "project-summary-report",
    component: ProjectSummaryReportComponent,
  },
  {
    path: "project-Dynamic-Label-summary-report",
    component: ProjectDynamicLabelSummaryReportComponent,
  },
  {
    path: "project-report",
    component: ProjectMasterReportComponent,
  },
  {
    path: "project-dpt-report",
    component: DepartmentWiseProjectSummaryReportComponent,
  },
  {
    path: "project-dpt-status-report",
    component: ProjectDepartmentStatusSummaryReportComponent,
  },
  {
    path: "project-report/:mlaCode",
    component: ProjectMasterReportComponent,
  },
  {
    path: "mp-constituency",
    component: MpconstituencyMasterComponent,
  },
  {
    path: "childpagemaster",
    component: ChildPageMasterComponent,
  },
  {
    path: "childpagemaster-addupdate",
    component: ChildPageMasterAddUpdateComponent,
  },
  {
    path: "childpagemaster-addupdate/:id",
    component: ChildPageMasterAddUpdateComponent,
  },
  {
    path: "cmis-summary-report",
    component: CMISSummaryReportComponent,
  },
  {
    path: "cmis-detail-report",
    component: CmisDetailReportComponent,
  },
  {
    path: "cmis-detail-report/:module/:dept",
    component: CmisDetailReportComponent,
  },
  {
    path: "cmis-detail-report/:id",
    component: CmisDetailReportComponent,
  },
  {
    path: "cmis-detail-report/:transCoreId",
    component: CmisDetailReportComponent,
  },
  {
    path: "transferdept",
    component: TransferdeptComponent,
  },
  {
    path: "web-service-data",
    component: WebServiceMasterDataComponent,
  },
  {
    path: "cmis-compliance",
    component: CmisComplianceReportComponent,
  }
  ,
  {
    path: "cmis-achievement-summary-report",
    component: CmisAchievementSummaryReportComponent,
  }
  ,
  {
    path: "cmis-achievement-detail-report",
    component: CmisAchievementDetailReportComponent,
  }
  ,
  {
    path: "cmis-achievement-detail-report/:dptCode",
    component: CmisAchievementDetailReportComponent,
  },
  {
    path: "cmis-dpt-module-summary-report",
    component: CmisComplianceDptModuleSummaryReportComponent,
  },
  {
    path: "help-document-type-master",
    component: HelpDocumentTypeMasterComponent,
  },
  {
    path: "order-Type-Master",
    component: OrderTypeMasterComponent,
  },
  {
    path: "order-Type-Master/add",
    component: AddUpdateOrderTypeMasterComponent,
  },
  {
    path: "order-Type-Master/update/:id",
    component: AddUpdateOrderTypeMasterComponent,
  },
  {
    path: "testimonial-list",
    component: ChiranjeeviTestimonialComponent,
  },
  {
    path: "no-of-entry-in-jankalyan/:dpt/:module/:dptCode/:moduleId/:status",
    component: ComplianceNoOfEntryInJankalyanComponent,
  },
  {
    path: "no-of-entry-in-jankalyan/:dpt/:module/:dptCode/:moduleId/:status/:expected",
    component: ComplianceNoOfEntryInJankalyanComponent,
  },
  {
    path: "no-of-ompliance/:dpt/:module/:dptCode/:moduleId/:status",
    component: NoOfComplianceComponent,
  },
  {
    path: "no-of-entry-in-jankalyan/:dpt/:module/:dptCode/:moduleId",
    component: ComplianceNoOfEntryInJankalyanComponent,
  },
  {
    path: "no-of-entry-in-jankalyan/:dpt/:module/:dptCode/:moduleId/:expected",
    component: ComplianceNoOfEntryInJankalyanComponent,
  },
  {
    path: "no-of-ompliance/:dpt/:module/:dptCode/:moduleId",
    component: NoOfComplianceComponent,
  },
  {
    path: "jan-configuraton-master",
    component: JankalyanConfigurationMasterComponent,
  },
  {
    path: "jan-configuraton-master/add",
    component: AddUpdateJanConfigurationComponent,
  },
  {
    path: "jan-configuraton-master/update/:id",
    component: AddUpdateJanConfigurationComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MasterRoutingModule { }
