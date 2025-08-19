using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ITehsilService
	{
		ServiceResponse<List<TehsilViewModel>> GetAll();
		Task<ServiceResponse<string>> Create(TehsilViewModel model);
		Task<ServiceResponse<TehsilViewModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(TehsilViewModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
