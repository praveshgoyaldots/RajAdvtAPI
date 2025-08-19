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
	public interface IDesignationMasterService
	{
		/// <summary>
		/// Get all designation Master Entry.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<DesignationMasterViewModel>> GetAll(IndexModel model);

		/// <summary>
		/// Add designation Master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(DesignationMasterModel model);

		/// <summary>
		/// Update designation Master
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(DesignationMasterModel model);

		/// <summary>
		/// get designation Master by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<DesignationMasterViewModel> GetById(long id);

		/// <summary>
		/// Set Actvive De-Actvive status by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateStatus(long id);
	}
}
