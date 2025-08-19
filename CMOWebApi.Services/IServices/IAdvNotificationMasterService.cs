using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CMOWebApi.Services.IServices
{
	public interface IAdvNotificationMasterService
	{
		//ServiceResponse<List<AdvNotificationMasterViewModel>> GetAll();
		ServiceResponse<PagedData<AdvNotificationMasterViewModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(AdvNotificationMasterModel model);
		Task<ServiceResponse<AdvNotificationMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(AdvNotificationMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
		ServiceResponse<List<SelectListItem>> GetAdvertisementDepartmentMasterType(long id);
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
