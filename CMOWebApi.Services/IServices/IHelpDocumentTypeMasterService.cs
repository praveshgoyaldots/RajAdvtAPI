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
	public interface IHelpDocumentTypeMasterService
	{
		/// <summary>
		/// Get Help Document List
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<HelpDocumentTypeMasterModel>> GetAll(IndexModel model);

		/// <summary>
		/// Add Help Document
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(HelpDocumentTypeMasterModel model);

		/// <summary>
		/// Update Help Document
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(HelpDocumentTypeMasterModel model);

		/// <summary>
		/// Get Help Document by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<HelpDocumentTypeMasterModel> GetById(long id);

		/// <summary>
		/// Set Actvive De-Actvive status by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateStatus(long id);
	}
}
