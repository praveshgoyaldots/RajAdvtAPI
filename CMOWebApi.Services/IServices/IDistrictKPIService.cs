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
	public interface IDistrictKPIService
	{
		/// <summary>
		/// Get all DistrictKPIListViewModel
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<DistrictKPIListViewModel>> GetAll(IndexModel model, long catCode = 0);

		/// <summary>
		/// Craete new DistrictKPIListViewModel 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(DistrictKPIModel model);

		/// <summary>
		/// DistrictKPIListViewModelby Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<DistrictKPIModel> GetById(long id);

		/// <summary>
		/// Update existing DistrictKPIListViewModel
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(DistrictKPIModel model);

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
		ServiceResponse<DistrictKPIModel> IsDataAvailable(DistrictKPIModel model);

		/// <summary>
		/// get all grid data into grid
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<List<ComparativeTargetParmeterListModel>> GetAllParameterList(int kPICode, int dpt = 0, long catCode = 0);

	}
}
