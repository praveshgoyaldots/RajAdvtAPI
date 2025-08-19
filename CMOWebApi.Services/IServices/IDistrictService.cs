using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IDistrictService
	{
		ServiceResponse<List<DistrictViewModel>> GetAll();
		Task<ServiceResponse<string>> Create(DistrictViewModel model);
		Task<ServiceResponse<DistrictViewModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(DistrictViewModel model);
		Task<ServiceResponse<string>> Delete(long id);
        ServiceResponse<List<DistrictViewModel>> GetDistrictByDivisionIds(string ids);

    }
}
