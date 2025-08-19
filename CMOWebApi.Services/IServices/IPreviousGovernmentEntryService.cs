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
	public interface IPreviousGovernmentEntryService
	{
		/// <summary>
		/// Get all Previous Government Entry 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<PreviousGovernmentEntryListModel>> GetAll(IndexModel model);

		/// <summary>
		/// Craete new Previous Government Entry  
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(PreviousGovernmentEntryModel model);

		/// <summary>
		/// Previous Government Entry by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<PreviousGovernmentEntryModel> GetById(long id);

		/// <summary>
		/// Update existing Previous Government Entry 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(PreviousGovernmentEntryModel model);

		/// <summary>
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);

		/// <summary>
		/// get all year list
		/// </summary>
		/// <returns></returns>
		ServiceResponse<List<PreviousGovernmentEntryParameterMappingModel>> GetAllYearList();

		/// <summary>
		/// Get comparative parameter by parameter code
		/// </summary>
		/// <param name="paraCode"></param>
		/// <returns></returns>
		ServiceResponse<ComparativeTargetParmeterListModel> GetParameterDetailByParameterCode(long paraCode);
	}
}
