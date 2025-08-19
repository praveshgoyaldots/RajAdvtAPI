using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ISectorService
	{
		ServiceResponse<List<SectorViewModel>> GetAll();
		Task<ServiceResponse<string>> Create(SectorViewModel model);
		Task<ServiceResponse<SectorViewModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(SectorViewModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
