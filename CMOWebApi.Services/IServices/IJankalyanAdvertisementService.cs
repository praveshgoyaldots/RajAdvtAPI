using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
	public interface IJankalyanAdvertisementService
	{
		
			/// <summary>
			/// Get all jankalyan adervertisement 
			/// </summary>
			/// <param name="model"></param>
			/// <returns></returns>
			ServiceResponse<PagedData<ADVTJankalyanAdvertisementModel>> GetAll(IndexModel model);

			/// <summary>
			/// Craete new jankalyan adervertisement
			/// </summary>
			/// <param name="model"></param>
			/// <returns></returns>
			Task<ServiceResponse<string>> Create(ADVTJankalyanAdvertisementModel model);

			/// <summary>
			/// jankalyan adervertisement  by Id(Primary key)
			/// </summary>
			/// <param name="id"></param>
			/// <returns></returns>
			ServiceResponse<ADVTJankalyanAdvertisementModel> GetById(long id);

			/// <summary>
			/// Update existing jankalyan adervertisement
			/// </summary>
			/// <param name="model"></param>
			/// <returns></returns>
			Task<ServiceResponse<string>> Edit(ADVTJankalyanAdvertisementModel model);

			/// <summary>
			/// Update Status(Active/De-Active)
			/// </summary>
			/// <param name="id"></param>
			/// <returns></returns>
			Task<ServiceResponse<string>> UpdateActiveStatus(long id);

			/// <summary>
			/// this method used for showing all advertisement list in advertisement project.
			/// </summary>
			/// <returns></returns>
			ServiceResponse<List<ADVTJankalyanAdvertisementModel>> GetAllJankalyanAdvertisement(long catCode = 0, bool isBase64 = false);
	}
}
