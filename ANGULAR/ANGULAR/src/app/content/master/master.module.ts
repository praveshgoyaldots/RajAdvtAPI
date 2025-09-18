import { OfficeComponent } from "./office/office.component";
import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { MasterRoutingModule } from "./master-routing.module";
import { LookupComponent } from "./lookup/lookup.component";
import { ModeOfDeliveryComponent } from "./mode-of-delivery/mode-of-delivery.component";
import { ModeOfDeliveryDialogComponent } from "./mode-of-delivery/mode-of-delivery-dialog/mode-of-delivery-dialog.component";
import { SectorComponent } from "./sector/sector.component";
import { AppMaterialModule } from "src/app/Shared/app-material/app-material.module";
import { SectorDialogComponent } from "./sector/sector-dialog/sector-dialog.component";
import { UserComponent } from "./user/user.component";
import { AddUserComponent } from "./user/add-user/add-user.component";
import { UpdateUserComponent } from "./user/update-user/update-user.component";
import { DetailUserComponent } from "./user/detail-user/detail-user.component";
import { LookupTypeComponent } from "./lookup-type/lookup-type.component";
import { LookupTypeDialogComponent } from "./lookup-type/lookup-type-dialog/lookup-type-dialog.component";
import { AdvertisementCategoryComponent } from "./advertisement-category/advertisement-category.component";
import { AdvertisementCategoryDialogComponent } from "./advertisement-category/advertisement-category-dialog/advertisement-category-dialog.component";
import { AdvertisementSubCategoryComponent } from "./advertisement-sub-category/advertisement-sub-category.component";
import { AdvertisementSubCategoryDialogComponent } from "./advertisement-sub-category/advertisement-sub-category-dialog/advertisement-sub-category-dialog.component";
import { PlatformComponent } from "./platform/platform.component";
import { PlatformDialogComponent } from "./platform/platform-dialog/platform-dialog.component";
import { AdvNotificationComponent } from "./adv-notification/adv-notification.component";
import { AddupdateAdvNotificationComponent } from "./adv-notification/addupdate-adv-notification/addupdate-adv-notification.component";
import { AdvApprovalDetailComponent } from "./adv-approval-detail/adv-approval-detail.component";
import { AddupdateApprovalDetailComponent } from "./adv-approval-detail/addupdate-approval-detail/addupdate-approval-detail.component";
import { SchemeTypeComponent } from "./scheme-type/scheme-type.component";
import { SchemeBeneficialCategoryComponent } from "./scheme-beneficial-category/scheme-beneficial-category.component";
import { SchemeBeneficialCategoryDialogComponent } from "./scheme-beneficial-category/scheme-beneficial-category-dialog/scheme-beneficial-category-dialog.component";
import { SchemeOutputComponent } from "./scheme-output/scheme-output.component";
import { SchemeOutputDialogComponent } from "./scheme-output/scheme-output-dialog/scheme-output-dialog.component";
import { SchemeTypeDialogComponent } from "./scheme-type/scheme-type-dialog/scheme-type-dialog.component";
import { SchemeCategoryComponent } from "./scheme-category/scheme-category.component";
import { SchemeCategoryDialogComponent } from "./scheme-category/scheme-category-dialog/scheme-category-dialog.component";
import { SchemeUploadFileComponent } from "./scheme-upload-file/scheme-upload-file.component";
import { SchemeUploadFileDialogComponent } from "./scheme-upload-file/scheme-upload-file-dialog/scheme-upload-file-dialog.component";
import { SchemeRequiredDocumentCategoryComponent } from "./scheme-required-document-category/scheme-required-document-category.component";
import { SchemeRequiredDocumentCategoryDialogComponent } from "./scheme-required-document-category/scheme-required-document-category-dialog/scheme-required-document-category-dialog.component";
import { SchemeCommonComponent } from "./scheme-common/scheme-common.component";
import { SchemeCommonDialogComponent } from "./scheme-common/scheme-common-dialog/scheme-common-dialog.component";
import { DashboardPermissionComponent } from "./Permission/dashboard-permission/dashboard-permission.component";
import { DownlevelConfigurationComponent } from "./Permission/dashboard-permission/downlevel-configuration/downlevel-configuration.component";
import { SelfConfigurationComponent } from "./Permission/dashboard-permission/self-configuration/self-configuration.component";
import { AddUpdateEmailComponent } from "./notification-email-templates/add-update-email/add-update-email.component";
import { NotificationEmailTemplatesComponent } from "./notification-email-templates/notification-email-templates.component";
import { NotificationSmsTemplatesComponent } from "./notification-sms-templates/notification-sms-templates.component";
import { AddUpdateSmsComponent } from "./notification-sms-templates/add-update-sms/add-update-sms.component";
import { CKEditorModule } from "ng2-ckeditor";
import { NotificationTemplateTypeComponent } from "./notification-template-type/notification-template-type.component";
import { AddEditDialogComponent } from "./notification-template-type/add-edit-dialog/add-edit-dialog.component";
import { SchemeModule } from "../scheme/scheme.module";
import { PageMasterComponent } from "./page-master/page-master.component";
import { AddOfficeComponent } from "./office/add-office/add-office.component";
import { UpdateOfficeComponent } from "./office/update-office/update-office.component";
import { DetailOfficeComponent } from "./office/detail-office/detail-office.component";
import { UserDefaultPermissionComponent } from "./Permission/user-default-permission/user-default-permission.component";
import { AddUpdatePageMasterComponent } from "./page-master/add-update-page-master/add-update-page-master.component";
import { AddUpdateMenuMasterComponent } from "./page-master/add-update-menu-master/add-update-menu-master.component";
import { HelpDocumentComponent } from "./help-document/help-document.component";
import { UserPermissionService } from "src/app/Shared/Service/user-permission.service";
import { SpecificUserPermissionComponent } from "./Permission/specific-user-permission/specific-user-permission.component";
import { AppModule } from "src/app/app.module";
import { MonitoringParameterMasterComponent } from "./monitoring-parameter-master/monitoring-parameter-master.component";
import { MonitoringParameterMasterDialogComponent } from "./monitoring-parameter-master/monitoring-parameter-master-dialog/monitoring-parameter-master-dialog.component";
import { MonitoringParameterLookupComponent } from "./monitoring-parameter-lookup/monitoring-parameter-lookup.component";
import { MPDialogComponent } from "./monitoring-parameter-lookup/m-p-dialog/m-p-dialog.component";
import { MPTypeDialogComponent } from "./monitoring-parameter-lookup/m-p-type-dialog/m-p-type-dialog.component";
import { ClientIdForServiceComponent } from "./client-id-for-service/client-id-for-service.component";
import { GovermentAchivementComponent } from "./goverment-achivement/goverment-achivement.component";
import { LookupDialogComponent } from "./lookup/lookup-dialog/lookup-dialog.component";
import { AddUpdateGovermentAchivementComponent } from "./goverment-achivement/add-update-goverment-achivement/add-update-goverment-achivement.component";
import { CitizenLetterTypeComponent } from "./citizen-letter-type/citizen-letter-type.component";
import { AddLetterTypeComponent } from "./citizen-letter-type/add-letter-type/add-letter-type.component";
import { UpdateLetterTypeComponent } from "./citizen-letter-type/update-letter-type/update-letter-type.component";
import { DetailLetterTypeComponent } from "./citizen-letter-type/detail-letter-type/detail-letter-type.component";
import { DepartmentSetupComponent } from "./department-setup/department-setup.component";
import { DepartmentSetupAddEditComponent } from "./department-setup/department-setup-add-edit/department-setup-add-edit.component";
import { DepartmentAuthoritySignatoryComponent } from "./department-authority-signatory/department-authority-signatory.component";
import { DepartmentAuthoritySignatoryAddEditComponent } from "./department-authority-signatory/department-authority-signatory-add-edit/department-authority-signatory-add-edit.component";
import { DepartmentReferenceComponent } from "./department-reference/department-reference.component";
import { DepartmentReferenceAddEditComponent } from "./department-reference/department-reference-add-edit/department-reference-add-edit.component";
import { CitizenAttachmentComponent } from "./citizen-attachment/citizen-attachment.component";
import { AddCitizenAttachmentComponent } from "./citizen-attachment/add-citizen-attachment/add-citizen-attachment.component";
import { UpdateCitizenAttachmentComponent } from "./citizen-attachment/update-citizen-attachment/update-citizen-attachment.component";
import { DetailCitizenAttachmentComponent } from "./citizen-attachment/detail-citizen-attachment/detail-citizen-attachment.component";
import { AchievementCategoryMasterComponent } from "./achievement-category-master/achievement-category-master.component";
import { AddUpdateAchievementCategoryMasterComponent } from "./achievement-category-master/add-update-achievement-category-master/add-update-achievement-category-master.component";
import { AchievementSubCategoryMasterComponent } from "./achievement-sub-category-master/achievement-sub-category-master.component";
import { AddUpdateAchievementSubCategoryMasterComponent } from "./achievement-sub-category-master/add-update-achievement-sub-category-master/add-update-achievement-sub-category-master.component";
import { CCCategoryComponent } from "./cccategory/cccategory.component";
import { AddUpdateCccategoryComponent } from "./cccategory/add-update-cc-category/add-update-cc-category.component";
import { OrderSubtypeMasterComponent } from "./order-subtype-master/order-subtype-master.component";
import { AddUpdateOrdersubtypeComponent } from "./order-subtype-master/add-update-ordersubtype/add-update-ordersubtype.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { AddUpdateGalleryComponent } from "./gallery/add-update-gallery/add-update-gallery.component";
import { GalleryDetailComponent } from "./gallery/gallery-detail/gallery-detail.component";
import { AdminDepartmentComponent } from "./admin-department/admin-department.component";
import { AddUpdateAdminDepartmentComponent } from "./admin-department/add-update-admin-department/add-update-admin-department.component";
import { DepartmentMasterComponent } from "./department-master/department-master.component";
import { AddUpdateDepartmentComponent } from "./department-master/add-update-department/add-update-department.component";
import { MapCcCategoryToReferenceComponent } from "./cccategory/map-cc-category-to-reference/map-cc-category-to-reference.component";
import { UserNotificationComponent } from "./user/user-notification/user-notification.component";
import { CancellationReasonComponent } from "./cancellation-reason/cancellation-reason.component";
import { ReasonAddUpdateDialogComponent } from "./cancellation-reason/reason-add-update-dialog/reason-add-update-dialog.component";
import { ImportantDecisionComponent } from "./important-decision/important-decision.component";
import { AddupdateImportantDecisionComponent } from "./important-decision/addupdate-important-decision/addupdate-important-decision.component";
import { DetailImportantDecisionComponent } from "./important-decision/detail-important-decision/detail-important-decision.component";
import { ImportantdecisionsubcategorymasterComponent } from "./importantdecisionsubcategorymaster/importantdecisionsubcategorymaster.component";
import { AddUpdateImportantDicisionSubCategoryMasterComponent } from "./importantdecisionsubcategorymaster/add-update-important-dicision-sub-category-master/add-update-important-dicision-sub-category-master.component";
import { JankalyanlogSummaryReportComponent } from './jankalyanlog-summary-report/jankalyanlog-summary-report.component';
import { JankalyanlogDetailReportComponent } from './jankalyanlog-detail-report/jankalyanlog-detail-report.component';
import { ImpDecSummaryReportComponent } from './important-decision/imp-dec-summary-report/imp-dec-summary-report.component';
import { ImportantDecisionDepartmentReportComponent } from './important-decision/important-decision-department-report/important-decision-department-report.component';
import { DepartmentUserProfileComponent } from './department-master/department-user-profile/department-user-profile.component';
import { DepartmentUserProfileUpdateComponent } from './department-master/department-user-profile-update/department-user-profile-update.component';
import { ImportantDecisionDetailReportComponent } from './important-decision/important-decision-detail-report/important-decision-detail-report.component';
import { DepartmentProfileComponent } from './department-master/department-profile/department-profile.component';
import { DepartmentProfileAddUpdateComponent } from './department-master/department-profile/department-profile-add-update/department-profile-add-update.component';
import { JankalyanEntryMasterComponent } from './jankalyan-entry-master/jankalyan-entry-master.component';
import { AddUpdateJankalyanEntryMasterComponent } from './jankalyan-entry-master/add-update-jankalyan-entry-master/add-update-jankalyan-entry-master.component';
import { DepartmentContactDetailsComponent } from './department-contact-details/department-contact-details.component';
import { DptContactDetailsAddUpdateComponent } from './department-contact-details/dpt-contact-details-add-update/dpt-contact-details-add-update.component';
import { DesignationMasterComponent } from './designation-master/designation-master.component';
import { AddUpdateDesignationMasterComponent } from './designation-master/add-update-designation-master/add-update-designation-master.component';
import { JankalyanSummeryReportforallModuleComponent } from './jankalyan-summery-reportforall-module/jankalyan-summery-reportforall-module.component';
import { SendStatusEmailComponent } from './send-status-email/send-status-email.component';
import { UpdateUserProfileComponent } from './user/update-user-profile/update-user-profile.component';
import { JankalyanCategoryMasterComponent } from './jankalyan-category-master/jankalyan-category-master.component';
import { JanCategoryAddUpdateDialogComponent } from './jankalyan-category-master/jan-category-add-update-dialog/jan-category-add-update-dialog.component';
import { UserTypeComponent } from './user-type/user-type.component';
import { AddUpdateUsertypeComponent } from './user-type/add-update-usertype/add-update-usertype.component';
import { ChiefMinisterProfileComponent } from './chief-minister-profile/chief-minister-profile.component';
import { AddUpdateChiefMinisterProfileComponent } from './chief-minister-profile/add-update-chief-minister-profile/add-update-chief-minister-profile.component';
import { DetailChiefMinisterProfileComponent } from './chief-minister-profile/detail-chief-minister-profile/detail-chief-minister-profile.component';
import { ProjectMasterComponent } from './project-master/project-master.component';
import { AddUpdateProjectMasterComponent } from './project-master/add-update-project-master/add-update-project-master.component';
import { VcParticipantCategoryMasterComponent } from './vc-participant-category-master/vc-participant-category-master.component';
import { VcParticipantAddUpdateDialogComponent } from './vc-participant-category-master/vc-participant-add-update-dialog/vc-participant-add-update-dialog.component';
import { ProjectSubCategoryComponent } from './project-sub-category/project-sub-category.component';
import { ProjectSubCategoryAddupdateDialogComponent } from './project-sub-category/project-sub-category-addupdate-dialog/project-sub-category-addupdate-dialog.component';
import { ProjectCategoryMasterComponent } from './project-category-master/project-category-master.component';
import { ProjectCategoryAddUpdateComponent } from './project-category-master/project-category-add-update/project-category-add-update.component';
import { ProjectMileStoneComponent } from './project-mile-stone/project-mile-stone.component';
import { ProjectMileStoneAddUpdateComponent } from './project-mile-stone/project-mile-stone-add-update/project-mile-stone-add-update.component';
import { UpdateProjectProgressComponent } from './project-master/update-project-progress/update-project-progress.component';
import { NewsClassificationMasterComponent } from './news-classification-master/news-classification-master.component';
import { NewsClassificationAddupdateComponent } from './news-classification-master/news-classification-addupdate/news-classification-addupdate.component';
import { NewsSubjectMasterComponent } from './news-subject-master/news-subject-master.component';
import { NewsSubjectAddupdateComponent } from './news-subject-master/news-subject-addupdate/news-subject-addupdate.component';
import { NewsNewspaperMasterComponent } from './news-newspaper-master/news-newspaper-master.component';
import { NewsNewspaperMasterAddupdateComponent } from './news-newspaper-master/news-newspaper-master-addupdate/news-newspaper-master-addupdate.component';
import { MLAContituencyMasterComponent } from './mlacontituency-master/mlacontituency-master.component';
import { MlaconstituencyAddUpdateComponent } from './mlacontituency-master/mlaconstituency-add-update/mlaconstituency-add-update.component';
import { ProjectSubSubCategoryMasterComponent } from './project-sub-sub-category-master/project-sub-sub-category-master.component';
import { ProjectSubSubCategoryAddUpdateComponent } from './project-sub-sub-category-master/project-sub-sub-category-add-update/project-sub-sub-category-add-update.component';
import { ProjectSchemeCategoryComponent } from './project-scheme-category/project-scheme-category.component';
import { ProjectSchemeCategoryAddupdateComponent } from './project-scheme-category/project-scheme-category-addupdate/project-scheme-category-addupdate.component';
import { ProjectMasterReportComponent } from './project-master/project-master-report/project-master-report.component';
import { MpconstituencyMasterComponent } from './mpconstituency-master/mpconstituency-master.component';
import { MpconstituencyAddUpdateComponent } from './mpconstituency-master/mpconstituency-add-update/mpconstituency-add-update.component';
import { ChildPageMasterComponent } from './child-page-master/child-page-master.component';
import { ChildPageMasterAddUpdateComponent } from './child-page-master/child-page-master-add-update/child-page-master-add-update.component';
import { CMISSummaryReportComponent } from './cmis-summary-report/cmis-summary-report.component';
import { CmisDetailReportComponent } from './cmis-summary-report/cmis-detail-report/cmis-detail-report.component';
import { ProjectSummaryReportComponent } from './project-master/project-summary-report/project-summary-report.component';
import { ProjectDynamicLabelSummaryReportComponent } from './project-master/project-dynamic-label-summary-report/project-dynamic-label-summary-report.component';
import { SubSubCategoryForDptDialogComponent } from './project-sub-sub-category-master/sub-sub-category-for-dpt-dialog/sub-sub-category-for-dpt-dialog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { TransferdeptComponent } from './transferdept/transferdept.component';
import { DepartmentListDialogComponent } from './user/department-list-dialog/department-list-dialog.component';
import { DepartmentWiseProjectSummaryReportComponent } from './project-master/department-wise-project-summary-report/department-wise-project-summary-report.component';
import { ProjectBudgetDialogComponent } from './project-master/project-budget-dialog/project-budget-dialog.component';
import { CmisComplianceComponent } from './cmis-summary-report/cmis-compliance/cmis-compliance.component';
import { WebServiceMasterDataComponent } from './web-service-master-data/web-service-master-data.component';
import { CmisComplianceReportComponent } from './cmis-compliance-report/cmis-compliance-report.component';
import { CmisAchievementSummaryReportComponent } from './cmis-achievement-summary-report/cmis-achievement-summary-report.component';
import { CmisAchievementDetailReportComponent } from './cmis-achievement-detail-report/cmis-achievement-detail-report.component';
import { CmisComplianceDptModuleSummaryReportComponent } from './cmis-compliance-dpt-module-summary-report/cmis-compliance-dpt-module-summary-report.component';
import { HelpDocumentTypeMasterComponent } from './help-document-type-master/help-document-type-master.component';
import { AddupdateHelpDocumentTypeMasterComponent } from './help-document-type-master/addupdate-help-document-type-master/addupdate-help-document-type-master.component';
import { OrderTypeMasterComponent } from './order-type-master/order-type-master.component';
import { AddUpdateOrderTypeMasterComponent } from './order-type-master/add-update-order-type-master/add-update-order-type-master.component';
import { ChiranjeeviTestimonialComponent } from './chiranjeevi-testimonial/chiranjeevi-testimonial.component';
import { UserSpecificPermissionDialogComponent } from './user/user-specific-permission-dialog/user-specific-permission-dialog.component';
import { DefaultPermissionDialogComponent } from './Permission/default-permission-dialog/default-permission-dialog.component';
import { MenuWiseDefaultPermissionDialogComponent } from './Permission/menu-wise-default-permission-dialog/menu-wise-default-permission-dialog.component';
import { ProjectMasterDetailComponent } from "./project-master/project-master-detail/project-master-detail.component";
import { ComplianceNoOfEntryInJankalyanComponent } from './compliance-no-of-entry-in-jankalyan/compliance-no-of-entry-in-jankalyan.component';
import { NoOfComplianceComponent } from './no-of-compliance/no-of-compliance.component';
import { ProjectDepartmentStatusSummaryReportComponent } from './project-master/project-department-status-summary-report/project-department-status-summary-report.component';
import { BeneficiaryCategoryMasterComponent } from './beneficiary-category-master/beneficiary-category-master.component';
import { AddupdateBeneficiaryCategoryMasterComponent } from './beneficiary-category-master/addupdate-beneficiary-category-master/addupdate-beneficiary-category-master.component';
import { JankalyanConfigurationMasterComponent } from './jankalyan-configuration-master/jankalyan-configuration-master.component';
import { AddUpdateJanConfigurationComponent } from './jankalyan-configuration-master/add-update-jan-configuration/add-update-jan-configuration.component';



@NgModule({
  declarations: [
    LookupComponent,
    ModeOfDeliveryComponent,
    ModeOfDeliveryDialogComponent,
    SectorComponent,
    SectorDialogComponent,
    UserComponent,
    AddUserComponent,
    UpdateUserComponent,
    DetailUserComponent,
    LookupComponent,
    LookupDialogComponent,
    ModeOfDeliveryComponent,
    ModeOfDeliveryDialogComponent,
    SectorComponent,
    SectorDialogComponent,
    LookupTypeComponent,
    LookupTypeDialogComponent,
    AdvertisementCategoryComponent,
    AdvertisementCategoryDialogComponent,
    AdvertisementSubCategoryComponent,
    AdvertisementSubCategoryDialogComponent,
    PlatformComponent,
    PlatformDialogComponent,
    AdvNotificationComponent,
    AddupdateAdvNotificationComponent,
    AdvApprovalDetailComponent,
    AddupdateApprovalDetailComponent,
    DashboardPermissionComponent,
    SchemeTypeComponent,
    SchemeTypeDialogComponent,
    SchemeBeneficialCategoryComponent,
    SchemeBeneficialCategoryDialogComponent,
    SchemeOutputComponent,
    SchemeOutputDialogComponent,
    SchemeCategoryComponent,
    SchemeCategoryDialogComponent,
    SchemeUploadFileComponent,
    SchemeUploadFileDialogComponent,
    SchemeRequiredDocumentCategoryComponent,
    SchemeRequiredDocumentCategoryDialogComponent,
    SchemeCommonComponent,
    SchemeCommonDialogComponent,
    DashboardPermissionComponent,
    DownlevelConfigurationComponent,
    SelfConfigurationComponent,
    AddUpdateEmailComponent,
    NotificationEmailTemplatesComponent,
    NotificationSmsTemplatesComponent,
    AddUpdateSmsComponent,
    NotificationTemplateTypeComponent,
    AddEditDialogComponent,
    PageMasterComponent,
    OfficeComponent,
    AddOfficeComponent,
    UpdateOfficeComponent,
    DetailOfficeComponent,
    UserDefaultPermissionComponent,
    AddUpdatePageMasterComponent,
    AddUpdateMenuMasterComponent,
    HelpDocumentComponent,
    SpecificUserPermissionComponent,
    MonitoringParameterMasterComponent,
    MonitoringParameterMasterDialogComponent,
    MonitoringParameterLookupComponent,
    MPDialogComponent,
    MPTypeDialogComponent,
    ClientIdForServiceComponent,
    GovermentAchivementComponent,
    AddUpdateGovermentAchivementComponent,
    CitizenLetterTypeComponent,
    AddLetterTypeComponent,
    UpdateLetterTypeComponent,
    DetailLetterTypeComponent,
    DepartmentSetupComponent,
    DepartmentSetupAddEditComponent,
    DepartmentAuthoritySignatoryComponent,
    DepartmentAuthoritySignatoryAddEditComponent,
    DepartmentReferenceComponent,
    DepartmentReferenceAddEditComponent,
    CitizenAttachmentComponent,
    AddCitizenAttachmentComponent,
    UpdateCitizenAttachmentComponent,
    DetailCitizenAttachmentComponent,
    AchievementCategoryMasterComponent,
    AddUpdateAchievementCategoryMasterComponent,
    AchievementSubCategoryMasterComponent,
    AddUpdateAchievementSubCategoryMasterComponent,
    CCCategoryComponent,
    AddUpdateCccategoryComponent,
    OrderSubtypeMasterComponent,
    AddUpdateOrdersubtypeComponent,
    GalleryComponent,
    AddUpdateGalleryComponent,
    GalleryDetailComponent,
    AdminDepartmentComponent,
    AddUpdateAdminDepartmentComponent,
    DepartmentMasterComponent,
    AddUpdateDepartmentComponent,
    MapCcCategoryToReferenceComponent,
    UserNotificationComponent,
    CancellationReasonComponent,
    ReasonAddUpdateDialogComponent,
    ImportantDecisionComponent,
    AddupdateImportantDecisionComponent,
    DetailImportantDecisionComponent,
    ImportantdecisionsubcategorymasterComponent,
    AddUpdateImportantDicisionSubCategoryMasterComponent,
    JankalyanlogSummaryReportComponent,
    JankalyanlogDetailReportComponent,
    ImpDecSummaryReportComponent,
    ImportantDecisionDepartmentReportComponent,
    DepartmentUserProfileComponent,
    DepartmentUserProfileUpdateComponent,
    ImportantDecisionDetailReportComponent,
    DepartmentProfileComponent,
    DepartmentProfileAddUpdateComponent,
    JankalyanEntryMasterComponent,
    AddUpdateJankalyanEntryMasterComponent,
    DepartmentContactDetailsComponent,
    DptContactDetailsAddUpdateComponent,
    DesignationMasterComponent,
    AddUpdateDesignationMasterComponent,
    JankalyanSummeryReportforallModuleComponent,
    SendStatusEmailComponent,
    JankalyanCategoryMasterComponent,
    JanCategoryAddUpdateDialogComponent,
    UserTypeComponent,
    AddUpdateUsertypeComponent,
    ChiefMinisterProfileComponent,
    AddUpdateChiefMinisterProfileComponent,
    DetailChiefMinisterProfileComponent,
    ProjectMasterComponent,
    AddUpdateProjectMasterComponent,
    VcParticipantCategoryMasterComponent,
    VcParticipantAddUpdateDialogComponent,
    ProjectSubCategoryComponent,
    ProjectSubCategoryAddupdateDialogComponent,
    ProjectCategoryMasterComponent,
    ProjectCategoryAddUpdateComponent,
    ProjectMileStoneComponent,
    ProjectMileStoneAddUpdateComponent,
    UpdateProjectProgressComponent,
    NewsClassificationMasterComponent,
    NewsClassificationAddupdateComponent,
    NewsSubjectMasterComponent,
    NewsSubjectAddupdateComponent,
    NewsNewspaperMasterComponent,
    NewsNewspaperMasterAddupdateComponent,
    MLAContituencyMasterComponent,
    MlaconstituencyAddUpdateComponent,
    ProjectSubSubCategoryMasterComponent,
    ProjectSubSubCategoryAddUpdateComponent,
    ProjectSchemeCategoryComponent,
    ProjectSchemeCategoryAddupdateComponent,
    ProjectMasterReportComponent,
    MpconstituencyMasterComponent,
    MpconstituencyAddUpdateComponent,
    ChildPageMasterComponent,
    ChildPageMasterAddUpdateComponent,
    CMISSummaryReportComponent,
    CmisDetailReportComponent,
    ProjectSummaryReportComponent,
    ProjectDynamicLabelSummaryReportComponent,
    SubSubCategoryForDptDialogComponent,
    TransferdeptComponent,
    DepartmentListDialogComponent,
    DepartmentWiseProjectSummaryReportComponent,
    ProjectBudgetDialogComponent,
    CmisComplianceComponent,
    WebServiceMasterDataComponent,
    CmisComplianceReportComponent,
    CmisAchievementSummaryReportComponent,
    CmisAchievementDetailReportComponent,
    CmisComplianceDptModuleSummaryReportComponent,
    HelpDocumentTypeMasterComponent,
    AddupdateHelpDocumentTypeMasterComponent,
    OrderTypeMasterComponent,
    AddUpdateOrderTypeMasterComponent,
    ChiranjeeviTestimonialComponent,
    UserSpecificPermissionDialogComponent,
    DefaultPermissionDialogComponent,
    MenuWiseDefaultPermissionDialogComponent,
    ProjectMasterDetailComponent,
    ComplianceNoOfEntryInJankalyanComponent,
    NoOfComplianceComponent,
    ProjectDepartmentStatusSummaryReportComponent,
    BeneficiaryCategoryMasterComponent,
    AddupdateBeneficiaryCategoryMasterComponent,
    JankalyanConfigurationMasterComponent,
    AddUpdateJanConfigurationComponent,
  ],
  imports: [
    CommonModule,
    SchemeModule,
    MasterRoutingModule,
    AppMaterialModule,
    CKEditorModule,
    AngularEditorModule
  ],
  entryComponents: [
    CmisComplianceComponent,
    LookupDialogComponent,
    SubSubCategoryForDptDialogComponent,
    ModeOfDeliveryDialogComponent,
    LookupTypeDialogComponent,
    SectorDialogComponent,
    AdvertisementCategoryDialogComponent,
    AdvertisementSubCategoryDialogComponent,
    PlatformDialogComponent,
    SchemeTypeDialogComponent,
    SchemeOutputDialogComponent,
    SchemeBeneficialCategoryDialogComponent,
    SchemeCategoryDialogComponent,
    SchemeUploadFileDialogComponent,
    SchemeRequiredDocumentCategoryDialogComponent,
    SchemeCommonDialogComponent,
    AddEditDialogComponent,
    AddUpdateMenuMasterComponent,
    MonitoringParameterMasterDialogComponent,
    MPDialogComponent,
    MPTypeDialogComponent,
    AddUpdateAchievementCategoryMasterComponent,
    AddUpdateAchievementSubCategoryMasterComponent,
    AddUpdateCccategoryComponent,
    AddUpdateOrdersubtypeComponent,
    AddUpdateAdminDepartmentComponent,
    AddUpdateDepartmentComponent,
    ReasonAddUpdateDialogComponent,
    ImportantDecisionComponent,
    AddUpdateImportantDicisionSubCategoryMasterComponent,
    AddUpdateDesignationMasterComponent,
    // JanCategoryAddUpdateDialogComponent,JanCategoryAddUpdateDialogComponent
    AddUpdateUsertypeComponent,
    VcParticipantAddUpdateDialogComponent,
    ProjectSubCategoryAddupdateDialogComponent,
    ProjectCategoryAddUpdateComponent,
    ProjectMileStoneAddUpdateComponent,
    UpdateProjectProgressComponent,
    NewsClassificationAddupdateComponent,
    NewsSubjectAddupdateComponent,
    NewsNewspaperMasterAddupdateComponent,
    MlaconstituencyAddUpdateComponent,
    ProjectSubSubCategoryAddUpdateComponent,
    ProjectSchemeCategoryAddupdateComponent,
    MpconstituencyAddUpdateComponent,
    DepartmentListDialogComponent,
    ProjectBudgetDialogComponent,
    AddupdateHelpDocumentTypeMasterComponent,
    UserSpecificPermissionDialogComponent,
    DefaultPermissionDialogComponent,
    MenuWiseDefaultPermissionDialogComponent
  ],
  providers: [UserPermissionService,DatePipe],
  exports:[CmisDetailReportComponent]
})
export class MasterModule {}
