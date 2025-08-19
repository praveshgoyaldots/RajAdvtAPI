using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IRequiredDocumentCategoryMasterService
	{
		ServiceResponse<PagedData<SCM_RequiredDocumentCategoryMasterModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(SCM_RequiredDocumentCategoryMasterModel model);
		Task<ServiceResponse<SCM_RequiredDocumentCategoryMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(SCM_RequiredDocumentCategoryMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
