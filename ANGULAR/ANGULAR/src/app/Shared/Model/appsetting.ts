import { environment } from "src/environments/environment";
export class AppSetting {
  //#region  <Common>
  static BaseApiUrl = environment.ApiBaseUrl; // 'http://windowsdemo.projectstatus.co.uk/StateDashboardapi/';
  // //static BaseApiUrl = "http://localhost:61253/";
  // //static BaseApiUrl = "http://10.68.5.159/WEBAPI/";
  // 'http://windowsdemo.projectstatus.co.uk/StateDashboardapi/';
  static orderByDscAsc = "asc";
  static orderByAsc = 1;
  static orderByDsc = 0;
  static GetDDlUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/AllDropDown?keys=";
  static GetFilterdDDlUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/AllDropDown";
  static GetSingleDDlUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetDropDown?key=";
  static DefaultProfilePic = "assets/images/profile.png";
  static DefaultStartDate: Date = new Date("2018-12-17T00:00:00");
  static DefaultEndDate: Date = new Date();

  static CMISAgileURL =
    "http://10.68.5.159/cmisold/aspx/Landingpageapp.aspx?cmiskey=";
  static CMISLMSUrl = "http://10.68.5.159/cmisold/LMS/login.aspx?username=";
  static CMISNMSUrl = "http://10.68.5.159/cmisold/NMS/login.aspx?username=";
  static CMISVIPLMSUrl =
    "http://10.68.5.159/cmisold/VIPLMS/login.aspx?username=";
  static CMISPRMSUrl = "http://10.68.5.159/cmisold/PRMS/login.aspx?username=";
  //#endregion

  //#region  <Order>
  static orderImageBasePath: string =
    AppSetting.BaseApiUrl + "Content/UploadFolder/OrderEntry/";
  static RelatedToOrderUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/GetAll";
  static OrderReportApiUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/GetOrderReport";

  static OrderDetailReportApiUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/GetOrderDetailReport";
  static OrderDetailDDLKeys = "ddlDepartment,ddlOrderType";

  static OrderByIdUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/GetById?id=";
  static OrderUploadAttachmentUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/UploadOrderAttachment";
  static OrderEntryUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/AddUpdateOrder";
  static OrderDeleteUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/Delete?id=";
  static OrderSetStatusUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/SetStatus?id=";
  static OrderIssueByDefault = 1;
  static LinkedToScheme = 51;

  static OrderRelatedToUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/GetOrderRelatedToResult";
  static GetKeysForDropdownUrl: string =
    AppSetting.BaseApiUrl + "CommonDropDown/GetKeysForDropdown?moduleName=";
  static DDLKeyForOrderEntry =
    "ddlBeneficiaryCategory,ddlDepartment,ddlOrderSector,OrderWithRequiredType,ddlOrderIssueBy,ddlOrderModuleName,RadioLinkedToScheme,ddlCMISBudgetYear,ddlDepartmentForCMISReport,ddlSchemeMaster"; // ,ddlOrderRelatedToYear,ddlOrderRelatedToDepartment
  static DDLKeyUploadAttachment = "ddlEntry";

  static ServiceAPIUrl =
    "http://cmis.rajasthan.gov.in/cmisnewscripts/ASBIViewRest.dll/datasnap/rest/TASBIViewREST/getiview";

  static serviceAPIModel =
    '{ "_parameters": [{ "getiview": { "name": "mobdm", "axpapp": "cmisnew", "username":"mobtest", "password":"827ccb0eea8a706c4c34a16891f84e7b", "seed":"", "s": "", "pageno": "1", "pagesize": "2000", "sqlpagination": "true", "params": {"Servicetype":"Years","pmodulename":"ALL","pprj_year":"ALL"} } }] }';

  static OrderRelatedToResultKey = "ALL";
  static OrderLockUrl = AppSetting.BaseApiUrl + "CMDashboard/Order/LockToggle/";
  static OrderSummaryReportUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/GetOrderSummaryReport";
  static OrderSummaryReportWithLastTransactionUrl: string =
    AppSetting.BaseApiUrl +
    "CMDashboard/Order/GetOrderSummaryReportWithLastTransaction";
  static GetOrderTypeSummaryReportWithLastTransaction: string =
    AppSetting.BaseApiUrl +
    "CMDashboard/Order/GetOrderTypeSummaryReportWithLastTransaction";
  static GetOrderDepartmentCountReport: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/GetOrderDepartmentSummaryReport";

  static DDLKeyForOrderSummary = "ddlDepartment,ddlAdminDepartment";

  static ExportGovernmentDocumentDataUrl: string =
    AppSetting.BaseApiUrl + "CMDashboard/Order/ExportGovernmentDocumentData";

  //#endregion

  //#region  <Scheme>
  static SchemeGetUrlById =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetById?id=";
  static GetByBeneficiaryId =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetByBeneficiaryId?id=";

  static UpdateBeneficiaryCategory =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/UpdateBeneficiaryCategory";

  static SchemeGetUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/Get?isActive=";
  static SchemeAddUrl = AppSetting.BaseApiUrl + "CMDashboard/Scheme/Post";
  static SchemeListGetUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetSchemeList";

  static AssignSchemeAddUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/AssignScheme";
  static AssignSchemeEditUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/EditAssignScheme";
  static AssignSchemeGetById =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetAssignSchemeById/";
  static AssignSchemeListGetUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/Scheme/GetAllAssignSchemeList?isActive=";
  static AssignSchemeDDLKey = "ddlUserByAdminDepartment,ddlSchemePageType";

  static SchemeGetPriorityUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetAllPriority";
  static SchemeSetPriorityUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/SetAllPriority";
  static SchemeUpdateUrl = AppSetting.BaseApiUrl + "CMDashboard/Scheme/Put/";
  static SchemeDeleteUrl = AppSetting.BaseApiUrl + "CMDashboard/Scheme/Delete";
  static SchemeFAQUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/FAQAddUpdate";
  static SchemeMonitoringParamUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/AddMonitoringParameters";
  static SchemeDataEntryMonitoringParamUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/Scheme/AddDataEntryForMonitoringParameters";
  static SchemeDataEntryMonitoringParamUpdateUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/Scheme/UpdateDataEntryValueForMonitoringParameters";
  static SchemeGetMonitoringParamById =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetMonitoringParameters?id=";
  // tslint:disable-next-line: max-line-length
  static SchemeMonitoringParamByIdForDataentry =
    AppSetting.BaseApiUrl +
    "CMDashboard/Scheme/GetMonitoringParametersByIdForDataEntry?id=";
  static SchemeMonitoringParamDataentryList =
    AppSetting.BaseApiUrl +
    "CMDashboard/Scheme/GetDataEntryListForMonitoringParameters?id=";
  static SchemeUpdateMonitoringParam =
    AppSetting.BaseApiUrl +
    "CMDashboard/Scheme/UpdateMonitoringParametersStatus?id=";
  static SchemeFAQListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetAllFaq/";
  static schemeFilesBasePath =
    AppSetting.BaseApiUrl + "Content/UploadFolder/Scheme/";
  static schemeMPRCountWithSchemeUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetAllMPRCountWithScheme";
  static schemeGetAllMPMonthlyBySchemeIdUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/Scheme/GetAllMPMonthlyBySchemeId?schemeId=";
  // tslint:disable-next-line: max-line-length
  static schemeDDLkey =
    "ddlOrderModuleName,ddlCMISBudgetYear,ddlDepartmentForCMISReport,ddlSchemeModeOfDisbursement,ddlSchemePageType,ddlSchemeListOfOtherDoc,ddlSchemePaymentDisbursementFrequency,ddlSchemeModeOfDelivery,ddlSchemeEligibility,ddlSchemePayFees,ddlSchemeListOfRequiredDoc,ddlSchemeServiceProgramArea,ddlSchemeServiceType,ddlDesignation,ddlCommonMaster,ddlAdminDepartment,ddlDepartment,ddlBeneficiaryCategory,ddlCategory,ddlSchemeType,ddlSchemeOutput,ddlModeofPayment,ddlModeOfDelivery,ddlSchemeArea,ddlDistrict,ddlContactPersonType";
  // tslint:disable-next-line: max-line-length
  static schemeRadioKey =
    "RadioSchemeService,RadioPaymentDisbursementFrequency,RadioMadeOfApplingOnlineAndBoth,RadioListOfRequiredDoc,RadioSchemeOwnedBy,RadioServiceFee,RadioSchemeModeofApplying,RadioSchemeExpriedOn,RadioApplyForScheme,RadioRGDPSAct,RadioSchemeOwnedBy,ddlSchemeNameOfDocument,RadioSchemeType,";

  static DDLKeyForScheme = AppSetting.schemeRadioKey + AppSetting.schemeDDLkey;
  static DDLKeyForUpdateBeneficiary = "ddlBeneficiaryCategory";
  static DDLKeyForCustomSearch =
    "ddlAchievementCategory,ddlAchievementSubCategory,ddlDepartment";
  static DDLKeyDepartmentEmail = "ddlDepartment,ddlDesignation";
  static DDLKeySchemeFAQ = "ddlSchemeMaster";
  static DDLKeySchemeOnlyForFAQ = "ddlSchemefaqMaster";
  static DDLKeySchemeMonitoringParams =
    "ddlSchemefaqMaster,ddlMonitoringParameters";
  static SchemeStatusUpdateUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/SetStatus/";
  static SchemeLockUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/LockToggle/";
  static GetSchemeGroupById =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetSchemeGroupById?id=";

  static SchemeContactPersonDetailUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetAllContactPersonDetail/";

  static UpdateGroupSchemeUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/UpdateGroupScheme/";

  static IsSchmeNotExistUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/IsSchmeNotExist";
  //#endregion

  //#region  <Advertisement>
  static AdvertisementAddUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/AddUpdateAdvertisement";
  static AdvertisementListUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/GetAll";
  static AdvertisementDeleteUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/Delete?Id=";
  static AdvertisementEditUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/GetById?Id=";
  static DDLKeyForAdvertisement = "ddlAdvCategory,ddlAdvSubCategory,ddlBeneficiaryCategory,ddlAdminDepartment,ddlDistrict,ddlDepartment";
  static advimagebasepath = AppSetting.BaseApiUrl + "Content/UploadFolder/AdvertisementEntry/";
  static AdvertisementPublishUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/SendNotificationOnPublish?Id=";
  static AdvertisementUpdateStatusUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/UpdateStatus/";
  static RedesignRequestByPlatformUserUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/RedesignRequestByPlatformUser";
  static RedesignRequestforAdminUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/GetRedesignListForAdmin";
  static RedesignRequestDetailforAdminUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/GetRedesignRequestDetailsForAdmin";
  static RedesignApproveByAdminUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/RedesignApproveByAdmin";
  static AdvListForUsersUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/GetAdvListForAdminDepartmentDepartmentPlatformUser";
  static AdvUploadedUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/UploadedService?id=";
  static adminDepartment = "1";
  static department = "2";
  static platformUser = "3";
  static AdvertisementLockUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/LockToggle/";
  static VisitorCountReportUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/VisitorCountReport";
  static VisitorCountDetailReportUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/VisitorCountDetailReport";
  static DateWiseVisitorCountReportUrl = AppSetting.BaseApiUrl + "CMDashboard/Advertisement/DateWiseVisitorCountReport";
  //#endregion

  //#region  <Achievements>
  static AchievementListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Achievement/Get";
  static AchievementAddUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Achievement/Post";
  static AchievementUpdateUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Achievement/Put/";
  static AchievementDetailUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Achievement/Get/";
  static AchievementUpdateActiveStatusUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Achievement/UpdateActiveStatus/";
  static AchievementUpdateDeleteStatusUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Achievement/Delete/";
  static DDlKeyForAchievement =
    "ddlBeneficiaryCategory,ddlOrderModuleName,ddlCMISBudgetYear,ddlDepartmentForCMISReport,ddlAchievementCategory,ddlDepartment";
  static AchievementFilterListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Achievement/GetAchievementFilter";
  static GetAchievementsCategoryWiseSummaryReportUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/Achievement/GetAchievementsCategoryWiseSummaryReport";
  static ExportAchievementDataUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Achievement/ExportAchievementData";
  //#endregion

  //#region  <ImportantDecision>
  static ImportantDecisionListUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecision/Get";
  static ImportantDecisionAddUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecision/Post";
  static ImportantDecisionUpdateUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecision/Put/";
  static ImportantDecisionDetailUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecision/Get/";
  static ImportantDecisionUpdateActiveStatusUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecision/UpdateActiveStatus/";
  static ImportantDecisionUpdateDeleteStatusUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecision/Delete/";
  static DDlKeyForImportantDecision =
    "ddlDepartment,ddlSector,ddlImpCategory,ddlImportantDecisionSubCategory,ddluserlist";
  static ImportantDecisionFilterListUrl =
    AppSetting.BaseApiUrl +
    "admin/ImportantDecision/GetImportantDecisionFilter";
  static ImportantDecisionSummaryReportUrl =
    AppSetting.BaseApiUrl +
    "admin/ImportantDecision/GetImportantDecisionSummaryReport";
  static GetImportantDecisionDepartmentSummaryReport: string =
    AppSetting.BaseApiUrl +
    "admin/ImportantDecision/GetImportantDecisionDepartmentSummaryReport";
  //#endregion

  //#region   user log report
  static GetJankalyanUserLogDetailReport =
    AppSetting.BaseApiUrl +
    "admin/JankalyanReport/GetJankalyanUserLogDetailReport";

  static GetJankalyanUserLogSummaryReport =
    AppSetting.BaseApiUrl +
    "admin/JankalyanReport/GetJankalyanUserLogSummaryReport";

  static GetJankalyanSummaryReportURL =
    AppSetting.BaseApiUrl + "Admin/JankalyanReport/GetJankalyanSummaryReport";

  static DDlKeyForAllModuleReport = "ddlDepartmentCategory,ddlAdminDepartment";

  static CMISNewSummaryReportURL =
    AppSetting.BaseApiUrl + "Admin/JankalyanReport/GetCMISNewSummaryReport";
  static CMISNewDetailReportURL =
    AppSetting.BaseApiUrl + "Admin/JankalyanReport/GetCMISNewDetailReport";
  static DDlKeyFoCMISReport =
    "ddlDepartmentForCMISReport,ddlCMISReportModules,ddlCMOOfficers";

  //CMIS Compliance
  static CMISComplianceByIdURL =
    AppSetting.BaseApiUrl + "Admin/JankalyanReport/GetCMISComplianceById";

  static AddUpdateCMISComplianceURL =
    AppSetting.BaseApiUrl + "Admin/JankalyanReport/AddUpdateCMISCompliance";

  static DDlKeyForCMISCompliance =
    "ddlProjectCategory,ddlProjectSubCategory,ddlProjectSubSubCategory,ddlPageMasterforCMISCompliance";

  static GetCMISComplianceReportURL =
    AppSetting.BaseApiUrl + "Admin/JankalyanReport/GetCMISComplianceReport";
  static ComplianceModuleAndDeptWiseSummaryReportURL =
    AppSetting.BaseApiUrl +
    "Admin/JankalyanReport/GetComplianceModuleAndDeptWiseSummaryReport";
  static ComplianceNoOfEntryInJankalyanReportDataURL =
    AppSetting.BaseApiUrl +
    "Admin/JankalyanReport/GetComplianceNoOfEntryInJankalyanReportData";
  static NoOfComplianceDetailDataURL =
    AppSetting.BaseApiUrl + "Admin/JankalyanReport/GetNoOfComplianceDetailData";

  static GetJankalyanProjectReport =
    AppSetting.BaseApiUrl + "Admin/JankalyanReport/GetJankalyanProjectReport";

  static CMISAchievementSummaryReportURL =
    AppSetting.BaseApiUrl +
    "Admin/JankalyanReport/GetCMISAchievementSummaryReport";
  static CMISAchievementDetailReportURL =
    AppSetting.BaseApiUrl +
    "Admin/JankalyanReport/GetCMISAchievementDetailReport";
  //#endregion

  //#region  <CC Category>
  static CCCategoryListUrl =
    AppSetting.BaseApiUrl + "Admin/CCCategoryMaster/Get";
  static CCCategoryAddUrl =
    AppSetting.BaseApiUrl + "Admin/CCCategoryMaster/Post";
  static CCCategoryUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/CCCategoryMaster/Put/";
  static CCCategoryGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/CCCategoryMaster/Get/";
  static CCCategoryUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/CCCategoryMaster/UpdateStatus/";
  static DDlKeyForCCCategory = "ddlDepartment";
  static CCCategoryReferenceListUrl =
    AppSetting.BaseApiUrl + "Admin/CCCategoryMaster/GetCCCategoryReferenceList";
  static SaveCCCategoryMappingtUrl =
    AppSetting.BaseApiUrl + "Admin/CCCategoryMaster/SaveCCCategoryMapping";
  //#endregion

  //#region  <Cancellation ReasonMaster>
  static CancellationReasonListUrl =
    AppSetting.BaseApiUrl + "Admin/CancellationReasonMaster/Get";
  static CancellationReasonAddUrl =
    AppSetting.BaseApiUrl + "Admin/CancellationReasonMaster/Post";
  static CancellationReasonUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/CancellationReasonMaster/Put/";
  static CancellationReasonGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/CancellationReasonMaster/Get/";
  static CancellationReasonUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/CancellationReasonMaster/UpdateStatus/";
  //#endregion

  //#region  <Order SubTypeMaster>
  static OrderSubTypeListUrl =
    AppSetting.BaseApiUrl + "Admin/OrderSubTypeMaster/Get";
  static OrderSubTypeAddUrl =
    AppSetting.BaseApiUrl + "Admin/OrderSubTypeMaster/Post";
  static OrderSubTypeUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/OrderSubTypeMaster/Put/";
  static OrderSubTypeGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/OrderSubTypeMaster/Get/";
  static OrderSubTypeUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/OrderSubTypeMaster/UpdateStatus/";
  static DDlKeyForOrderSubType = "ddlOrderType";
  //#endregion

  //#region  <VC Creation>
  static VCCreationListUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/VCCreation/Get";
  static VCCreationAddUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/VCCreation/Post";
  static VCCreationUpdateUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/VCCreation/Put/";
  static VCCreationGetByIdUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/VCCreation/Get/";
  static VCGetAllVcReportUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/VCCreation/GetAllVcReport";
  static VCCreationUpdateStatusUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/VCCreation/UpdateStatus/";
  static VCDeleteUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/VCCreation/Delete/";
  static VCSummaryReport =
    AppSetting.BaseApiUrl + "VideoConferencing/VCCreation/VCSummaryReport";

  static VCParticipantCountByDistrictReportReport =
    AppSetting.BaseApiUrl +
    "VideoConferencing/VCCreation/VCParticipantCountByDistrictReport";
  static VCChairpersonCategorySummaryReportURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/VCCreation/VCChairpersonCategorySummaryReport";
  static CategoryAndDptWiseSummaryVCReportURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/VCCreation/GetCategoryAndDptWiseSummaryVCReport";

  static AdmDptCatWiseSummaryVCReportURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/VCCreation/GetAdmDptCatWiseSummaryVCReport";

  //#endregion

  //#region  <VC Location Master>
  static VCLocationMasterListUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/LocationMaster/Get";
  static VCLocationMasterAddUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/LocationMaster/Post";
  static VCLocationMasterUpdateUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/LocationMaster/Put/";
  static VCLocationMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/LocationMaster/Get/";
  static VCLocationMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/LocationMaster/UpdateStatus/";
  static DDlKeyForLocationMaster = "ddlUser,ddlDistrict,RadioVcLocationType";

  static VCLocationDeleteUrl =
    AppSetting.BaseApiUrl + "VideoConferencing/LocationMaster/Delete/";
  //#endregion

  //#region  <Department master>
  static DepartmentMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/Get?isActive=";
  static DepartmentMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/Post";
  static DepartmentMasterUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/Put/";
  static DepartmentMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/Get/";
  static DepartmentMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/UpdateStatus/";

  static TransferMenuClassificationToDepartmentMenuUrl =
    AppSetting.BaseApiUrl +
    "Admin/DepartmentMaster/TransferMenuClassificationToDepartmentMenu?dptCode=";
  static TransferDptMenuToDepartmentSubMenuUrl =
    AppSetting.BaseApiUrl +
    "Admin/DepartmentMaster/TransferDptMenuToDepartmentSubMenu?dptCode=";

  static DDlKeyForDepartmentMaster =
    "ddlUserGroup,ddlAdminDepartment,ddlDistrict,ddlDepartmentCategory,RadioDepartmentDistrict,ddlCMOOfficers,ddlStateMinister,ddlCabinetMinister";

  static DepartmentReportUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/GetDepartmentReport";
  static DepartmentSchemeReportUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/GetDepartmentSchemeReport";

  static GetLoginUserDepartmentListUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/GetLoginUserDepartmentList";
  static UpdateLoginUserDepartmentUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/UpdateLoginUserDepartment";

  static GetDepartmentProfileListUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/GetDepartmentProfileList";
  static GetDepartmentProfileByIdUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/GetDepartmentProfileById/";
  static DepartmentProfileAddUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/DepartmentProfileAddUpdate";
  static UpdateDepartmentProfileStatusUrl =
    AppSetting.BaseApiUrl +
    "Admin/DepartmentMaster/UpdateDepartmentProfileStatus/";
  static IsDepartmentProfileExistUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMaster/IsDepartmentProfileExist";
  static DepartmentProfileDDLKey = "ddlEntryTypeMaster,ddlJankalyanCategory";

  //#endregion

  //#region  <Admin Department Master>
  static AdminDepartmentListUrl =
    AppSetting.BaseApiUrl + "Admin/AdminDepartmentMaster/Get";
  static AdminDepartmentAddUrl =
    AppSetting.BaseApiUrl + "Admin/AdminDepartmentMaster/Post";
  static AdminDepartmentUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/AdminDepartmentMaster/Put/";
  static AdminDepartmentGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/AdminDepartmentMaster/Get/";
  static AdminDepartmentUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/AdminDepartmentMaster/UpdateStatus/";

  //#endregion

  //#region  <Notification Template Type>
  static NotificationTypeListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationTemplateType/Get";
  static NotificationTypeAddUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationTemplateType/Post";
  static NotificationTypeByIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationTemplateType/GetById/";
  static NotificationTypeEditUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationTemplateType/Put";
  //#endregion

  //#region  <LookupType>
  static LookupTypeListUrl = AppSetting.BaseApiUrl + "Admin/LookUpType/Get";
  static LookupTypeAddUrl = AppSetting.BaseApiUrl + "Admin/LookUpType/Post";
  static LookupTypeUrlById = AppSetting.BaseApiUrl + "Admin/LookUpType/Get/";
  static LookupTypeEditUrl = AppSetting.BaseApiUrl + "Admin/LookUpType/Put";
  static LookupTypeDeleteUrl =
    AppSetting.BaseApiUrl + "Admin/LookUpType/Delete/";
  static LookupTypeGetById =
    AppSetting.BaseApiUrl + "Admin/LookUpType/GetLookUpTypeById/";
  //#endregion

  //#region  <Lookup>
  static LookupListUrl = AppSetting.BaseApiUrl + "Admin/LookUp/Get";
  static LookUpAddUrl = AppSetting.BaseApiUrl + "Admin/LookUp/Post";
  static LookUpUrlById = AppSetting.BaseApiUrl + "Admin/LookUp/Get/";
  static LookUpEditUrl = AppSetting.BaseApiUrl + "Admin/LookUp/Put";
  static LookUpDeleteUrl = AppSetting.BaseApiUrl + "Admin/LookUp/Delete/";
  static LookUpMasterActiveStatusUrl =
    AppSetting.BaseApiUrl + "admin/LookUp/UpdateActiveStatus/";
  static DDlKeyForLookUp =
    "ddlLookUpType,ddlAdvertisementNotification,ddlPlatformMaster,ddlAdminDepartment,RadioIsPushOrIsPull";
  static DDLKeyForCategory =
    "ddlCommonCategoryLookup,ddlJankalyanCategory,ddlClassification,ddlClassificationPageType,RadioDepartmentDistrictbutton";
  //#endregion

  //#region  <HelpDocument>
  static HelpDocListUrl = AppSetting.BaseApiUrl + "Admin/HelpDocument/Get";
  static HelpDocAddUrl = AppSetting.BaseApiUrl + "Admin/HelpDocument/Post";
  static HelpDocUrlById = AppSetting.BaseApiUrl + "Admin/HelpDocument/Get/";
  static HelpDocEditUrl = AppSetting.BaseApiUrl + "Admin/HelpDocument/Put";
  static HelpDocHDeleteUrl =
    AppSetting.BaseApiUrl + "Admin/HelpDocument/Delete/";
  static HelpDocHDDLKey = "ddlHelpDocType";
  static HelpDocKey = "ddlHelpDocTypeOnWebServiceMaster";
  //#endregion

  //#region  <Sector>
  static SectorListUrl = "Admin/Sector/Get";
  static SectorAddUrl = "Admin/Sector/Post";
  static SectorUrlById = "Admin/Sector/Get/";
  static SectorEditUrl = "Admin/Sector/Put";
  static SectorDeleteUrl = "Admin/Sector/Delete/";
  //#endregion

  //#region  <ModeOfDelivery>
  static ModeOfDeliveryListUrl = "Admin/ModeOfDelivery/Get";
  static ModeOfDeliveryAddUrl = "Admin/ModeOfDelivery/Post";
  static ModeOfDeliveryUrlById = "Admin/ModeOfDelivery/Get/";
  static ModeOfDeliveryEditUrl = "Admin/ModeOfDelivery/Put";
  static ModeOfDeliveryDeleteUrl = "Admin/ModeOfDelivery/Delete/";
  //#endregion

  //#region  <AdvCategory>
  static AdvCategoryListUrl =
    AppSetting.BaseApiUrl + "Admin/AdvCategoryMaster/Get";
  static AdvCategoryAddUrl =
    AppSetting.BaseApiUrl + "Admin/AdvCategoryMaster/Post";
  static AdvCategoryUrlById =
    AppSetting.BaseApiUrl + "Admin/AdvCategoryMaster/Get/";
  static AdvCategoryEditUrl =
    AppSetting.BaseApiUrl + "Admin/AdvCategoryMaster/Put";
  static AdvCategoryDeleteUrl =
    AppSetting.BaseApiUrl + "Admin/AdvCategoryMaster/Delete/";
  static AdvCategoryMasterActiveStatusUrl =
    AppSetting.BaseApiUrl + "admin/AdvCategoryMaster/UpdateActiveStatus/";
  //#endregion

  //#region  <Monitoring parameter master>
  static MPMListUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterMaster/Get";
  static MPMAddUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterMaster/Post";
  static MPMUrlById =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterMaster/Get/";
  static MPMEditUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterMaster/Put";
  static MPMActiveStatusUrl =
    AppSetting.BaseApiUrl +
    "admin/MonitoringParameterMaster/UpdateActiveStatus/";
  static DDLMPMKey = "ddlTableName";
  //#endregion

  //#region  <AdvSubCategory>
  static AdvSubCategoryListUrl = "Admin/AdvSubCategoryMaster/Get";
  static AdvSubCategoryAddUrl = "Admin/AdvSubCategoryMaster/Post";
  static AdvSubCategoryUrlById = "Admin/AdvSubCategoryMaster/Get/";
  static AdvSubCategoryEditUrl = "Admin/AdvSubCategoryMaster/Put";
  static AdvSubCategoryDeleteUrl = "Admin/AdvSubCategoryMaster/Delete/";
  static AdvSubCategoryActiveStatusUrl =
    "Admin/AdvSubCategoryMaster/UpdateActiveStatus/";

  //#endregion

  //#region <platform>
  static PlatformMasterListUrl = "Admin/PlatformMaster/Get";
  static PlatformMasterAddUrl = "Admin/PlatformMaster/Post";
  static PlatformMasterUrlById = "Admin/PlatformMaster/Get/";
  static PlatformMasterEditUrl = "Admin/PlatformMaster/Put";
  static PlatformMasterDeleteUrl = "Admin/PlatformMaster/Delete/";
  static PlatformMasterActiveStatusUrl =
    "Admin/PlatformMaster/UpdateActiveStatus/";
  //#endregion

  //#region <AdvNotificationMaster>
  static AdvNotificationListUrl = "Admin/AdvNotificationMaster/Get";
  static AdvNotificationAddUrl = "Admin/AdvNotificationMaster/Post";
  static AdvNotificationUrlById = "Admin/AdvNotificationMaster/Get/";
  static AdvNotificationEditUrl = "Admin/AdvNotificationMaster/Put";
  static AdvNotificationDeleteUrl = "Admin/AdvNotificationMaster/Delete/";
  static GetAdvertisementListUrl =
    "Admin/AdvNotificationMaster/GetAdvertisementList?Id=";
  static AdvNotificationActiveStatusUrl =
    "Admin/AdvNotificationMaster/UpdateActiveStatus/";
  //#endregion

  //#region  <user>
  static UserListUrl = AppSetting.BaseApiUrl + "admin/user/Get";
  static UserAddUrl = AppSetting.BaseApiUrl + "admin/user/post";
  static UserDetailUrl = AppSetting.BaseApiUrl + "admin/user/Get/";
  static UserEditUrl = AppSetting.BaseApiUrl + "admin/user/Put/";
  static UserDeleteStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/user/UpdateDeleteStatus/";
  static UserActiveStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/user/UpdateActiveStatus/";
  static UserSSOIDExistUrl =
    AppSetting.BaseApiUrl + "admin/user/IsUserSSOIdExist?id=";
  static UserNameExistUrl =
    AppSetting.BaseApiUrl + "admin/user/IsUserNameExist?id=";
  static GetSSODetailFromSSO =
    AppSetting.BaseApiUrl + "admin/user/GetSSODetail?id=";
  static UserDepartmentUrl =
    AppSetting.BaseApiUrl + "admin/user/GetDepartment/";
  static UseOfficeUrl = AppSetting.BaseApiUrl + "admin/user/GetOffice/";
  static UseridListUrl = AppSetting.BaseApiUrl + "admin/user/GetUserlist/";
  static UserAdmDepartmentUrl =
    AppSetting.BaseApiUrl + "admin/user/GetAdminDepartment/";
  static UserAchievementSubcategoryUrl =
    AppSetting.BaseApiUrl + "admin/user/GetAchievementSubcategory/";
  static GetAchievementsubcategoryList =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetSubcategorybydeptandcat?";
  static GetUseForNotificationUrl =
    AppSetting.BaseApiUrl + "admin/user/GetUseForNotification/";
  static SendNotificationToUserUrl =
    AppSetting.BaseApiUrl + "admin/user/SendNotificationToUser/";
  static UserDivisionUrl = AppSetting.BaseApiUrl + "admin/user/GetDivision/";
  static UserDistrictUrl = AppSetting.BaseApiUrl + "admin/user/GetDistrict/";
  static UserBlockUrl = AppSetting.BaseApiUrl + "admin/user/GetBlock/";
  static UserTehsilUrl = AppSetting.BaseApiUrl + "admin/user/GetTehsil/";
  static UserLogUrl = AppSetting.BaseApiUrl + "api/Account/SaveLoginUserLog";
  static DDlKeyForUser =
    "ddlUserAdminDepartment,ddlTitle,ddlDesignation,ddlUserGroup,ddlAdminDepartment,ddlDivision,ddlDistrict,ddlParliamentConstituency,ddlAssemblyConstituency,ddlBlock,ddlTehsil,ddlGender,ddlOffice.ddlSSOId";
  static DDlKeyUserNotification = "ddlOffice,ddlDepartment";
  static DDlKeyForUserSSOId = "ddlSSOId";
  static ExportUserDataUrl =
    AppSetting.BaseApiUrl + "admin/user/ExportUserData";
  static ResetUserSpecificPermissionUrl =
    AppSetting.BaseApiUrl + "admin/user/ResetUserSpecificPermission?id=";
  static UserPagePermissionByUsernUrl =
    AppSetting.BaseApiUrl + "admin/user/GetUserPagePermissionByUser?userId=";
  static UserTypeWhichHasApefificPermissionUrl =
    AppSetting.BaseApiUrl + "admin/user/GetUserTypeWhichHasApefificPermission";
  static UserWhichHasApefificPermissionUrl =
    AppSetting.BaseApiUrl +
    "admin/user/GetUserWhichHasApefificPermission?pageCode=";
  static UserWhichHasDefaultPermissionUrl =
    AppSetting.BaseApiUrl +
    "admin/user/GetUserWhichHasDefaultPermission?pageCode=";
  //#endregion

  //#region <user-authentication>
  static LogInUrl = AppSetting.BaseApiUrl + "api/Account/LogIn?ssoId=";
  // static LogOutUrl = "/admin/ssointegration.aspx?Operation=logout";
  // static BackToSSOUrl = "/admin/ssointegration.aspx?Operation=backtosso";
  static LogOutUrl = environment.LogOutUrl;
  static BackToSSOUrl = environment.BackToSSOUrl;
  //#endregion

  //#region <user-permission>
  static GetDefaultPagePermissionUrl =
    AppSetting.BaseApiUrl + "/admin/Permission/GetDefaultPagePermission";
  static SaveDefaultPagePermissionUrl =
    AppSetting.BaseApiUrl + "/admin/Permission/SaveDefaultPagePermission";
  static DDlKeyForDefaultPagePermission = "ddlApplicationType,ddlUserType";
  static GetUserPagePermissionByApplicationUrl =
    AppSetting.BaseApiUrl +
    "/admin/Permission/GetUserPagePermissionByApplication";
  static GetUserDefaultPagePermissionByApplicationUrl =
    AppSetting.BaseApiUrl +
    "/admin/Permission/GetUserPagePermissionByApplicationGetDefault";
  static GetUserByApplicationUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetUserListByApplication";

  static SaveUserPagePermissionUrl =
    AppSetting.BaseApiUrl + "/admin/Permission/SaveUserPagePermission";
  static DDlKeyForUserPagePermission =
    "ddlApplicationType,ddlUserType,ddlDepartment,ddlUser";
  static GetAssignedUserPagePermissionUrl =
    AppSetting.BaseApiUrl + "/admin/Permission/GetAssignedUserPagePermission";
  //#endregion

  //#region  <Advertisement Approval Detail>
  static AdvApprovalDetailListUrl = "Admin/AdvApprovalDetailMaster/Get";
  static AdvApprovalDetailAddUrl = "Admin/AdvApprovalDetailMaster/Post";
  static AdvApprovalDetailUrlById = "Admin/AdvApprovalDetailMaster/Get/";
  static AdvApprovalDetailEditUrl = "Admin/AdvApprovalDetailMaster/Put";
  static AdvApprovalDetailDeleteUrl = "Admin/AdvApprovalDetailMaster/Delete/";
  static AdvApprovalDetailMasterActiveStatusUrl =
    AppSetting.BaseApiUrl + "Admin/AdvApprovalDetailMaster/UpdateActiveStatus/";
  //#endregion

  //#region  <dashboardpermission>
  static dashboardPermissionListUrl =
    AppSetting.BaseApiUrl + "admin/dashboardPermission/Get";
  static dashboardPermissionAddUrl =
    AppSetting.BaseApiUrl + "admin/dashboardpermission/post";
  static dashboardpermissionUrlById =
    AppSetting.BaseApiUrl + "admin/dashboardpermission/Get/";
  static dashboardpermissionEditUrl =
    AppSetting.BaseApiUrl + "admin/dashboardpermission/Put";
  static DDlKeyFordashboardpermission =
    "ddlWidgetMaster,ddlUserType,ddlDesignation,ddlUserGroup,ddlAdminDepartment,ddlDivision,ddlDistrict,ddlParliamentConstituency,ddlAssemblyConstituency,ddlBlock,ddlTehsil,ddlGender,ddlDepartment";
  //#endregion

  //#region  <Scheme TypeMaster>
  static SchemeTypeListUrl = AppSetting.BaseApiUrl + "admin/TypeMaster/Get";
  static SchemeTypeAddUrl = AppSetting.BaseApiUrl + "admin/TypeMaster/post";
  static SchemeTypeUrlById = AppSetting.BaseApiUrl + "admin/TypeMaster/Get/";
  static SchemeTypeEditUrl = AppSetting.BaseApiUrl + "admin/TypeMaster/Put";
  static SchemeTypeDeleteUrl =
    AppSetting.BaseApiUrl + "admin/TypeMaster/Delete/";
  static SchemeTypeUpdateStatusUrl =
    AppSetting.BaseApiUrl + "admin/TypeMaster/UpdateStatus/";
  //#endregion

  //#region  <Output Master>
  static SchemeOutputListUrl = AppSetting.BaseApiUrl + "admin/OutputMaster/Get";
  static SchemeOutputAddUrl = AppSetting.BaseApiUrl + "admin/OutputMaster/post";
  static SchemeOutputUrlById =
    AppSetting.BaseApiUrl + "admin/OutputMaster/Get/";
  static SchemeOutputEditUrl = AppSetting.BaseApiUrl + "admin/OutputMaster/Put";
  static SchemeOutputDeleteUrl =
    AppSetting.BaseApiUrl + "admin/OutputMaster/Delete/";
  static SchemeOutputUpdateStatusUrl =
    AppSetting.BaseApiUrl + "admin/OutputMaster/UpdateStatus/";
  //#endregion

  //#region  <Beneficial Category Master>
  static SchemeBeneficialCategoryListUrl =
    AppSetting.BaseApiUrl + "admin/BeneficialCategoryMaster/Get";
  static SchemeBeneficialCategoryAddUrl =
    AppSetting.BaseApiUrl + "admin/BeneficialCategoryMaster/post";
  static SchemeBeneficialCategoryUrlById =
    AppSetting.BaseApiUrl + "admin/BeneficialCategoryMaster/Get/";
  static SchemeBeneficialCategoryEditUrl =
    AppSetting.BaseApiUrl + "admin/BeneficialCategoryMaster/Put";
  static SchemeBeneficialCategoryDeleteUrl =
    AppSetting.BaseApiUrl + "admin/BeneficialCategoryMaster/Delete/";
  //#endregion

  //#region  <Scheme Category>
  static SchemeCategoryListUrl =
    AppSetting.BaseApiUrl + "admin/CategoryMaster/Get";
  static SchemeCategoryAddUrl =
    AppSetting.BaseApiUrl + "admin/CategoryMaster/post";
  static SchemeCategoryUrlById =
    AppSetting.BaseApiUrl + "admin/CategoryMaster/Get/";
  static SchemeCategoryEditUrl =
    AppSetting.BaseApiUrl + "admin/CategoryMaster/Put";
  static SchemeCategoryDeleteUrl =
    AppSetting.BaseApiUrl + "admin/CategoryMaster/Delete/";
  //#endregion

  //#region  <Scheme Upload file>
  static SchemeUploadFileCategoryListUrl =
    AppSetting.BaseApiUrl + "admin/UploadFileCategoryMaster/Get";
  static SchemeUploadFileCategoryAddUrl =
    AppSetting.BaseApiUrl + "admin/UploadFileCategoryMaster/post";
  static SchemeUploadFileCategoryUrlById =
    AppSetting.BaseApiUrl + "admin/UploadFileCategoryMaster/Get/";
  static SchemeUploadFileCategoryEditUrl =
    AppSetting.BaseApiUrl + "admin/UploadFileCategoryMaster/Put";
  static SchemeUploadFileCategoryDeleteUrl =
    AppSetting.BaseApiUrl + "admin/UploadFileCategoryMaster/Delete/";
  //#endregion

  //#region  <Scheme Required Document>
  static SchemeReqDocumentCategoryListUrl =
    AppSetting.BaseApiUrl + "admin/RequiredDocumentCategoryMaster/Get";
  static SchemeReqDocumentCategoryAddUrl =
    AppSetting.BaseApiUrl + "admin/RequiredDocumentCategoryMaster/post";
  static SchemeReqDocumentCategoryUrlById =
    AppSetting.BaseApiUrl + "admin/RequiredDocumentCategoryMaster/Get/";
  static SchemeReqDocumentCategoryEditUrl =
    AppSetting.BaseApiUrl + "admin/RequiredDocumentCategoryMaster/Put";
  static SchemeReqDocumentCategoryDeleteUrl =
    AppSetting.BaseApiUrl + "admin/RequiredDocumentCategoryMaster/Delete/";
  //#endregion

  //#region  <Scheme Common Master>
  static SchemeCommonMasterListUrl =
    AppSetting.BaseApiUrl + "admin/SchemeCommonMaster/Get";
  static SchemeCommonMasterAddUrl =
    AppSetting.BaseApiUrl + "admin/SchemeCommonMaster/post";
  static SchemeCommonMasterUrlById =
    AppSetting.BaseApiUrl + "admin/SchemeCommonMaster/Get/";
  static SchemeCommonMasterEditUrl =
    AppSetting.BaseApiUrl + "admin/SchemeCommonMaster/Put";
  static SchemeCommonMasterDeleteUrl =
    AppSetting.BaseApiUrl + "admin/SchemeCommonMaster/Delete/";
  static SchemeCommonMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "admin/SchemeCommonMaster/UpdateStatus/";
  static DDlKeyForCommonSchemeMaster = "ddlCommonMaster";
  //#endregion

  //#region <Config>
  static GetConfigDataUrl =
    AppSetting.BaseApiUrl + "admin/Configuration/GetAll";
  static SetConfigDataUrl = AppSetting.BaseApiUrl + "admin/Configuration/Post";
  static DDlKeyForConfig = "ddlDepartment,ddlUserType";
  //#endregion

  //#region <UserType>
  static UserTypeListUrl = AppSetting.BaseApiUrl + "admin/userType/Get";
  static UserTypeDetailUrl = AppSetting.BaseApiUrl + "admin/userType/Get/";
  static UserTypeAddUrl = AppSetting.BaseApiUrl + "admin/userType/Post";
  static UserTypeEditUrl = AppSetting.BaseApiUrl + "admin/userType/Put/";
  static UserTypeDeleteUrl = AppSetting.BaseApiUrl + "admin/userType/delete/";
  static UserTypeUpdateIsActiveUrl =
    AppSetting.BaseApiUrl + "admin/UserType/UpdateIsActive/";
  static UserTypeGetDownLevelUrl =
    AppSetting.BaseApiUrl + "admin/userType/GetDownLevelUserType/";
  //#endregion

  //#region <Office Master>
  static OfficeListUrl = AppSetting.BaseApiUrl + "admin/office/Get";
  static OfficeAddUrl = AppSetting.BaseApiUrl + "admin/office/post";
  static OfficeDetailUrl = AppSetting.BaseApiUrl + "admin/office/Get/";
  static OfficeEditUrl = AppSetting.BaseApiUrl + "admin/office/Put/";
  static OfficeDeleteStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/office/UpdateDeleteStatus/";
  static OfficeActiveStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/office/UpdateActiveStatus/";
  static DDlKeyForOffice =
    "RadioOfficeType,ddlAdminDepartment,ddlDepartment,ddlState,ddlDistrict,ddlTehsil,ddlBlock";
  //#endregion

  //#region <cmis-dashboard>
  static GetDepartmentDashboardReportUrl =
    AppSetting.BaseApiUrl + "/LMS/Dashboard/GetDepartmentDashboardReport";
  //#endregion

  //#region <LMS Settings>

  //#region <lms-report-advance-search>
  static LMS_DDLKeyForReportAdvanceSearch =
    "ddlUserGroup,ddlDepartment,ddlLMS_LetterAction,ddlReferencee";
  static LMS_GetStatisticalReportUrl =
    AppSetting.BaseApiUrl + "/LMS/Report/GetStatisticalReport";
  static LMS_GetDetailReportUrl =
    AppSetting.BaseApiUrl + "/LMS/Report/GetDetailReport";
  static LMS_GetAdminDepartmentAgeWiseCountReportUrl =
    AppSetting.BaseApiUrl + "/LMS/Report/GetAdminDepartmentAgeWiseCountReport";
  static LMS_GetDepartmentAgeWiseCountReportUrl =
    AppSetting.BaseApiUrl + "/LMS/Report/GetDepartmentAgeWiseCountReport";
  static LMS_GetActionHistoryReportUrl =
    AppSetting.BaseApiUrl + "/LMS/Report/GetActionHistoryReport";
  static LMS_GetAdminDepartmentLast6MonthCountReportUrl =
    AppSetting.BaseApiUrl +
    "/LMS/Report/GetAdminDepartmentLast6MonthCountReport";
  static LMS_GetDepartmentLast6MonthCountReportUrl =
    AppSetting.BaseApiUrl + "/LMS/Report/GetDepartmentLast6MonthCountReport";
  //#endregion

  //#endregion

  //#region <VIPLMS Settings>

  //#region <viplms-report-advance-search>
  static VIPLMS_DDLKeyForReportAdvanceSearch =
    "ddlUserGroup,ddlDepartment,ddlVIPLMS_LetterAction,ddlReferencee";
  //#endregion

  //#endregion

  //#region <Dashboard>
  static CMOLetterGetUrl =
    AppSetting.BaseApiUrl + "CMDashboard/CMOLetter/Get?Id=";

  static CMOLetterGetBYDepartmentIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/CMOLetter/Get?Id=";

  static CMISTaskGetUrl =
    AppSetting.BaseApiUrl + "CMDashboard/CMISTask/Get?Id=";

  static CMISTaskGetBYDepartmentIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/CMISTask/Get";

  static RecruitmentStatusGetUrl =
    AppSetting.BaseApiUrl + "CMDashboard/RecruitmentStatus/Get?Id=";

  static RecruitmentStatusGetBYDepartmentIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/RecruitmentStatus/Get?Id=";

  static ProjectMonitoringGetUrl =
    AppSetting.BaseApiUrl + "CMDashboard/ProjectMonitoring/Get";

  static ProjectMonitoringGetBYDepartmentIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/ProjectMonitoring/Get";

  // static SchemeDashboardGetUrl =
  //   AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetSchemedashboard?Id=";

  static SchemeDashboardGetBYUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Scheme/GetSchemedashboard";

  static GovtOrderDashboardGetBYUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GovtOrderDashboard/Get";
  //#endregion

  //#region <Email Template>
  static EmailTemplateListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationEmailTemplates/GetAll";
  static EmailTemplateAddUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationEmailTemplates/Create";
  static EmailTemplateUpdateUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationEmailTemplates/Edit";
  static EmailTemplateGetByIdUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/NotificationEmailTemplates/GetById?id=";
  static EmailTemplateDeleteUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationEmailTemplates/Delete?id=";
  static NotificationTemplateTypeKey = "ddlNotificationTemplateType";

  // endregion

  //#region <SMS Template>
  static SMSTemplateListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationSMSTemplates/GetAll";
  static SMSTemplateAddUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationSMSTemplates/Create";
  static SMSTemplateUpdateUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationSMSTemplates/Edit";
  static SMSTemplateGetByIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationSMSTemplates/GetById?id=";
  static SMSTemplateDeleteUrl =
    AppSetting.BaseApiUrl + "CMDashboard/NotificationSMSTemplates/Delete?id=";

  // endregion

  //#region <PageMaster>
  static PageMasterListUrl = AppSetting.BaseApiUrl + "Admin/PageMaster/Get";
  static PageMasterAddUrl = AppSetting.BaseApiUrl + "Admin/PageMaster/Post";
  static PageMasterEditUrl = AppSetting.BaseApiUrl + "Admin/PageMaster/Put/";
  static PageMasterDetailUrl =
    AppSetting.BaseApiUrl + "Admin/PageMaster/Get?id=";
  static PageMasterDeleteUrl =
    AppSetting.BaseApiUrl + "Admin/PageMaster/Delete?id=";
  static PageMasterDeleteStatusChangeUrl =
    AppSetting.BaseApiUrl + "Admin/PageMaster/UpdateDeleteStatus/";
  static PageMasterActiveStatusChangeUrl =
    AppSetting.BaseApiUrl + "Admin/PageMaster/UpdateActiveStatus/";
  static DDlKeyForPageMaster =
    "ddlApplicationType,ddlPageType,ddlApplicationMenu,ddlURLType";
  //#endregion

  //#region <MenuMaster>
  static MenuMasterListUrl = AppSetting.BaseApiUrl + "Admin/Menu/Get";
  static MenuMasterAddUrl = AppSetting.BaseApiUrl + "Admin/Menu/Post";
  static MenuMasterEditUrl = AppSetting.BaseApiUrl + "Admin/Menu/Put/";
  static MenuMasterDetailUrl = AppSetting.BaseApiUrl + "Admin/Menu/Get?id=";
  static MenuMasterDeleteUrl = AppSetting.BaseApiUrl + "Admin/Menu/Delete?id=";
  static MenuMasterByUserIdUrl =
    AppSetting.BaseApiUrl + "Admin/Menu/GetAllByUserId/";
  static MenuMasterDeleteStatusChangeUrl =
    AppSetting.BaseApiUrl + "Admin/Menu/UpdateDeleteStatus/";
  static MenuMasterActiveStatusChangeUrl =
    AppSetting.BaseApiUrl + "Admin/Menu/UpdateActiveStatus/";
  static DDlKeyForMenuMaster = "ddlApplicationType";
  //#endregion

  //#region <Monitoring Parameter lookup>
  static MonitoringParameterlookupListUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterLookup/Get";
  static MonitoringParameterlookupAddUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterLookup/Post";
  static MonitoringParameterlookupEditUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterLookup/Put";
  static MonitoringParameterlookupByIdUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterLookup/Get?id=";

  static MonitoringParameterlookupTypeListUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterLookup/GetAllLookupType";
  static MonitoringParameterlookupTypeAddUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterLookup/CreateLookupType";
  static MonitoringParameterlookupTypeEditUrl =
    AppSetting.BaseApiUrl + "Admin/MonitoringParameterLookup/EditLookupType";
  static MonitoringParameterlookupTypeByIdUrl =
    AppSetting.BaseApiUrl +
    "Admin/MonitoringParameterLookup/GetByIdLookupType?id=";

  static DDLKeyMPL = "ddlMonitoringParameterLookUpType";
  //#endregion
  //#region <Generate client id>
  static clientAdd = AppSetting.BaseApiUrl + "Admin/ClientWebService/Post";
  static clientEdit = AppSetting.BaseApiUrl + "Admin/ClientWebService/Put";
  static clientList = AppSetting.BaseApiUrl + "Admin/ClientWebService/GetAll";
  static ClientGetById = AppSetting.BaseApiUrl + "Admin/ClientWebService/Get/";
  static clientModuleDDLKey = "ddlClientModule";
  //#endregion

  //#region   Complaint Module

  static ComplaintAdd =
    AppSetting.BaseApiUrl + "ComplaintSoftware/Complaint/Create";
  static ComplaintAddAction =
    AppSetting.BaseApiUrl + "ComplaintSoftware/Complaint/CreateAction";
  static ComplaintDetailUrl =
    AppSetting.BaseApiUrl + "ComplaintSoftware/complaint/Get/";
  // static ComplaintEdit =
  //   AppSetting.BaseApiUrl +
  //   "CMDashboard/Advertisement/UpdateGovermentAchivement";
  static ComplaintList =
    AppSetting.BaseApiUrl + "ComplaintSoftware/Complaint/GetAll";
  // static ComplaintGetById =
  //   AppSetting.BaseApiUrl +
  //   "CMDashboard/Advertisement/GetByIdGovermentAchivement?id=";
  //#endregion

  //#region <Goverment Achivement>
  static GovermentAchivementAdd =
    AppSetting.BaseApiUrl + "CMDashboard/Advertisement/AddGovermentAchivement";
  static GovermentAchivementEdit =
    AppSetting.BaseApiUrl +
    "CMDashboard/Advertisement/UpdateGovermentAchivement";
  static GovermentAchivementList =
    AppSetting.BaseApiUrl +
    "CMDashboard/Advertisement/GetAllGovermentAchivement";
  static GovermentAchivementGetById =
    AppSetting.BaseApiUrl +
    "CMDashboard/Advertisement/GetByIdGovermentAchivement?id=";

  static GovermentAchivementStatusChange =
    AppSetting.BaseApiUrl +
    "CMDashboard/Advertisement/UpdateGovermentAchivementStatus?id=";
  static GovermentAchivementDelete =
    AppSetting.BaseApiUrl +
    "CMDashboard/Advertisement/DeleteGovermentAchivement?id=";
  //#endregion

  //#region <Goverment Achivement or advertisement >
  static GovAchivementOrAdvAddUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/Advertisement/AddGovermentAchivementOrAdvertisement";
  static GovAchivementOrAdvEditUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/Advertisement/UpdateGovermentAchivementOrAdvertisement";
  static GovAchivementOrAdvList =
    AppSetting.BaseApiUrl +
    "CMDashboard/Advertisement/GetAllGovermentAchivementOrAdvertisement";
  static GovAchivementOrAdvGetById =
    AppSetting.BaseApiUrl +
    "CMDashboard/Advertisement/GetByIdGovermentAchivementOrAdvertisement?id=";
  //#endregion

  //#region CommonService
  static GetHelpDocUrl =
    AppSetting.BaseApiUrl + "api/Common/GetHelpDocument?module=";

  static GenerateOTPUrl = AppSetting.BaseApiUrl + "api/Common/GenerateOTP";

  static TemplateVerifyUrl =
    AppSetting.BaseApiUrl + "api/Common/GetTemplateType";

  static VerifyOTPUrl = AppSetting.BaseApiUrl + "api/Common/VerifyOTP?oTP=";

  static GetBlockByDistrictUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetBlockByDistrict?Code=";
  static GramPanchayatByBlockUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetGramPanchayatByBlock?Codes=";
  static VillageByGramPanchayatUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetVillageByGramPanchayat?Codes=";

  static GetLocationByDistrictUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetLocationByDistrict?Code=";
  static GetDepartmentDistrictListUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetDepartmentDistrictList?Code=";
  static GetParticipantByCategoryUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetVCPaticipantByPaticipantCategory?Code=";
  static GetOfficeList =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetOffice?Code=";

  static GetDistrictList =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetDistrict?Code=";

  static GetParticipantList =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetParticipant?Code=";

  static GetSchemeList =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetSchemeByDepartment?Code=";

  static GetTahsilByBlockUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetTahsilByDistrict?Code=";

  static GetBlockByUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetBlockByDistict?Code=";

  static GetDistrictByOfficeUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetDistrictByOffice?code=";

  static GetTahsilByMultipleDistrictUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetTahsilByMultipleDistrict?codes=";

  static GetBlockByMultipleDistrictUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetBlockByMultipleDistict?codes=";

  static GetRelatedToYearListUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetOrderRelatedToYearList?moduleName=";
  static GetRelatedToDepartmentListUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetOrderRelatedToDepartmentList";

  static GetCCcategoryByDepartmentUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetCCcategoryByDepartment?Code=";
  static GetOrderSubTypeByTypeUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetOrderSubTypeByType?typeCode=";

  static GetOrderSubTypeByTypeAndDepartment =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetOrderSubTypeByTypeAndDepartment?";

  static GetCCReferenceByCCCategoryUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetCCReferenceByCCCategoryType?ccCatType=";

  static GetCCReferenceByDepartmentUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetReferenceByDepartment?dptCode=";

  static SaveLoginUserLogUrl =
    AppSetting.BaseApiUrl + "Admin/User/SaveLoginUserLog";

  static CommonSendNotificationUrl =
    AppSetting.BaseApiUrl + "api/Common/SendNotification";

  static GetVCCreationWithFilerUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetVCCreationWithFiler";

  static GetDepartmentByDepartmentCategoryUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetDepartmentByDepartmentCategory?code=";

  static GetAllSSOIDByUserTypeUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetAllSSOIDByUserTypeAndDepartment?userType=";

  static GetAchievementCategoryByCodeUrl =
    AppSetting.BaseApiUrl + "api/Common/GetAchievementCategoryByCode?code=";

  static SendNotificationToDepartmentOfficerUrl =
    AppSetting.BaseApiUrl + "api/Common/SendNotificationToDepartmentOfficer";

  static GetConnectWithCMISDataUrl =
    AppSetting.BaseApiUrl + "api/Common/GetConnectWithCMISData";

  static ExportToExcelUrl = AppSetting.BaseApiUrl + "api/Common/ExportToExcel";

  static GetSubCategoryByCategoryCodeUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetSubCategoryByCategoryCode?Catcode=";

  static GetDepartmentMainMenuByDepartment =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetDepartmentMainMenuByDepartment?code=";

  static GetModuleCategoryByModule =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetModuleCategoryByModule?moduleCode=";

  static ModuleSubCategoryByModuleURL =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetModuleSubCategoryByModule?moduleCode=";


  static GetChairpersonByMultipleCategoryUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetChairpersonByMultipleCategory?codes=";

  static GetNewsSubjetByDepartentUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetNewsSubjetByDepartent?codes=";

  static DepartmentByAdminDepartmentCodestUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetDepartmentByAdminDepartmentCodes?codes=";

  static GetSubSubCategoryBySubCategoryCodeUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetSubSubCategoryBySubCategoryCode?code=";

  static getMLAByDisctrictCodeUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetMLAConstituencyByDistrictCode?codes=";

  static ProjectSchemeCategoryByDepartmentUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetProjectSchemeCategoryByDepartment?dptCode=";

  static CMISStatusByModuleIdUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetCMISStatusByModuleId/";

  static PageMasterByPageTypeCodeUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetPageMasterByPageTypeCode?pageTypeCode=";

  static GetDepartmentByCMOOfficerCodeUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetDepartmentByCMOOfficerCode?code=";

  static GetCMISDepartmentByCMOOfficerCodeUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetCMISDepartmentByCMOOfficerCode?code=";

  static KPIByDepartmentCodeUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetKPIByDepartmentCode?dptCode=";

  static KPICategoryByDptCodeForDistrictUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetKPICategoryByDptCodeForDistrict?dptCode=";
  static KPICategoryByDptCodeForDepartmentUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetKPICategoryByDptCodeForDepartment?dptCode=";

  static LoginUserDepartmentListByAdminDepartmentUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetLoginUserDepartmentListByAdminDepartment?admCode=";

  static GetLoginUserDistrictForProjectUrl =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetLoginUserDistrictForProject";

  static EntryTypeByCategoryUrl =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetEntryTypeByCategory?catCode=";

  //#endregion CommonService

  //#endregion

  //#region LMS - Citizen
  //#region <Citizen Letter Type Master>
  static CitizenLetterTypeListUrl =
    AppSetting.BaseApiUrl + "admin/CitizenLetterType/Get";
  static CitizenLetterTypeAddUrl =
    AppSetting.BaseApiUrl + "admin/CitizenLetterType/post";
  static CitizenLetterTypeDetailUrl =
    AppSetting.BaseApiUrl + "admin/CitizenLetterType/Get/";
  static CitizenLetterTypeEditUrl =
    AppSetting.BaseApiUrl + "admin/CitizenLetterType/Put/";
  static CitizenLetterTypeDeleteStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/CitizenLetterType/UpdateDeleteStatus/";
  static CitizenLetterTypeActiveStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/CitizenLetterType/UpdateActiveStatus/";
  static DDlKeyForCitizenLetterType = "ddlCitizenLetterAttachment";
  //#endregion

  //#region <Citizen Attachment Master>
  static CitizenAttachmentListUrl =
    AppSetting.BaseApiUrl + "admin/CitizenAttachment/Get";
  static CitizenAttachmentAddUrl =
    AppSetting.BaseApiUrl + "admin/CitizenAttachment/post";
  static CitizenAttachmentDetailUrl =
    AppSetting.BaseApiUrl + "admin/CitizenAttachment/Get/";
  static CitizenAttachmentEditUrl =
    AppSetting.BaseApiUrl + "admin/CitizenAttachment/Put/";
  static CitizenAttachmentDeleteStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/CitizenAttachment/UpdateDeleteStatus/";
  static CitizenAttachmentActiveStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/CitizenAttachment/UpdateActiveStatus/";
  //#endregion
  //#endregion

  //#region <DepartmentSetupMaster>
  static DptSetupListUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentSetupMaster/Get";
  static DptSetupGetByIdUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentSetupMaster/GetById/";
  static DptSetupAddUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentSetupMaster/Add";
  static DptSetupEditUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentSetupMaster/Update";
  static DptSetupActiveStatusUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentSetupMaster/UpdateActiveStatus/";
  static DptSetupDDLKey = "ddlOffice";
  //#endregion

  //#region <Works Entry>
  static ProjectMasterListUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/Get?subSubCatCode=";
  static ProjectMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/GetById/";
  static DistrictAndAssemblyDepartment =
    AppSetting.BaseApiUrl +
    "admin/ProjectMaster/GetDistrictAndAssemblyDepartment?dptCode=";

  // static ProjectSchemeCategoryByDepartmentUrl =
  // AppSetting.BaseApiUrl + "api/CommonDropDown/GetProjectSchemeCategoryByDepartment?dptCode=";

  static ProjectMasterGetProjectDetailsWithProgressAndChildDataUrl =
    AppSetting.BaseApiUrl +
    "admin/ProjectMaster/GetProjectDetailsWithProgressAndChildData/";
  static ProjectMasterAddUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/Add";
  static ProjectMasterEditUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/Update";
  static ProjectMasterActiveStatusUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectMaster/UpdateActiveStatus/";
  static DeleteProjectBySuperAdminUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectMaster/DeleteProjectBySuperAdmin/";
  static ProjectMasterDDLKey =
    "ddlUserDepartment,ddlDistrict,ddlMLAConstituencyWithDesignation,ddlProjectWorkCategory,ddlMLAConstituencyWithDistrictName,ddlMPConstituency,RadioProjectsUrbanorRural,ddlDepartment,ddlSector,,ddlProjectStatus,ddlProjectProgram,ddlProjectYearOfInitiation,ddlProjectCategory,ddlProjectSubCategory,ddlProjectSubSubCategory";
  static ProjectBudgetDDLKey =
    "ddlOrderModuleName,ddlCMISBudgetYear,ddlDepartmentForCMISReport"; //ddlOrderRelatedToYear,ddlOrderRelatedToDepartment";
  // Update Progress
  static ProjectUpdateProgressUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/UpdateProgress";
  static ProjectShtDetailByIdUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/GetProjectShtDetailById/";
  static ProjectUpdateProgressDDLKey =
    "ddlProjectMileStone,ddlProjectMileStoneStatus";
  static ProjectProgressDetailByIdUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/GetProgressById/";

  static EditUpdateProgress =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/EditUpdateProgress";

  //Reports
  static ProjectReportUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/GetProjectReport";
  static ProjectReportDDLKey =
    "ddlUserAdminDepartment,ddlCMOOfficers,ddlMLAConstituency,ddlDepartment,ddlProjectCategory,ddlDistrict,ddlProjectStatus,ddlCreatedByUserForProject,ddlProjectSubCategory,ddlProjectSubSubCategory,ddlUserDepartment";
  static ExportProjectReportToExcelUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/ExportProjectReportToExcel";
  static ProjectSummaryReportUrl =
    AppSetting.BaseApiUrl + "admin/ProjectMaster/GetProjectSummaryReport";
  static SumOfDynamicLabelSummaryReportUrl =
    AppSetting.BaseApiUrl +
    "admin/ProjectMaster/GetSumOfDynamicLabelSummaryReport";
  static DepartmentWiseSummaryReportUrl =
    AppSetting.BaseApiUrl +
    "admin/ProjectMaster/GetDepartmentWiseSummaryReport";
  static ProjectDepartmentStatusSummaryReportUrl =
    AppSetting.BaseApiUrl +
    "admin/ProjectMaster/GetProjectDepartmentStatusSummaryReport";

  //#endregion

  //#region <DepartmentAuthoritySignatory>
  static DptAuthSignatoryListUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentAuthoritySignatoryMaster/Get";
  static DptAuthSignatoryGetByIdUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentAuthoritySignatoryMaster/GetById/";
  static DptAuthSignatoryAddUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentAuthoritySignatoryMaster/Add";
  static DptAuthSignatoryEditUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentAuthoritySignatoryMaster/Update";
  static DptAuthSignatoryActiveStatusUrl =
    AppSetting.BaseApiUrl +
    "Admin/DepartmentAuthoritySignatoryMaster/UpdateActiveStatus/";
  //#endregion

  //#region <DepartmentReference>
  static DptReferenceListUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentReferenceMaster/Get";
  static DptReferenceGetByIdUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentReferenceMaster/GetById/";
  static DptReferenceAddUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentReferenceMaster/Add";
  static DptReferenceEditUrl =
    AppSetting.BaseApiUrl + "admin/DepartmentReferenceMaster/Update";
  static DptReferenceActiveStatusUrl =
    AppSetting.BaseApiUrl +
    "admin/DepartmentReferenceMaster/UpdateActiveStatus/";
  //#endregion

  //#region <AchievementCategoryMaster>
  static AchievementCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "admin/AchievementCategoryMaster/Get";
  static AchievementCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "admin/AchievementCategoryMaster/Get/";
  static AchievementCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "admin/AchievementCategoryMaster/Post";
  static AchievementCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "admin/AchievementCategoryMaster/Put/";
  static AchievementCategoryMasterActiveStatusUrl =
    AppSetting.BaseApiUrl +
    "admin/AchievementCategoryMaster/UpdateActiveStatus/";
  //#endregion

  //#region <AchievementSubCategoryMaster>
  static AchievementSubCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "admin/AchievementSubCategoryMaster/Get";
  static AchievementSubCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "admin/AchievementSubCategoryMaster/Get/";
  static AchievementSubCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "admin/AchievementSubCategoryMaster/Post";
  static AchievementSubCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "admin/AchievementSubCategoryMaster/Put/";
  static AchievementSubCategoryMasterDeleteUrl =
    AppSetting.BaseApiUrl + "admin/AchievementSubCategoryMaster/Delete/";
  static AchievementSubCategoryMasterActiveStatusUrl =
    AppSetting.BaseApiUrl +
    "admin/AchievementSubCategoryMaster/UpdateActiveStatus/";
  static GetsubcategoryList =
    AppSetting.BaseApiUrl + "api/CommonDropDown/GetSubcategorybydeptandcat?";

  static DDlKeyForAchievementSubCategoryMaster =
    "ddlAchievementCategory,ddlDepartment";

  static UserAchievementSubcategoryList =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetAchievementSubCategoryByCategoryCode?";
  //#endregion

  //#region <ImportantDecisionSubCategoryMaster>
  static ImportantDecisionSubCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecisionSubCategoryMaster/Get";
  static ImportantDecisionSubCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecisionSubCategoryMaster/Get/";
  static ImportantDecisionSubCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecisionSubCategoryMaster/Post";
  static ImportantDecisionSubCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecisionSubCategoryMaster/Put/";
  static ImportantDecisionSubCategoryMasterDeleteUrl =
    AppSetting.BaseApiUrl + "admin/ImportantDecisionSubCategoryMaster/Delete/";
  static ImportantDecisionSubCategoryMasterActiveStatusUrl =
    AppSetting.BaseApiUrl +
    "admin/ImportantDecisionSubCategoryMaster/UpdateActiveStatus/";
  static GetImpDecisionsubcategoryList =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetImpdecSubcategorybydeptandcat?";

  static DDlKeyForImportantDecisionSubCategoryMaster =
    "ddlDepartment,ddlSector,ddlImpCategory";
  //#endregion

  //#region <Generate Order>
  static GenerateOrderPdfUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/GeneratePdf/";
  static GenerateWithEsignPdfUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/GenerateWithEsignPdf";
  static GenerateOrderWordUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/GenerateWord/";
  static GenerateOrderListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/Get";
  static GenerateOrderAuthorityListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/GetAuthorityList";
  static GenerateOrderGetByIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/GetById/";
  static GenerateOrderAddUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/Add";
  static GenerateOrderEditUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/Update";
  static GenerateOrderLock =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/LockToggle/";
  static GenerateOrderSetStatus =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/SetStatus?id=";
  static GenerateOrderDDLKey =
    "ddlBeneficiaryCategory,ddlDepartment,ddlOrderSector,ddlGenerateOrderType,ddlOrderIssueBy,ddlOrderModuleName,ddlOrderRelatedToYear,ddlOrderRelatedToDepartment,RadioLinkedToScheme,ddlAuthoritySignatory,ddlCCReference";
  static GenerateUINumberUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/GenerateUINumber/";
  static GeneratSetFinalAProvalUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/SetFinalAProval/";
  static GeneratFinalAprovalListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/GetFinalApprovalList";
  static GenerateSendNotificationUrl =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/SendNotification";
  static GenerateComplaintDDLKey =
    "ddlModuleName,ddlPriorityModule,ddlEntryTypeModule,ddlCompliantAction,ddlCompliantFilter,ddlApplicationType";
  static ComplaintFilterDDLKey =
    "ddlCompliantFilter,ddlApplicationType,ddlEntryTypeModule";
  //#endregion

  //#endregion

  //#region <hereMap>
  static HereMapGetLatLongUrl =
    "https://places.cit.api.here.com/places/v1/autosuggest";
  //#endregion

  //#region <Photo & Vedio Gallery>
  static GalleryListUrl = AppSetting.BaseApiUrl + "admin/gallery/Get";
  static GalleryAddUpdateUrl = AppSetting.BaseApiUrl + "admin/gallery/Post";
  static GalleryDetailUrl = AppSetting.BaseApiUrl + "admin/gallery/Get/";
  static GalleryDeleteStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/gallery/UpdateDeleteStatus/";
  static GalleryActiveStatusChangeUrl =
    AppSetting.BaseApiUrl + "admin/gallery/UpdateActiveStatus/";
  static GalleryDropdownKeys = "ddlDepartment,ddlGalleryUploadType";
  static ThumbnailSize = "1";
  //#endregion

  //#region <Dropdown Keys>
  static ddlSchemes = "ddlSchemes";
  static ddlDepartmentSubMenuList = "ddlDepartmentSubMenuList";
  //#endregion

  //#region <Cancellation Order>
  static SaveCancellationOrderURL =
    AppSetting.BaseApiUrl + "CMDashboard/GenerateOrder/SaveCancellationOrder";
  static GetByLoggedInDepartmentURL =
    AppSetting.BaseApiUrl +
    "Admin/DepartmentSetupMaster/GetByLoggedInDepartment";
  static ddlCancellationOrderKey = "ddlCancellationReason";
  //#endregion

  //#region <VC Participant>
  static VCParticipantAddURL =
    AppSetting.BaseApiUrl + "VideoConferencing/AddParticipant/Post";
  static VCParticipantUpdateURL =
    AppSetting.BaseApiUrl + "VideoConferencing/AddParticipant/Put";
  static VCParticipantGetListURL =
    AppSetting.BaseApiUrl + "VideoConferencing/AddParticipant/Get?vCCode=";

  static VCReportURL =
    AppSetting.BaseApiUrl + "VideoConferencing/AddParticipant/GetVcReport";
  static VCParticipantGetParicipantReportURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/AddParticipant/GetParicipantReport?vCCode=";
  static VCParticipantGetByIdURL =
    AppSetting.BaseApiUrl + "VideoConferencing/AddParticipant/Get/";
  static ParticipantExcelUploadURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/AddParticipant/ParticipantExcelUpload";

  static deleteDataFromExcelURL =
    AppSetting.BaseApiUrl + "VideoConferencing/AddParticipant/Delete/";

  static GetParticipantExcelUploadTempListURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/AddParticipant/GetParticipantExcelUploadTempList";

  static ParticipantExcelFinalSubmitURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/AddParticipant/ParticipantExcelFinalUpload";
  static GetExcelFileDownloadUrl =
    AppSetting.BaseApiUrl +
    "VideoConferencing/AddParticipant/GetExcelFileDownload";

  static VCParticipantUpdateStatusURL =
    AppSetting.BaseApiUrl + "VideoConferencing/AddParticipant/UpdateStatus/";

  static VCParticipantDeleteURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/AddParticipant/DeleteParticipant/";

  static MarkPresentAbsentURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/AddParticipant/MarkPresentAbsent/";

  // static ddlVCParticipantListKey = "ddlCreateVCList,ddlVCType,ddlVCParticipantCategory";
  static ddlVCParticipantAddUpdateKey =
    "ddlCreateVCList,ddlVCParticipantCategory,ddlVCMode,ddlCurrentDateVC";
  static ddlVCCreationKey =
    "ddlVCType,ddlVCParticipantCategory,ddlCurrentDateVC,ddlVCCategory,ddlDepartment";
  //#endregion

  //#region VC Graphical Report
  static VCGReportByDistrictURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/VCGraphicalReport/GetDistrictCountByVC?VCCode=";
  static VCGReportByLocationURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/VCGraphicalReport/GetLocationCountByDistrict";
  static VCGParticipantByLocationURL =
    AppSetting.BaseApiUrl +
    "VideoConferencing/VCGraphicalReport/GetParticipantByLocation";
  //#endregion VC Graphical Report

  //#region Jankalyan Entry Type Master
  static JankalyanEntryListUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanEntryTypeMaster/GetAll";
  static JankalyanEntryAddUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanEntryTypeMaster/Post";
  static JankalyanEntryUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanEntryTypeMaster/Put/";
  static JankalyanEntryGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanEntryTypeMaster/Get/";
  static JankalyanEntryUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanEntryTypeMaster/UpdateStatus/";
  //#endregion

  //#region <Department Contact Details>

  static DepartmentContactDetailsGetAllUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentContactDetails/GetAll";
  static DepartmentContactDetailsGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentContactDetails/GetById/";
  static DepartmentContactDetailsAddUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentContactDetails/Post";
  static DepartmentContactDetailsUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentContactDetails/UpdateStatus/";
  static GetDepartmentByCodeUrl =
    AppSetting.BaseApiUrl +
    "Admin/DepartmentContactDetails/GetDepartmentByCode/";
  static DepartmentContactDetailsDDLKey =
    "ddlDptContactDesignation,ddlDepartmentContactCategory";

  static DepartmentOfficerByDepartmentUrl =
    AppSetting.BaseApiUrl +
    "Admin/DepartmentContactDetails/GetDepartmentOfficerByDepartment?departmentCode=";

  //#endregion

  //#region Designation Master
  static DesignationListUrl =
    AppSetting.BaseApiUrl + "Admin/DesignationMaster/GetAll";
  static DesignationAddUrl =
    AppSetting.BaseApiUrl + "Admin/DesignationMaster/Post";
  static DesignationUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/DesignationMaster/Put/";
  static DesignationGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/DesignationMaster/Get/";
  static DesignationUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/DesignationMaster/UpdateStatus/";
  //#endregion

  //#region EmailStatus
  static SendEmailstatuUrl =
    AppSetting.BaseApiUrl + "Admin/StatusEmail/SendEmailToDepartment/";

  static ImportantDepartmentContactDetailsGetAllUrl =
    AppSetting.BaseApiUrl +
    "Admin/StatusEmail/GetAllDepartmentContactDetailList";
  //#endregion

  //#region  <JAN-Category-master>

  static JanCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/JANCategoryMaster/Get";
  static JanCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/JANCategoryMaster/Post";
  static JanCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/JANCategoryMaster/Get/";
  static JanCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/JANCategoryMaster/Put";
  static JanCategoryMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/JANCategoryMaster/UpdateStatus/";

  //#endregion <JAN-Category-master>

  //#region Chief Minister Profile
  static ChiefMinisterListUrl =
    AppSetting.BaseApiUrl + "Admin/CMProfile/GetAll";
  static ChiefMinisterAddUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/CMProfile/AddUpdate";
  static ChiefMinisterUpdateActiveStatusUrl =
    AppSetting.BaseApiUrl + "Admin/CMProfile/UpdateActiveStatus";
  static ChiefMinisterUpdateDeleteStatusUrl =
    AppSetting.BaseApiUrl + "Admin/CMProfile/UpdateDeleteStatus";
  static ChiefMinisterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/CMProfile/GetbyId";
  static DDLkeyForCMProfile = "ddlDesignation,ddlNameTitle";
  //#endregion

  //#region  <Participant Category Master>

  static ParticipantCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/ParticipantCategoryMaster/Get";
  static ParticipantCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/ParticipantCategoryMaster/Post";
  static ParticipantCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ParticipantCategoryMaster/Get/";
  static ParticipantCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/ParticipantCategoryMaster/Put";
  static ParticipantCategoryMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "Admin/ParticipantCategoryMaster/UpdateActiveStatus/";

  //#endregion <Participant Category Master>

  //#region  <Project Sub Category Master>

  static ProjectSubCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSubCategoryMaster/Get";
  static ProjectSubCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSubCategoryMaster/Post";
  static ProjectSubCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSubCategoryMaster/Get/";
  static ProjectSubCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSubCategoryMaster/Put";
  static ProjectSubCategoryMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "Admin/ProjectSubCategoryMaster/UpdateActiveStatus/";
  static ProjectSubCategoryMasterDDLKey = "ddlProjectCategory";

  static ProjectSubCategoryByCategoryCodeUrl =
    AppSetting.BaseApiUrl +
    "Admin/ProjectSubCategoryMaster/GetProjectSubCategoryByCategoryCode?catCode=";
  static ProjectSubCategoryDeleteUrl =
    AppSetting.BaseApiUrl +
    "Admin/ProjectSubCategoryMaster/ProjectSubCategoryDelete/";

  //#endregion <Project Sub Category Master>

  //#region  <Project-Category-master>

  static ProjectCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectCategoryMaster/Get";
  static ProjectCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectCategoryMaster/Post";
  static ProjectCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectCategoryMaster/Get/";
  static ProjectCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectCategoryMaster/Put";
  static ProjectCategoryMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectCategoryMaster/UpdateStatus/";

  //#endregion <Project-Category-master>

  //#region  <Project-milestone-master>

  static ProjectMileStoneMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectMileStoneMaster/Get";
  static ProjectMileStoneMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectMileStoneMaster/Post";
  static ProjectMileStoneMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectMileStoneMaster/Get/";
  static ProjectMileStoneMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectMileStoneMaster/Put";
  static ProjectMileStoneMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectMileStoneMaster/UpdateStatus/";
  static MilestoneByMilestoneCodeUrl =
    AppSetting.BaseApiUrl +
    "Admin/ProjectMileStoneMaster/GetMilestoneByMilestoneCode/";
  //#endregion <Project-milestone-master>

  //#region  <News-Classification-master>

  static NewsClassificationMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/NewsClassificationMaster/Get";
  static NewsClassificationMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/NewsClassificationMaster/Post";
  static NewsClassificationMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/NewsClassificationMaster/Get/";
  static NewsClassificationMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/NewsClassificationMaster/Put";
  static NewsClassificationMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/NewsClassificationMaster/UpdateStatus/";

  //#endregion <News-Classification-master>

  //#region  <News-Subject-master>

  static NewsSubjectMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/NewsSubjectMaster/Get";
  static NewsSubjectMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/NewsSubjectMaster/Post";
  static NewsSubjectMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/NewsSubjectMaster/Get/";
  static NewsSubjectMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/NewsSubjectMaster/Put";
  static NewsSubjectMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/NewsSubjectMaster/UpdateStatus/";

  //#endregion <News-Subject-master>

  //#region  <News-Newspaper-master>

  static NewspaperMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/NewspaperMaster/Get";
  static NewspaperMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/NewspaperMaster/Post";
  static NewspaperMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/NewspaperMaster/Get/";
  static NewspaperMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/NewspaperMaster/Put";
  static NewspaperMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/NewspaperMaster/UpdateStatus/";
  static NewspaperMasterDDLKey = "ddlNewspaperNewsMode,ddlNewspaperNewsType";

  //#endregion <News-Newspaper-master>

  //#region  <News-Newspaper>

  static NewspaperListUrl = AppSetting.BaseApiUrl + "CMDashboard/Newspaper/Get";
  static NewspaperAddUrl = AppSetting.BaseApiUrl + "CMDashboard/Newspaper/Post";
  static NewspaperGetByIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Newspaper/Get/";
  static NewspaperEditUrl = AppSetting.BaseApiUrl + "CMDashboard/Newspaper/Put";
  static NewspaperUpdateStatusUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Newspaper/UpdateStatus/";
  static NewspaperDDLKey = "ddlNewspaperSourceType,ddlVCParticipantCategory";
  static NewspaperTransactionDetailWithProgressListUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/Newspaper/GetNewspaperTransactionDetailWithProgressList/";

  // Update progress
  static NewspaperUpdateNewsProgressUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Newspaper/UpdateNewsProgress";
  static NewspaperUpdateNewsProgressDDLKey =
    "ddlNewspaperMaster,ddlNewspaperClassification,ddlNewspaperPublicationType,ddlNewspaperEdition,ddlNewspaperPageNumber,ddlNewspaperProgressNewsType,ddlNewspaperCoverageType";
  static NewspaperShortDetailByIdsUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/Newspaper/GetNewspaperShortDetailById/";
  static NewsProgressByIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Newspaper/GetNewsProgressById/";
  static EditNewsProgressUrl =
    AppSetting.BaseApiUrl + "CMDashboard/Newspaper/EditNewsProgress";
  //#endregion <News-Newspaper>

  //#region  <MLA-Constituency-Master>

  static MLAConstituencyMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/MLAConstituencyMaster/Get";
  static MLAConstituencyMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/MLAConstituencyMaster/Post";
  static MLAConstituencyMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/MLAConstituencyMaster/Get/";
  static MLAConstituencyMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/MLAConstituencyMaster/Put";
  static MLAConstituencyMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/MLAConstituencyMaster/UpdateStatus/";
  static MLAConstituencyDDLKey = "ddlDistrict,ddlDesignation";

  //#endregion <MLA-Constituency-Master>

  //#region  <MP-Constituency-Master>

  static MPConstituencyMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/MPConstituencyMaster/Get";
  static MPConstituencyMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/MPConstituencyMaster/Post";
  static MPConstituencyMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/MPConstituencyMaster/Get/";
  static MPConstituencyMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/MPConstituencyMaster/Put";
  static MPConstituencyMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/MPConstituencyMaster/UpdateStatus/";

  //#endregion <MP-Constituency-Master>

  //#region  <Project Sub Sub Category Master>

  static ProjectSubSubCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSubSubCategoryMaster/Get";
  static ProjectSubSubCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSubSubCategoryMaster/Post";
  static ProjectSubSubCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSubSubCategoryMaster/Get/";
  static ProjectSubSubCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSubSubCategoryMaster/Put";
  static ProjectSubSubCategoryMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "Admin/ProjectSubSubCategoryMaster/UpdateActiveStatus/";
  static AllSubSubCategoryForDepartmentUrl =
    AppSetting.BaseApiUrl +
    "Admin/ProjectSubSubCategoryMaster/GetAllSubSubCategoryForDepartment";
  static ProjectSubSubCategoryDeleteUrl =
    AppSetting.BaseApiUrl +
    "Admin/ProjectSubSubCategoryMaster/ProjectSubSubCategoryDelete/";
  static ProjectSubSubCategoryMasterDDLKey = "ddlProjectCategory";

  //#endregion <Project Sub Sub Category Master>

  //#region  <Project Scheme Category Master>

  static ProjectSchemeCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSchemeCategoryMaster/Get";
  static ProjectSchemeCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSchemeCategoryMaster/Post";
  static ProjectSchemeCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSchemeCategoryMaster/Get/";
  static ProjectSchemeCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/ProjectSchemeCategoryMaster/Put";
  static ProjectSchemeCategoryMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "Admin/ProjectSchemeCategoryMaster/UpdateActiveStatus/";
  static ProjectSchemeCategoryMasterDDLKey = "ddlProjectProgramSchemeType";

  //#endregion <Project Scheme Category Master>

  //#region  <Child Page Master>

  static ChildPageMasterGetAllUrl =
    AppSetting.BaseApiUrl + "Admin/ChildPageMaster/Get";
  static ChildPageMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/ChildPageMaster/Post";
  static ChildPageMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ChildPageMaster/Get/";
  static ChildPageMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/ChildPageMaster/Put";
  static ChildPageMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/ChildPageMaster/UpdateStatus/";
  static ChildPageMasterDDLKey =
    "ddlChildPageDescriptionCategory,ddlPageType,ddlLookUpType,ddlCommonMaster,ddlApplicationType,ddlManualType";

  static PageDetailByPageCodeUrl =
    AppSetting.BaseApiUrl + "Admin/ChildPageMaster/GetPageDetailByPageCode/";

  static PageListByMenuNameUrl =
    AppSetting.BaseApiUrl + "Admin/ChildPageMaster/GetPageListByMenuName";
  //#endregion <Project Sub Sub Category Master>

  //#region TransferDept
  static TransferDeptstatuUrl =
    AppSetting.BaseApiUrl + "Admin/TransferDept/Post";

  static TransferDeptAllUrl = AppSetting.BaseApiUrl + "Admin/TransferDept/Get";
  static TransferDeptAlloldUrl =
    AppSetting.BaseApiUrl + "Admin/TransferDept/Postold";
  //#endregion

  //#region  <kpi Category Master>

  static KPICategoryMasterListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/KPICategoryMaster/Get";
  static KPICategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/KPICategoryMaster/Post";
  static KPICategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/KPICategoryMaster/Get/";
  static KPICategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/KPICategoryMaster/Put";
  static KPICategoryMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/KPICategoryMaster/UpdateActiveStatus/";

  //#endregion

  //#region  <Comparative Parameter Master>

  static CamparativeParameterMasterListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CamparativeParameterMaster/Get";
  static CamparativeParameterMasterAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CamparativeParameterMaster/Post";
  static CamparativeParameterMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CamparativeParameterMaster/Get/";
  static CamparativeParameterMasterEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CamparativeParameterMaster/Put";
  static CamparativeParameterMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/CamparativeParameterMaster/UpdateActiveStatus/";
  static ComparativeParameterDDLKey =
    "RadioParameterTargetBased,ddlComparativeParameterCategory,ddlComparativeYearGrandTotal,ddlBeneficiaryCategory,ddlPhysicalUnit,ddlFinancialUnit,ddlKPICategory,ddlDepartment";
  //#endregion

  //#region  <Comparative Year Master>

  static ComparativeYearMasterListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/ComparativeYearMaster/Get";
  static ComparativeYearMasterAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/ComparativeYearMaster/Post";
  static ComparativeYearMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/ComparativeYearMaster/Get/";
  static ComparativeYearMasterEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/ComparativeYearMaster/Put";
  static ComparativeYearMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/ComparativeYearMaster/UpdateActiveStatus/";

  //#endregion

  //#region  <Comparative Parameter Target entry>

  static CamparativeTargetEntryListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CamparativeTargetEntry/Get";
  static CamparativeTargetEntryAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CamparativeTargetEntry/Post";
  static CamparativeTargetEntryGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CamparativeTargetEntry/Get/";
  static CamparativeTargetEntryEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CamparativeTargetEntry/Put";
  static CamparativeTargetEntryUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/CamparativeTargetEntry/UpdateActiveStatus/";
  static CamparativeAllParameterListUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/CamparativeTargetEntry/GetAllParameter";
  static ComparativeTargetEnrtyDDLKey =
    "ddlKPICategory,ddlDepartment,ddlYearMaster,ddlDepartmentForDepartmentalProgressList";
  static IsTargetEntryDuplicateUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/CamparativeTargetEntry/IsDuplicateData";

  //#endregion

  //#region  <Current Government Entry>

  static CurrentGovernmentEntryListUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/CurrentGovernmentEntry/Get?catCode=";
  static CurrentGovernmentEntryAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CurrentGovernmentEntry/Post";
  static CurrentGovernmentEntryGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CurrentGovernmentEntry/Get/";
  static CurrentGovernmentEntryEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/CurrentGovernmentEntry/Put";
  static CurrentGovernmentEntryUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/CurrentGovernmentEntry/UpdateActiveStatus/";
  static CurrentGovernmentEntryDDLKey =
    "ddlComparativeParameterCategory,ddlKPICategory,ddlDepartmentForDepartmentalProgressList,ddlYearMaster,ddlMonth,ddlDepartmentForDistrictKPIList";
  static IsCurrentGovDuplicateUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/CurrentGovernmentEntry/IsDuplicateData";

  //#endregion

  //#region  <Previous Government Entry>

  static PreviousGovernmentEntryListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/PreviousGovernmentEntry/Get";
  static PreviousGovernmentEntryAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/PreviousGovernmentEntry/Post";
  static PreviousGovernmentEntryGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/PreviousGovernmentEntry/Get/";
  static PreviousGovernmentEntryEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/PreviousGovernmentEntry/Put";
  static PreviousGovernmentEntryUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/PreviousGovernmentEntry/UpdateActiveStatus/";
  static PreviousGovernmentEntryDDLKey = "ddlKPICategory,ddlDepartment";
  static GetAllParameterList =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/CamparativeTargetEntry/GetAllParameter";
  static AllYearListUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/PreviousGovernmentEntry/GetAllYearList";

  //#endregion

  //#region E-Booklet

  static DDlKeyForEbooklet =
    "ddlDepartmentForDepartmentalProgressList,ddlBeneficiaryCategory,RadioDepartmentCategory,ddlKPICategory";
  static GetEbookletListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/EBooklet/GeEbooklet";

  //#endregion

  //#region  <Comparative Year Master>

  static JankalyanAdvertisementListUrl =
    AppSetting.BaseApiUrl + "CMDashboard/JankalyanAdvertisement/Get";
  static JankalyanAdvertisementAddUrl =
    AppSetting.BaseApiUrl + "CMDashboard/JankalyanAdvertisement/Post";
  static JankalyanAdvertisementGetByIdUrl =
    AppSetting.BaseApiUrl + "CMDashboard/JankalyanAdvertisement/Get/";
  static JankalyanAdvertisementEditUrl =
    AppSetting.BaseApiUrl + "CMDashboard/JankalyanAdvertisement/Put";
  static JankalyanAdvertisementUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "CMDashboard/JankalyanAdvertisement/UpdateActiveStatus/";
  static DDlKeyForJankalyanAdvertisement = "ddlAdvertisementPopUpCategory";
  //#endregion

  //#region  <Help Document Type Master>

  static HelpDocumentTypeMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/HelpDocumentTypeMaster/Get";
  static HelpDocumentTypeMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/HelpDocumentTypeMaster/Post";
  static HelpDocumentTypeMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/HelpDocumentTypeMaster/Get/";
  static HelpDocumentTypeMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/HelpDocumentTypeMaster/Put";
  static HelpDocumentTypeMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/HelpDocumentTypeMaster/UpdateStatus/";

  //#endregion <Help Document Type Master>

  //#region  <District kpi Entry>

  static DistrictKPIListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictKPI/Get?catCode=";
  static DistrictKPIAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictKPI/Post";
  static DistrictKPIGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictKPI/Get/";
  static DistrictKPIEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictKPI/Put";
  static DistrictKPIUpdateStatusUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictKPI/UpdateActiveStatus/";
  static DistrictKPIDDLKey =
    "ddlKPICategory,ddlDepartment,ddlYearMaster,ddlMonth";
  static IsDistrictKPIDuplicateUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictKPI/IsDuplicateData";

  static DistrictKPIAllParameterListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictKPI/GetAllParameterList";

  //#endregion

  //#region  <menu classifiaction master>
  static MenuClassificationListUrl =
    AppSetting.BaseApiUrl + "Admin/MenuClassification/Get";
  static MenuClassificationAddUrl =
    AppSetting.BaseApiUrl + "Admin/MenuClassification/Post";
  static MenuClassificationUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/MenuClassification/Put/";
  static MenuClassificationGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/MenuClassification/Get/";
  static MenuClassificationUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/MenuClassification/UpdateStatus/";
  static DDlKeyForMenuClassification =
    "RadioMenuClassificationType,ddlClassification";
  //#endregion

  //#region  <menu classifiaction page type master>
  static ClassificationPageTypeListUrl =
    AppSetting.BaseApiUrl + "Admin/ClassificationPageType/Get";
  static ClassificationPageTypeAddUrl =
    AppSetting.BaseApiUrl + "Admin/ClassificationPageType/Post";
  static ClassificationPageTypeUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/ClassificationPageType/UpdatePageType";
  static ClassificationPageTypeGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ClassificationPageType/Get/";
  static ClassificationPageTypeUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/ClassificationPageType/UpdateStatus/";
  //#endregion

  //#region  <Departmental Progress>

  static DepartmentalProgressListUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/DepartmentalProgress/Get?catCode=";
  static DepartmentalProgressAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DepartmentalProgress/Post";
  static DepartmentalProgressGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DepartmentalProgress/Get/";
  static DepartmentalProgressEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DepartmentalProgress/Put";
  static DepartmentalProgressUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/DepartmentalProgress/UpdateActiveStatus/";
  static DepartmentalProgressDDLKey =
    "ddlKPICategory,ddlDepartmentForDepartmentalProgressList,ddlYearMaster,ddlMonth,ddlDepartmentForDistrictKPIList";
  static IsDepartmentalProgressDuplicateUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/DepartmentalProgress/IsDuplicateData";

  //#endregion

  //#region  <District Progress Entry>

  static DistrictProgressListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictProgress/Get?catCode=";
  static DistrictProgressAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictProgress/Post";
  static DistrictProgressGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictProgress/Get/";
  static DistrictProgressEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/DistrictProgress/Put";
  static DistrictProgressUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/DistrictProgress/UpdateActiveStatus/";
  static DistrictProgressDDLKey =
    "ddlKPICategory,ddlDepartment,ddlYearMaster,ddlMonth";
  static IsDistrictProgressDuplicateUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/DistrictProgress/IsDuplicateData";

  static DistrictProgressAllParameterListUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/DistrictProgress/GetAllParameterList";

  //#endregion

  //#region  <Order Type Master>

  static OrderTypeMasterListUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/OrderTypeMaster/Get";
  static OrderTypeMasterAddUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/OrderTypeMaster/Post";
  static OrderTypeMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/OrderTypeMaster/Get/";
  static OrderTypeMasterEditUrl =
    AppSetting.BaseApiUrl + "ComparetiveModule/OrderTypeMaster/Put";
  static OrderTypeMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "ComparetiveModule/OrderTypeMaster/UpdateActiveStatus/";
  static DDLKeyForOrderType =
    "ddlJankalyanCategory,ddlClassification,ddlClassificationPageType,RadioDepartmentDistrictbutton,ddlCommonCategoryLookup";
  //#endregion

  static Getcategorybydepartmentcode =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/Getcategorybydepartmentcode?departmentCode=";

  static GetJankalyanCategorybyDepartmentCode =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetJankalyanCategorybyDepartmentCode?departmentCode=";

  static JankalyanCategorybyDepartmentAndLoginUserURL =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetJankalyanCategorybyDepartmentAndLoginUser?departmentCode=";

  static GetJankalyanpressReleaseCategorybyDepartmentAndLoginUser =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetJankalyanpressReleaseCategorybyDepartmentAndLoginUser?departmentCode=";

  static GetJankalyanEntryTypebyDepartmentCode =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetJankalyanEntryTypebyDepartmentCode?departmentCode=";

  static GetGeneralSubCategory =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetGeneralSubCategory?CategoryCode=";

  //#region  <Press release>

  static PressReleaseListUrl =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressRelease/GetAll";
  static PressReleaseAddUrl =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressRelease/Post";
  static PressReleaseGetByIdUrl =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressRelease/GetById/";
  static PressReleaseEditUrl =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressRelease/Put";
  static PressReleaseUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/PressRelease/UpdateActiveStatus/";
  static PressReleaseDDLKey =
    "ddlModifiedBypressRelease,ddlPressReleaseLookupCategory,ddlPressReleaseDepartment,RadioStateDistrict,ddlVCParticipantCategory,ddlDepartmentForDistrictKPIList,ddlDesignationForPressRelease,ddlPressReleaseCategory,ddlDepartment,ddlDistrict";

  static PressReleaseReportDDLKey =
    "ddlPressReleaseDepartment,ddlDepartmentForDistrictKPIList,ddlPressReleaseCategory,ddlDesignationForPressRelease,ddlModifiedBypressRelease";

  static GetVIPPersonListOfPressRelease =
    AppSetting.BaseApiUrl +
    "api/CommonDropDown/GetVIPPersonListOfPressRelease?Code=";

  static UserConfigrationListUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/PressRelease/GetAllUserConfigration";
  static UserConfigrationAddUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/PressRelease/CreateUserConfigration";
  static UserConfigrationGetByIdUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/PressRelease/GetByIdUserConfigration/";
  static UserConfigrationEditUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/PressRelease/EditUserConfigration";
  static UserConfigrationUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/PressRelease/UpdateActiveStatusUserConfigration/";
  static UserConfigrationDDLKey = "ddlUserType,ddlUser";

  //#endregion

  //#region  <tender>

  static TenderMasterListUrl =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/Tendor/GetAll";
  static TenderMasterAddUrl =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/Tendor/Post";
  static TenderMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/Tendor/GetById/";
  static TenderMasterEditUrl =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/Tendor/Put";
  static TenderMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/Tendor/UpdateActiveStatus/";

  static UpdateTenderProgressUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/Tendor/UpdateTenderProgress";
  static ModifyTenderProgressUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/Tendor/ModifyTenderProgress";
  static TenderDetailWithChildListUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/Tendor/GetTenderDetailWithChildList/";
  static TenderProgressByIdUrl =
    AppSetting.BaseApiUrl +
    "TenderPressReleaseModule/Tendor/GetTenderProgressById/";
  static TenderMasterDDLKey = "ddlDepartment";
  //#endregion

  //#region Testimonial
  static GetAllTestimonialForBackend =
    AppSetting.BaseApiUrl + "/api/JankalyanHome/GetAllTestimonialForBackend";

  static UpdateTestimonialStatus =
    AppSetting.BaseApiUrl + "/api/JankalyanHome/UpdateTestimonialStatus/";
  static GetAchievementListBySearchFilter =
    AppSetting.BaseApiUrl + "/api/JankalyanHome/GetAchievementListBySearchFilter/";
  //#endregion

  //#region  <Department menu classification>

  static DepartmentMenuClassificationListUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMenuClassification/GetAll";
  static DepartmentMenuClassificationAddUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMenuClassification/Post";
  static DepartmentMenuClassificationGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMenuClassification/GetById/";
  static DepartmentMenuClassificationEditUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentMenuClassification/Put";
  static DepartmentMenuClassificationUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "Admin/DepartmentMenuClassification/UpdateActiveStatus/";
  static DDlKeyForDepartmentMenuClassification =
    "ddlClassification,ddlCreatedByDepartmentMenu";
  //#endregion

  //#region  <Department Submenu classification>

  static DepartmentSubMenuListUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentSubMenu/Get";
  static DepartmentSubMenuAddUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentSubMenu/Post";
  static DepartmentSubMenuGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentSubMenu/Get/";
  static DepartmentSubMenuEditUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentSubMenu/Put";
  static DepartmentSubMenuUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentSubMenu/UpdateActiveStatus/";
  static DDlKeyForDepartmentSubMenu =
    "RadioDepartmentSubMenuRedirectionManagement,ddlClassification,ddlModuleCategoryList,ddlDepartmentSubMenuList,RadioDepartmentSubMenuShowAsSeparate";

  static DDlKeyForImportSectionMenuAndSubMenu =
    "ddlDepartment";
  static ImportSectionMenuAndSubMenuUrl =
    AppSetting.BaseApiUrl + "Admin/DepartmentSubMenu/ImportSectionMenuAndSubMenu";

  static DDlKeyForDepartmentSubMenuFilter =
    "ddlCreatedByUserForDepartmentSubMenu,ddlModuleCategoryList,ddlDepartmentSubMenuList,ddlModifiedByUserForDepartmentSubMenu,RadioDepartmentSubMenuShowAsSeparate,RadioDepartmentSubMenuRedirectionManagement";
  //#endregion

  //#region  <Department Section mapping>

  static DepartmentSectionMappingListUrl =
    AppSetting.BaseApiUrl + "DepartmentWebsite/DepartmentSectionMapping/Get";
  static DepartmentSectionMappingAddUrl =
    AppSetting.BaseApiUrl + "DepartmentWebsite/DepartmentSectionMapping/Post";
  static DepartmentSectionMappingGetByIdUrl =
    AppSetting.BaseApiUrl + "DepartmentWebsite/DepartmentSectionMapping/Get/";
  static DepartmentSectionMappingEditUrl =
    AppSetting.BaseApiUrl + "DepartmentWebsite/DepartmentSectionMapping/Put";
  static DepartmentSectionMappingUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "DepartmentWebsite/DepartmentSectionMapping/UpdateActiveStatus/";
  static DDlKeyForDepartmentSectionMapping = "ddlDepartmentSectionMaster,ddlModifiedByUserForDepartmentSectionMapping";
  //#endregion

  //#region  <Beneficiary Category Master>

  static BeneficiaryCategoryMasterListUrl =
    AppSetting.BaseApiUrl + "Admin/BeneficiaryCategoryMaster/Get";
  static BeneficiaryCategoryMasterAddUrl =
    AppSetting.BaseApiUrl + "Admin/BeneficiaryCategoryMaster/Post";
  static BeneficiaryCategoryMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/BeneficiaryCategoryMaster/Get/";
  static BeneficiaryCategoryMasterEditUrl =
    AppSetting.BaseApiUrl + "Admin/BeneficiaryCategoryMaster/Put";
  static BeneficiaryCategoryMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "Admin/BeneficiaryCategoryMaster/UpdateActiveStatus/";
  //#endregion

  //#region angular editor

  static editorConfig = {
    editable: true,
    spellcheck: true,
    height: "15rem",
    minHeight: "5rem",
    maxHeight: "100px",
    width: "auto",
    minWidth: "0",
    translate: "yes",
    enableToolbar: true,
    showToolbar: true,
    placeholder: "Enter text here...",
    defaultParagraphSeparator: "",
    // defaultFontName: 'Mangal',
    defaultFontSize: "",
    fonts: [
      { class: "arial", name: "Arial" },
      { class: "times-new-roman", name: "Times New Roman" },
      { class: "calibri", name: "Calibri" },
      { class: "comic-sans-ms", name: "Comic Sans MS" },
      { class: "Mangal", name: "Mangal" },
    ],

    sanitize: true,
    toolbarPosition: "top",
  };
  //#endregion

  //#region ComplainEntryTypeMaster
  static ComplainEntryTypeListUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainEntryTypeMaster/Get";
  static ComplainEntryTypeAddUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainEntryTypeMaster/Post";
  static ComplainEntryTypeUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainEntryTypeMaster/Put/";
  static ComplainEntryTypeGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainEntryTypeMaster/Get/";
  static ComplainEntryTypeUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainEntryTypeMaster/UpdateStatus/";
  //#endregion

  //#region ComplainStatusMasterViewModel
  static ComplainStatusListUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainStatusMaster/Get";
  static ComplainStatusAddUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainStatusMaster/Post";
  static ComplainStatusUpdateUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainStatusMaster/Put/";
  static ComplainStatusGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainStatusMaster/Get/";
  static ComplainStatusUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainStatusMaster/UpdateStatus/";
  static ComplainStatusChangeStatusUrl =
    AppSetting.BaseApiUrl + "Admin/ComplainStatusMaster/ChangeStatus/";
  //#endregion

  //#region  <Section Master>

  static SectionMasterListUrl =
    AppSetting.BaseApiUrl + "DepartmentWebsite/SectionMaster/GetAll";
  static SectionMasterAddUrl =
    AppSetting.BaseApiUrl + "DepartmentWebsite/SectionMaster/Post";
  static SectionMasterGetByIdUrl =
    AppSetting.BaseApiUrl + "DepartmentWebsite/SectionMaster/GetById/";
  static SectionMasterEditUrl =
    AppSetting.BaseApiUrl + "DepartmentWebsite/SectionMaster/Put";
  static SectionMasterUpdateStatusUrl =
    AppSetting.BaseApiUrl +
    "DepartmentWebsite/SectionMaster/UpdateActiveStatus/";
  // static DDlKeyForDepartmentSectionMapping = "ddlDepartmentSectionMaster";
  //#endregion

  //#region  <Jankalyan Configuration>

  static JankalyanConfigurationListUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanConfiguration/Get";
  static JankalyanConfigurationAddUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanConfiguration/Post";
  static JankalyanConfigurationGetByIdUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanConfiguration/Get/";
  static JankalyanConfigurationEditUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanConfiguration/Put";
  static JankalyanConfigurationUpdateStatusUrl =
    AppSetting.BaseApiUrl + "Admin/JankalyanConfiguration/UpdateActiveStatus/";
  static TopRecordForConfigurationUrl =
    AppSetting.BaseApiUrl +
    "Admin/JankalyanConfiguration/GetTopRecordForConfiguration";

  //#endregion

  //#regin <press-release report>
  static PressReleaseReportCreatedByUsers =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/CreatedByUser";
  static PressReleaseReportCategorySubCategory =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/CategorySubCategory";
  static PressReleaseReportDeptCatSubcat =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/DeptCatSubcat";
  static PressReleaseReportLookupCategory =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/LookupCategory";
  static PressReleaseReportDeptLookupCat =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/DeptLookupCat";
  static PressReleaseReportVIPDepartment =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/VIPDepartment";
  static PressReleaseReportDistCatSubcat =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/DistCatSubcat";
  static PressReleaseReportDistLookupCategory =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/DistLookupCategory";
  static PressReleaseReportDepartmentDistrict =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/DepartmentDistrict";
  static PressReleaseReportVIPDistrict =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/VIPDistrict";
  static PressReleaseReportVIPDeptDist =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/VIPDeptDist";
  static PressReleaseReportUserDate =
    AppSetting.BaseApiUrl + "TenderPressReleaseModule/PressReleaseReport/UserDate";
  //#endregion



    //#region <AchievementCategoryMaster>

  static AdvtConfigurationGetByIdUrl =
    AppSetting.BaseApiUrl + "admin/AdvtConfiguration/Get?id=";
  static AdvtConfigurationAddUrl =
    AppSetting.BaseApiUrl + "admin/AdvtConfiguration/AddUpdate";
  //#endregion

}
