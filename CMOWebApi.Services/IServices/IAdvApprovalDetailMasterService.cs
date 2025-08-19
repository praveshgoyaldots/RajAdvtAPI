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
	public interface IAdvApprovalDetailMasterService
	{
		ServiceResponse<PagedData<AdvApprovalDetailMasterViewModel>> GetAll(IndexModel model);
		Task<ServiceResponse<string>> Create(AdvApprovalDetailMasterModel model);
		Task<ServiceResponse<AdvApprovalDetailMasterModel>> GetById(long id);
		Task<ServiceResponse<string>> Edit(AdvApprovalDetailMasterModel model);
		Task<ServiceResponse<string>> Delete(long id);
		Task<ServiceResponse<string>> UpdateActiveStatus(long id);
	}
}
