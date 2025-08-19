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
	public interface IAdminDepartmentMasterService
	{
		/// <summary>
		/// get sub Type by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<AdminDepartmentMasterModel> GetById(long id);

		/// <summary>
		/// Update order sub type
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(AdminDepartmentMasterModel model);

		/// <summary>
		/// Create order sub type
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(AdminDepartmentMasterModel model);

		/// <summary>
		/// Get All Record according Index Model
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<AdminDepartmentMasterViewModel>> GetAll(IndexModel model);


		/// <summary>
		///update status
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateStatus(long id);
	}
}
