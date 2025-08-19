using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IBeneficialCategoryMasterService
	{
		ServiceResponse<PagedData<SCM_BeneficialCategoryMasterModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(SCM_BeneficialCategoryMasterModel model);
		Task<ServiceResponse<SCM_BeneficialCategoryMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(SCM_BeneficialCategoryMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
	}
}
