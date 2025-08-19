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
   public interface IOrderSubTypeMasterService
    {
		/// <summary>
		/// get sub Type by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<OrderSubTypeMasterModel> GetById(long id);

		/// <summary>
		/// Update order sub type
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(OrderSubTypeMasterModel model);

		/// <summary>
		/// Create order sub type
		/// </summary>
		/// <param name="model">model</param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(OrderSubTypeMasterModel model);

		/// <summary>
		/// Get All Record according Index Model
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<OrderSubTypeMasterViewModel>> GetAll(IndexModel model);


		/// <summary>
		///update status
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateStatus(long id);

	}
}
