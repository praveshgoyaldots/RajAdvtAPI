using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ISchemeService
    {
        #region Scheme Service

        Task<ServiceResponse<SchemeViewModel>> GetById(long id);

        Task<ServiceResponse<UpdateBeneficiaryModel>> GetByBeneficiaryId(long id);
        Task<ServiceResponse<string>> UpdateBeneficiaryCategory(UpdateBeneficiaryModel model);
        Task<ServiceResponse<string>> Edit(SchemeModel model);
        Task<ServiceResponse<string>> Create(SchemeModel model);
        ServiceResponse<PagedData<ListSchemeModel>> GetAll(CustomSearchModel model, int isActive);

        Task<ServiceResponse<string>> UpdateIsActiveStatus(long id);
        ServiceResponse<string> Delete(CommonIdModel model);
        ServiceResponse<SchemeFAQModel> GetFaqBySchemeId(long id);
        Task<ServiceResponse<string>> FAQAddUpdate(SchemeFAQModel model);
        ServiceResponse<List<SchemeDashboardViewModel>> GetAllSchemeDashboard(string UserType, int UserId);
        Task<ServiceResponse<string>> LockToggle(long id);
        Boolean IsSchemeAvailable(string name, long id = 0);

        Task<ServiceResponse<string>> AssignScheme(AssignSchemeModel model);
        Task<ServiceResponse<string>> EditAssignScheme(AssignSchemeModel model);
        Task<ServiceResponse<AssignSchemeModel>> GetAssignSchemeById(long id);
        ServiceResponse<PagedData<AssignSchemeNameForUserModel>> GetAllAssignSchemeList(IndexModel model, int isActive);

        ServiceResponse<PagedData<AssignSchemeModel>> GetAllSchemeList(IndexModel model);
        ServiceResponse<PagedData<SetSchemePriorityViewModel>> GetAllPriority(IndexModel model);
        Task<ServiceResponse<string>> SetAllPriority(List<SetSchemePriorityViewModel> model);

        /// <summary>
        /// get Scheme Detail For Group Type by Id
        /// </summary>
        /// <param name="Id">scheme Id</param>
        /// <returns>SchemeGroupViewModel</returns>
        Task<ServiceResponse<SchemeGroupViewModel>> GetGroupSchemeById(long Id);
        /// <summary>
        /// Update Scheme Group
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> Edit(SchemeGroupPostModel model);
        #endregion

        #region Monitoring Parameters Service

        Task<ServiceResponse<string>> AddMonitoringParameters(SchemeMonitoringParameteModel model);
        ServiceResponse<SchemeMonitoringParameteModel> GetMonitoringParameters(long id);

        ServiceResponse<string> UpdateMonitoringParametersStatus(long id);

        ServiceResponse<MonitoringParametersByIdForDataEntryViewModel> GetMonitoringParametersByIdForDataEntry(long id);

        ServiceResponse<MonitoringParametersByIdForDataEntryViewModel> GetDataEntryListForMonitoringParameters(CustomParameterWithIndex model, long id);

        Task<ServiceResponse<string>> AddDataEntryForMonitoringParameters(MonitoringParamDataEntryAddModel model);

        Task<ServiceResponse<string>> UpdateDataEntryValueForMonitoringParameters(MonitoringParamDataEntryAddModel model);

        ServiceResponse<PagedData<MonitoringParameterWithCountModel>> GetAllMPRCountWithScheme(IndexModel model);

        ServiceResponse<PagedData<MonitoringParameterMonthlyModel>> GetAllMPMonthlyBySchemeId(IndexModel model, long schemeId);

        #endregion

        #region For Frontend
        ServiceResponse<List<schemedepartmentlistmodel>> GetAllSchemeListPublicPortal();

        Task<ServiceResponse<PublicPortalSchemeViewModel>> GetByIdForFrontEnd(long Id, bool isBase64File = true);

        ServiceResponse<PagedData<SchemePortalViewModel>> GetAllSchemeForPublicPortal(IndexModel model, bool isBase64File);
        ServiceResponse<SchemeGroupDetailViewModel> GetSchemeGroupDetail(long Id, bool isBase64File = true);
        #endregion

        ServiceResponse<List<ContactPersonDetailViewModel>> GetAllContactPersonDetail(ContactPersonDetailModel model);

        ServiceResponse<PagedData<SchemePortalViewModel>> GetAllFilterSchemeForPublicPortal(SchemeFrontEndFilterModel model, bool isBase64File = true);
        ServiceResponse<PagedData<SchemePortalViewModel>> GetTopSchemeByDepartment(IndexModel model, bool isBase64File = false);
    }
}
