
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ILookupService
    {
		ServiceResponse<List<LookUpListViewModel>> GetAll(LookUpFilterModel model);
		Task<ServiceResponse<string>> Create(LookUpViewModel model);
		Task<ServiceResponse<LookUpViewModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(LookUpViewModel model);
		Task<ServiceResponse<string>> Delete(long id);
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
