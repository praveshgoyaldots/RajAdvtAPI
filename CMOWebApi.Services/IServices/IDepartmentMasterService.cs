using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IDepartmentMasterService
	{
		/// <summary>
		/// get Department by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<DepartmentMasterModel> GetById(long id);

		/// <summary>
		/// Update order Department
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(DepartmentMasterModel model);

		/// <summary>
		/// Create order Department
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(DepartmentMasterModel model);

		/// <summary>
		/// Get All Record according Index Model
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<DepartmentMasterViewModel>> GetAll(IndexModel model, int isActive);


		/// <summary>
		///update status
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateStatus(long id);

        ServiceResponse<string> TransferMenuClassificationToDepartmentMenu(int dptCode);
        ServiceResponse<string> TransferDptMenuToDepartmentSubMenu(int dptCode);

        #region Report Scheme and department

        /// <summary>
        /// Get Department code with department list for the report which is used by the administrator
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<DepartmentReportModel>> GetDepartmentReport();

        /// <summary>
        /// Get scheme with department list for the report which is used by the administrator
        /// </summary>
        /// <returns></returns>
        ServiceResponse<List<DepartmentSchemeReportModel>> GetDepartmentSchemeReport();

        #endregion

        #region Website Details

        /// <summary>
        /// Get list of login user department for Website Details
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<LoginUserDepartmentListModel>> GetLoginUserDepartmentList();

        /// <summary>
        /// Update Login User Department Website Details
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateLoginUserDepartment(LoginUserDepartmentListModel model);

        #endregion

        #region Department Profile

        /// <summary>
        /// Get Department Profile List according to their login department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<PagedData<DepartmentProfileListModel>> GetDepartmentProfileList(DptProfileFilterModel model);

        /// <summary>
		/// get department profile by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<DepartmentProfileModel> GetDepartmentProfileById(long id);

        /// <summary>
        /// Department Profile Add and Update
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> DepartmentProfileAddUpdate(DepartmentProfileModel model);

        /// <summary>
        /// Update Department Profile Status
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<ServiceResponse<string>> UpdateDepartmentProfileStatus(int id);

        /// <summary>
        /// This method is used to check, that the combination of department and entry type is unique or not.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<DepartmentProfileModel> IsDepartmentProfileExist(DepartmentProfileExistModel model);

        #endregion
    }
}
