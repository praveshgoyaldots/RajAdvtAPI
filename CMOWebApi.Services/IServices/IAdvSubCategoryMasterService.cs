using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IAdvSubCategoryMasterService
	{
		ServiceResponse<List<AdvSubCategoryViewModel>> GetAll();
		Task<ServiceResponse<string>> Create(AdvSubCategoryMasterModel model);
		Task<ServiceResponse<AdvSubCategoryMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(AdvSubCategoryMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
