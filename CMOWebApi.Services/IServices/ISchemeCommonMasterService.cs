using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface ISchemeCommonMasterService
	{
		ServiceResponse<PagedData<SCM_CommonMasterModel>> GetAll(SearchListModel model);
		Task<ServiceResponse<string>> Create(SCM_CommonMasterModel model);
		Task<ServiceResponse<SCM_CommonMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(SCM_CommonMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);

		/// <summary>
		///update status
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateStatus(long id);
	}
}
