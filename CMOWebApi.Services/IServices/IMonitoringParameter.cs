using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IMonitoringParameterMasterService
    {
		ServiceResponse<PagedData<MonitoringParameterMasterViewModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(MonitoringParameterMasterModel model);
		Task<ServiceResponse<MonitoringParameterMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(MonitoringParameterMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);

		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
