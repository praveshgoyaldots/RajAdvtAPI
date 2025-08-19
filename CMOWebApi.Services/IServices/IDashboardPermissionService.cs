using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
   public interface IDashboardPermissionService

    {
      //  Task<ServiceResponse<tblCMD_DashboardPermission>> Create(DashboardPermissionViewModel model);
        Task<ServiceResponse<string>> Create(DashboardPermissionViewModel model);
    }
}
