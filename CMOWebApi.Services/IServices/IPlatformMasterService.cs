using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IPlatformMasterService
	{
		//ServiceResponse<List<PlatformMasterViewModel>> GetAll();
		ServiceResponse<PagedData<PlatformMasterViewModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(PlatformMasterModel model);
		Task<ServiceResponse<PlatformMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(PlatformMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
