using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ICategoryMasterService
	{
		ServiceResponse<PagedData<SCM_CategoryMasterModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(SCM_CategoryMasterModel model);
		Task<ServiceResponse<SCM_CategoryMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(SCM_CategoryMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
