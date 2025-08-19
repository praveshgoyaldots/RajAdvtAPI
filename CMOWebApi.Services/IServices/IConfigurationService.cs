using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IConfigurationService
    {
        ServiceResponse<ConfigViewModel> GetAll(string userType,  string configType, long department, int userId);


        ServiceResponse<string> Create(ConfigViewModel model);



    }
}
