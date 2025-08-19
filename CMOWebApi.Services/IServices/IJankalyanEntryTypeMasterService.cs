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
	public interface IJankalyanEntryTypeMasterService
	{
		/// <summary>
		/// Get all jankalyan Entry Master Entry.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<JankalyanEntryMasterViewModel>> GetAll(IndexModel model);

		/// <summary>
		/// Add Jankalyan Entry Type Master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(JankalyanEntryMasterModel model);

		/// <summary>
		/// Update Jankalyan Entry Type Master
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(JankalyanEntryMasterModel model);

		/// <summary>
		/// get Jankalyan Entry Master by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<JankalyanEntryMasterViewModel> GetById(long id);

		/// <summary>
		/// Set Actvive De-Actvive status by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateStatus(long id);
	}
}
