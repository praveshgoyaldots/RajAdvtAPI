using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IAdvCategoryMasterService
	{
		ServiceResponse<PagedData<AdvCategoryViewModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(AdvCategoryMasterModel model);
		Task<ServiceResponse<AdvCategoryMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(AdvCategoryMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
