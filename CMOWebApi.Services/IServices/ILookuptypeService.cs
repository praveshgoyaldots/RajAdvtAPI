
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ILookupTypeService
    {
		ServiceResponse<List<LookUpTypeViewModel>> GetAll();
		ServiceResponse<List<LookUpListViewModel>> GetLookUpByTypeId(long id);
		Task<ServiceResponse<string>> Create(LookUpTypeViewModel model);
		Task<ServiceResponse<LookUpTypeViewModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(LookUpTypeViewModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
