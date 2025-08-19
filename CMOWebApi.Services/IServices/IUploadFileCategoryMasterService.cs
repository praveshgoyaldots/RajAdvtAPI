using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IUploadFileCategoryMasterService
	{
		ServiceResponse<PagedData<SCM_UploadFileCategoryMasterModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(SCM_UploadFileCategoryMasterModel model);
		Task<ServiceResponse<SCM_UploadFileCategoryMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(SCM_UploadFileCategoryMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
