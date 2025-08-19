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
	public interface IComparativeTargetEntryService
	{
		/// <summary>
		/// Get all comparative parameter  master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<ComparativeParameterTargetViewModel>> GetAll(IndexModel model);

		/// <summary>
		/// Craete new comparative parameter 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(ComparativeTargetEntryModel model);

		/// <summary>
		/// comparative parameter   by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<ComparativeTargetEntryModel> GetById(long id);

		/// <summary>
		/// Update existing comparative parameter 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(ComparativeTargetEntryModel model);

		/// <summary>
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);

		/// <summary>
		/// get all grid data into grid
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<List<ComparativeTargetParmeterListModel>> GetAllParameter(int kPICode, int dpt = 0);

		/// <summary>
		/// check duplicate record of target entry.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<ComparativeTargetEntryModel> IsDataAvailable(ComparativeTargetEntryModel model);
	}
}
