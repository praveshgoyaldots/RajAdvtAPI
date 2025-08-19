using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.Services;
using CMOWebApi.Services.Services.MobileApp;
using System.Web.Http;
using Unity;

namespace CMOWebApi.WebAPI
{
    public static class UnityConfig
    {
        public static void RegisterComponents()
        {
            var container = new UnityContainer();

            // register all your components with the container here
            // it is NOT necessary to register your controllers

            // e.g. container.RegisterType<ITestService, TestService>();
            container.RegisterType<IAdvertisementService, AdvertisementService>();
            container.RegisterType<IOrderService, OrderService>();
            container.RegisterType<IUnitofWork, UnitOfWork>();
            container.RegisterType<ISchemeService, SchemeService>();
            container.RegisterType<ILookupService, LookupService>();
            container.RegisterType<ILookupTypeService, LookuptypeService>();
            container.RegisterType<ISectorService, SectorService>();
            container.RegisterType<IModeOfDeliveryService, ModeOfDeliveryService>();
            container.RegisterType<IAdvCategoryMasterService, AdvCategoryMasterService>();
            container.RegisterType<IAdvSubCategoryMasterService, AdvSubCategoryMasterService>();
            container.RegisterType<IPlatformMasterService, PlatformMasterService>();
            container.RegisterType<ITehsilService, TehsilService>();
            container.RegisterType<IUserTypeService, UserTypeService>();
            container.RegisterType<IDistrictService, DistrictService>();
            container.RegisterType<IAdvNotificationMasterService, AdvNotificationMasterService>();
            container.RegisterType<IUserManagementService, UserManagementService>();
            container.RegisterType<IUserPermissionService, UserPermissionService>();
            container.RegisterType<ISSOService, SSOService>();
            container.RegisterType<IPlatformMasterService, PlatformMasterService>();
            container.RegisterType<ICMOLetterService, CMOLetterService>();
            container.RegisterType<ICMISTaskService, CMISTaskService>();
            container.RegisterType<IGovtOrderService, GovtOrderService>();
            container.RegisterType<IBeneficialCategoryMasterService, BeneficialCategoryMasterService>();
            container.RegisterType<ITypeMasterService, TypeMasterService>();
            container.RegisterType<IOutputMasterService, OutputMasterService>();
            container.RegisterType<ICategoryMasterService, CategoryMasterService>();
            container.RegisterType<IRequiredDocumentCategoryMasterService, RequiredDocumentCategoryMasterService>();
            container.RegisterType<IUploadFileCategoryMasterService, UploadFileCategoryMasterService>();
            container.RegisterType<ISchemeCommonMasterService, SchemeCommonMasterService>();
            container.RegisterType<IRecruitmentStatusService, RecruitmentStatusService>();
            container.RegisterType<IProjectMonitoringService, ProjectMonitoringService>();
            container.RegisterType<IDashboardPermissionService, DashboardPermissionService>();
            container.RegisterType<IAdvApprovalDetailMasterService, AdvApprovalDetailMasterService>();
            container.RegisterType<IConfigurationService, ConfigurationService>();
            container.RegisterType<IOfficeMasterService, OfficeMasterService>();
            container.RegisterType<IMenuService, MenuService>();
            container.RegisterType<INotificationEmailTemplateService, NotificationEmailTemplateService>();
            container.RegisterType<INotificationSMSTemplateService, NotificationSMSTemplateService>();
            container.RegisterType<INotificationTemplateTypeService, NotificationTemplateTypeService>();
            // container.RegisterType<ILMS_ReportService, LMS_ReportService>();
            //container.RegisterType<IDashboardService, DashboardService>();
            container.RegisterType<IPageMasterService, PageMasterService>();
            container.RegisterType<IHelpDocumentService, HelpDocumentService>();
            container.RegisterType<IMonitoringParameterMasterService, MonitoringParameterMasterService>();
            container.RegisterType<IMonitoringParameterLookupService, MonitoringParameterLookupService>();
            container.RegisterType<IClientWebService, ClientWebService>();
            container.RegisterType<IDepartmentReferenceMasterService, DepartmentReferenceMasterService>();
            container.RegisterType<IDepartmentAuthoritySignatoryMasterService, DepartmentAuthoritySignatoryMasterService>();
            container.RegisterType<IDepartmentSetupMasterService, DepartmentSetupMasterService>();
            //container.RegisterType<ICitizenLetterTypeMasterService, CitizenLetterTypeMasterService>();
            //container.RegisterType<ICitizenAttachmentService, CitizenAttachmentService>();
            container.RegisterType<IOrderGenerateMasterService, OrderGenerateMasterService>();
            container.RegisterType<IAchievementCategoryService, AchievementCategoryService>();
            container.RegisterType<IAchievementSubCategoryService, AchievementSubCategoryService>();
            container.RegisterType<IAdvAchievementService, AdvAchievementService>();
            container.RegisterType<ICCCategoryService, CCCategoryService>();
            container.RegisterType<IOrderSubTypeMasterService, OrderSubTypeMasterService>();
            container.RegisterType<IGalleryService, GalleryService>();
            container.RegisterType<IVisitorCountService, VisitorCountService>();
            container.RegisterType<IAdminDepartmentMasterService, AdminDepartmentMasterService>();
            container.RegisterType<IDepartmentMasterService, DepartmentMasterService>();
            container.RegisterType<ICancellationReasonMasterService, CancellationReasonMasterService>();
            container.RegisterType<IVCService, VCService>();
            container.RegisterType<IVCParticipantService, VCParticipantService>();
            container.RegisterType<ILocationMasterService, LocationMasterService>();
            container.RegisterType<IImportantDecisionSubcategoryService, ImportantDecisionSubCategoryService>();
            container.RegisterType<IImportantDecisionService, importantDesicionService>();
            container.RegisterType<IVCGraphicalReportService, VCGraphicalReportService>();
            container.RegisterType<IJankalyanReportService, JankalyanReportService>();
            container.RegisterType<IComplaintService, ComplaintService>();
            container.RegisterType<IJankalyanEntryTypeMasterService, JankalyanEntryTypeMasterService>();
            container.RegisterType<IDepartmentProfile, DepartmentProfile>();
            container.RegisterType<IDesignationMasterService, DesignationMasterService>();
            container.RegisterType<IStatusEmailService, StatusEmailService>();
            container.RegisterType<IDepartmentContactDetails, DepartmentContactDetails>();
            container.RegisterType<IJANCategoryMasterService, JANCategoryMasterService>();
            container.RegisterType<ICMISMuduleService, CMISMuduleService>();
            container.RegisterType<IChiefMinisterProfileService, ChiefMinisterProfileService>();
            container.RegisterType<IProjectMasterService, ProjectMasterService>();
            container.RegisterType<IVCParticipantCategoryMasterService, VCParticipantCategoryMasterService>();
            container.RegisterType<IOrderTypeService, OrderTypeService>();
            container.RegisterType<IProjectSubCategoryMasterService, ProjectSubCategoryMasterService>();
            container.RegisterType<IProjectCategoryMasterService, ProjectCategoryMasterService>();
            container.RegisterType<IProjectMileStoneMasterService, ProjectMileStoneMasterService>();
            container.RegisterType<INewsClassificationMasterService, NewsClassificationMasterService>();
            container.RegisterType<INewsSubjectMasterService, NewsSubjectMasterService>();
            container.RegisterType<INewspaperMasterService, NewspaperMasterService>();
            container.RegisterType<INewspaperService, NewspaperService>();
            container.RegisterType<IMPConstituencyMasterService, MPConstituencyMasterService>();
            container.RegisterType<IMLAConstituencyMasterService, MLAConstituencyMasterService>();
            container.RegisterType<IProjectSubSubCategoryMasterService, ProjectSubSubCategoryMasterService>();
            container.RegisterType<IProjectSchemeCategoryMasterService, ProjectSchemeCategoryMasterService>();
            //     container.RegisterType<IChildPageMasterService, ChildPageMasterService>();
            container.RegisterType<ITransferDept, TransferDeptService>();
            container.RegisterType<IKPICategoryMasterService, KPICategoryMasterService>();
            container.RegisterType<IComparativeParameterMasterService, ComparativeParameterMasterService>();
            container.RegisterType<ICamparativeYearMasterService, CamparativeYearMasterService>();
            container.RegisterType<IComparativeTargetEntryService, ComparativeTargetEntryService>();
            container.RegisterType<ICurrentGovernmentEntryService, CurrentGovernmentEntryService>();
            container.RegisterType<IPreviousGovernmentEntryService, PreviousGovernmentEntryService>();
            container.RegisterType<IEbookletService, EBookletService>();
            container.RegisterType<IJankalyanAdvertisementService, JankalyanAdvertisementService>();
            container.RegisterType<IHelpDocumentTypeMasterService, HelpDocumentTypeMasterService>();
            container.RegisterType<IDistrictKPIService, DistrictKPIService>();
            container.RegisterType<IMenuClassificationService, MenuClassificationService>();
            container.RegisterType<IClassificationPageTypeService, ClassificationPageTypeService>();
            container.RegisterType<IDepartmentalProgressService, DepartmentalProgressService>();
            container.RegisterType<IDistrictProgressService, DistrictProgressService>();
            container.RegisterType<IOrderTypeMasterService, OrderTypeMasterService>();
            container.RegisterType<IJankalyanPortalService, JankalyanPortalService>();
            //   container.RegisterType<IJankalyanDepartmentDistrictWebsiteService, JankalyanDepartmentDistrictWebsiteService>();
            //    container.RegisterType<IPressReleaseService, PressReleaseService>();
            container.RegisterType<ITenderMasterService, TenderMasterService>();
            //    container.RegisterType<IDepartmentWebsiteService, DepartmentWebsiteService>();
            container.RegisterType<IJanklyanAppService, JanklyanAppService>();
            //    container.RegisterType<IDepartmentMenuClassificationService, DepartmentMenuClassificationService>();
            //     container.RegisterType<IDepartmentSubMenuService, DepartmentSubMenuService>();
            container.RegisterType<IBeneficiaryCategoryMasterModelService, BeneficiaryCategoryMasterModelService>();
            container.RegisterType<IDepartmentSectionMappingMasterService, DepartmentSectionMappingMasterService>();
            container.RegisterType<IComplainStatusService, ComplainStatusService>();
            container.RegisterType<IComplainEntryTypeService, ComplainEntryTypeService>();
            container.RegisterType<ISectionMasterService, SectionMasterService>();
            // container.RegisterType<IJankalyanConfigurationService, JankalyanConfigurationService>();
            //   container.RegisterType<IPressReleaseReportService, PressReleaseReportService>();
            container.RegisterType<IAgileCMISService, AgileCMISService>();
            container.RegisterType<IAdvtConfigurationService, AdvtConfigurationService>();

            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(container);

        }
    }
}