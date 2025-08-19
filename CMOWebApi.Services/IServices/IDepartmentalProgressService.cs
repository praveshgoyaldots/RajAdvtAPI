using CMOWebApi.Models.ComparetiveModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IDepartmentalProgressService
    {
		/// <summary>
		/// Get all Departmental Progress Entry 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<DepartmentalProgressListViewModel>> GetAll(IndexModel model, long catCode = 0);

		/// <summary>
		/// Craete new Departmental Progress Entry  
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(DepartmentalProgressModel model);

		/// <summary>
		/// Departmental Progress Entry by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<DepartmentalProgressModel> GetById(long id);

		/// <summary>
		/// Update existing Departmental Progress Entry 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(DepartmentalProgressModel model);

		/// <summary>
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);

        /// <summary>
        /// check duplicate record of Departmental Progress.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<DepartmentalProgressModel> IsDataAvailable(DepartmentalProgressModel model);

        /// <summary>
        /// Get default Parameter With Cumulative And Target Value by month, year and department
        /// </summary>
        /// <param name="monthCode"></param>
        /// <param name="dpt"></param>
        /// <param name="yearCode"></param>
        /// <returns></returns>
        ServiceResponse<List<DepartmentalProgressParameterMappingModel>> GetAllParameterWithCumulativeAndTargetValue(long monthCode = 0, int dpt = 0, int yearCode = 0, long paramCatCode = 0);

        #region Web Service

        Task<ServiceResponse<string>> DepartmentalPushService(DepartmentalProgressWebServiceModel model, HttpRequestHeaders header = null);

        #endregion
    }
}
