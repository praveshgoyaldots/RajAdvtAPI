using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentProfile
    {
        /// <summary>
        /// get DepartmentProfile by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        ServiceResponse<DepartmentProfileViewModel> GetById(long id, bool isBase64File = true);

        /// <summary>
        /// Get Department Profile
        /// </summary>
        /// <param name="model"></param>
        /// <param name="isBase64File"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<DepartmentProfileViewModel>> GetAll(DepartmentProfileFilterModel model, int excludeEntryType = 0, bool isBase64File = true);

        ServiceResponse<PagedData<DepartmentContactViewModel>> GetAllDepartmentContacts(DepartmentContactFilterModel model);

        ServiceResponse<DepartmentContactViewModel> GetDepartmentContactById(long id);


    }
}
