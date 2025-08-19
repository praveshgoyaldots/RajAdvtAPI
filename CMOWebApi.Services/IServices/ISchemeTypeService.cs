using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ISchemeTypeService
	{
		ServiceResponse<List<SchemeTypeViewModel>> GetAll();
		Task<ServiceResponse<string>> Create(SchemeTypeViewModel model);
		Task<ServiceResponse<SchemeTypeViewModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(SchemeTypeViewModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
