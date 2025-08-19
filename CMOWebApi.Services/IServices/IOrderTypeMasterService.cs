using CMOWebApi.Models.AdminModel;
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
	public interface IOrderTypeMasterService
	{
		/// <summary>
		/// Get all Order Type Master  master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		ServiceResponse<PagedData<OrderTypeModel>> GetAll(IndexModel model);

		/// <summary>
		/// Craete new Order Type Master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Create(OrderTypeModel model);

		/// <summary>
		/// Order Type Master   by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		ServiceResponse<OrderTypeModel> GetById(long id);

		/// <summary>
		/// Update existing Order Type Master 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> Edit(OrderTypeModel model);

		/// <summary>
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
