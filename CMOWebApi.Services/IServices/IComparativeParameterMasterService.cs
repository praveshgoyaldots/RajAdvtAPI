using CMOWebApi.Models.ComparetiveModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IComparativeParameterMasterService
	{
		/// <summary>
		/// Get all comparative parameter  master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<ComparativeParameterMasterViewModel>> GetAll(IndexModel model);

		/// <summary>
		/// Craete new comparative parameter 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(ComparativeParameterMasterModel model);

		/// <summary>
		/// comparative parameter   by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<ComparativeParameterMasterModel> GetById(long id);

		/// <summary>
		/// Update existing comparative parameter 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(ComparativeParameterMasterModel model);

		/// <summary>
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
