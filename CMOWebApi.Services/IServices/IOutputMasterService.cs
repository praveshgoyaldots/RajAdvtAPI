using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;


namespace CMOWebApi.Services.IServices
{
    public interface IOutputMasterService
	{
		ServiceResponse<PagedData<SCM_OutputMasterModel>> GetAll(SearchListModel model);
		Task<ServiceResponse<string>> Create(SCM_OutputMasterModel model);
		Task<ServiceResponse<SCM_OutputMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(SCM_OutputMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);

		Task<ServiceResponse<string>> UpdateStatus(long id);
	}
}
