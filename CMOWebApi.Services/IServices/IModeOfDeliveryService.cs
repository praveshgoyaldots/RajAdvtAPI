using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IModeOfDeliveryService
	{
		ServiceResponse<List<ModeOfDeliveryViewModel>> GetAll();
		Task<ServiceResponse<string>> Create(ModeOfDeliveryViewModel model);
		Task<ServiceResponse<ModeOfDeliveryViewModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(ModeOfDeliveryViewModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
