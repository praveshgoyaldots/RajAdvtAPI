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
	public interface ICurrentGovernmentEntryService
	{
		/// <summary>
		/// Get all Current Government Entry 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<CurrentGovtEntryListViewModel>> GetAll(IndexModel model, long catCode = 0);

		/// <summary>
		/// Craete new Current Government Entry  
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(CurrentGovtEntryModel model);

		/// <summary>
		/// Current Government Entry by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<CurrentGovtEntryModel> GetById(long id);

		/// <summary>
		/// Update existing Current Government Entry 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(CurrentGovtEntryModel model);

		/// <summary>
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// check duplicate record of current gov.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<CurrentGovtEntryModel> IsDataAvailable(CurrentGovtEntryModel model);

        /// <summary>
        /// Get default Parameter With Cumulative And Target Value by month, year and department
        /// </summary>
        /// <param name="monthCode"></param>
        /// <param name="dpt"></param>
        /// <param name="yearCode"></param>
        /// <returns></returns>
        ServiceResponse<List<CurrentGovtEntryParameterMappingModel>> GetAllParameterWithCumulativeAndTargetValue(long monthCode = 0, int dpt = 0, int yearCode = 0, long paramCatCode = 0);

    }
}
