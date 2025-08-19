using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface ITypeMasterService
	{
		ServiceResponse<PagedData<SCM_TypeMasterModel>> GetAll(SearchListModel model);
		Task<ServiceResponse<string>> Create(SCM_TypeMasterModel model);
		Task<ServiceResponse<SCM_TypeMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(SCM_TypeMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
		Task<ServiceResponse<string>> UpdateStatus(long id);
	}
}
