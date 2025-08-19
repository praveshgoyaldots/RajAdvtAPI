using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentSetupMasterService
    {
		ServiceResponse<PagedData<DepartmentSetupViewModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(DepartmentSetupModel model);
		Task<ServiceResponse<DepartmentSetupModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(DepartmentSetupModel model);
        Boolean IsDepartmentNotAvailable(int? dpt=0, long id = 0);

		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
        ServiceResponse<DepartmentSetupCancellationModel> GetByLoggedInDepartment();

    }
}
