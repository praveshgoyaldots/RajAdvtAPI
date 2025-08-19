using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class ManageRoleWisePermission : BaseService, IManageRoleWisePermission
    {
        IUnitofWork _uow;
        public ManageRoleWisePermission(IUnitofWork uow)
        {
            _uow = uow;
        }

        //public ServiceResponse<List<tblPermission>> GetAll()
        //{
        //    ServiceResponse<List<tblPermission>> objReturn = new ServiceResponse<List<tblPermission>>();
        //    try
        //    {
        //        var data = _uow.GenericRepository<tblPermission>().GetAll().ToList();
        //        objReturn = SetResultStatus(data, MessageStatus.Success, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<List<tblPermission>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
    }
}
