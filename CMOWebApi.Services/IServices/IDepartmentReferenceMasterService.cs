using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentReferenceMasterService
    {
		ServiceResponse<PagedData<DepartmentReferenceViewModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(DepartmentReferenceModel model);
		Task<ServiceResponse<DepartmentReferenceModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(DepartmentReferenceModel model);
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
