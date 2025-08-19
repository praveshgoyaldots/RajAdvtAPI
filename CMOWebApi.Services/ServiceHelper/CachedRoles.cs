using CMOWebApi.Data;
using CMOWebApi.Services.IServices;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.ServiceHelper
{
    public class CachedRolesPermission
    {
        public IManageRoleWisePermission _permission;
        //public CachedRolesPermission(IManageRoleWisePermission permission)
        //{
        //    _permission = permission;
        //}
        //public List<tblPermission> GetRolesPermission()
        //{
        //    return _permission.GetAll().Data.ToList();
        //}

    }
}
