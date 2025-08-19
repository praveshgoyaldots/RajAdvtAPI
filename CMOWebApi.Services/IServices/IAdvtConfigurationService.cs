using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IAdvtConfigurationService
    {
        Task<ServiceResponse<string>> AddUpdate(AdvtConfigurationModel model);
        ServiceResponse<AdvtConfigurationModel> GetById(int id);
    }
}
