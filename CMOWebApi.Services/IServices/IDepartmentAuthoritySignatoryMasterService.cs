using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentAuthoritySignatoryMasterService
    {
		ServiceResponse<PagedData<DepartmentAuthoritySignatoryViewModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(DepartmentAuthoritySignatoryModel model);
		Task<ServiceResponse<DepartmentAuthoritySignatoryModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(DepartmentAuthoritySignatoryModel model);
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
