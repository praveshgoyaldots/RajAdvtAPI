using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentContactDetails
    {
        /// <summary>
        /// Get department contact details List according to their login department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<DepartmentContactDetailsViewModel>> GetAll(IndexModel model);

        /// <summary>
		/// Get department contact details by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<DepartmentContactDetailsModel> GetById(long id);

        /// <summary>
        /// Department contact details add and update
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> AddUpdate(DepartmentContactDetailsModel model);

        /// <summary>
        /// Update department contact details status
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateStatus(int id);

        /// <summary>
		/// Get department website details by code
		/// </summary>
		/// <param name="code"></param>
		/// <returns></returns>
		ServiceResponse<DepartmentWebsiteDetailsModel> GetDepartmentByCode(int code);

        /// <summary>
        /// Get department officer contact details by department code for scheme module
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<DepartmentContactOfficerModel>> GetDepartmentOfficerByDepartment(int departmentCode);
    }
}
