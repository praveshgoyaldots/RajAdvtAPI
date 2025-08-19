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
	public interface IMenuClassificationService
	{
		/// <summary>
		/// Get  menu classification
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<MenuClassificationModel>> GetAll(IndexModel model);

		/// <summary>
		/// Add  menu classification
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(MenuClassificationModel model);

		/// <summary>
		/// Update  menu classification
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(MenuClassificationModel model);

		/// <summary>
		/// Get  menu classification by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<MenuClassificationModel> GetById(long id);

		/// <summary>
		/// Set Actvive De-Actvive status by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateStatus(long id);
	}
}
