using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IMonitoringParameterLookupService
    {
        #region MonitoringParameterLookup
        ServiceResponse<PagedData<MonitoringParameterLookupViewModel>> GetAll(IndexModel model);
        Task<ServiceResponse<string>> Create(MonitoringParameterLookupModel model);
        Task<ServiceResponse<MonitoringParameterLookupViewModel>> GetById(long id);
        Task<ServiceResponse<string>> Edit(MonitoringParameterLookupModel model);

        #endregion

        #region MonitoringParameterLookupType
        Task<ServiceResponse<string>> CreateLookupType(MonitoringParameterLookupTypeModel model);
        ServiceResponse<PagedData<MonitoringParameterLookupTypeModel>> GetAllLookupType(IndexModel model);
        Task<ServiceResponse<MonitoringParameterLookupTypeModel>> GetByIdLookupType(long id);
        Task<ServiceResponse<string>> EditLookupType(MonitoringParameterLookupTypeModel model);
        #endregion
    }
}
