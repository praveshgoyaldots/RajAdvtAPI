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
    public interface IClientWebService
    {
        Task<ServiceResponse<string>> Create(ClientWebServiceModel model);
        ServiceResponse<PagedData<ClientModuleViewDetail>> GetAll(IndexModel model);
        Task<ServiceResponse<ClientModuleViewDetail>> GetById(long id);
        Task<ServiceResponse<string>> Edit(ClientWebServiceModel model);
        Boolean IsModuleAvailableForDepartment(List<string> moduleName, int dptCode, long clientIdForServiceid = 0);
    }
}
