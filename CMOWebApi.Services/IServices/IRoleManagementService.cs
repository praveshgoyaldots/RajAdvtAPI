using CMOWebApi.Data;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.LoginModel;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.IServices
{
    public interface IRoleManagementService
    {
        //ServiceResponse<PagedData<AspNetRole>> GetAll(IndexModel model, int Rolelevel);
        //Task<ServiceResponse<AspNetRole>> Create(AspNetRoleViewModel model);
        //Task<ServiceResponse<AspNetRole>> GetById(string id);
        //Task<ServiceResponse<AspNetRole>> Edit(AspNetRole model);
        //Task<ServiceResponse<AspNetRole>> Delete(AspNetRole model);
        //ServiceResponse<AspNetRole> FindByName(string RoleName);
        //ServiceResponse<List<tblSystemFunctionality>> GetAssignedRoles(string RoleID);
        //ServiceResponse<List<AspNetRole>> GetAlRoles();
        bool IsRoleAllowtoLogin(string[] RoleName);
    }
}
