using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMOWebApi.Data;
using CMOWebApi.Services.ServiceHelper;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.Services;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Core;
using System.Web;
using AutoMapper;
namespace CMOWebApi.Services.Services
{
    public class UserProfileService : BaseService //, IUserProfileService
    {
        IUnitofWork _uow;
        public UserProfileService(IUnitofWork uow)
        {
            _uow = uow;
        }

        public ServiceResponse<tblUserMaster> GetById(int id)
        {
            ServiceResponse<tblUserMaster> objReturn = new ServiceResponse<tblUserMaster>();
            try
            {
                tblUserMaster cat = _uow.GenericRepository<tblUserMaster>().GetAll(filter: z => z.UserId == id && z.UserIsActive == true).FirstOrDefault();
                objReturn = SetResultStatus(cat, MessageStatus.Success, true);
            }
            catch
            {
                objReturn = SetResultStatus<tblUserMaster>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        //public async Task<ServiceResponse<AspNetUser>> Edit(AspNetUser model)
        //{
        //    ServiceResponse<AspNetUser> objReturn = new ServiceResponse<AspNetUser>();
        //    try
        //    {
        //        AspNetUser cat = await _uow.GenericRepository<AspNetUser>().UpdateAsync(model);
        //        _uow.save();
        //        objReturn = SetResultStatus(cat, MessageStatus.Update, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<AspNetUser>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
    }
}
