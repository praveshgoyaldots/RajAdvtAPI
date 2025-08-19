using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize] 
    public class UserTypeController : ApiController
    {
        private readonly IUserTypeService _userTypeService;

        public UserTypeController(IUserTypeService UserTypeService)
        {
            _userTypeService = UserTypeService;
        }
        [HttpPost]
        public ServiceResponse<PagedData<UserTypeViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<UserTypeViewModel>> objReturn = new ServiceResponse<PagedData<UserTypeViewModel>>();
            try
            {
                objReturn = _userTypeService.GetAll(model);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;

        }

        // GET: api/UserType/5
        [HttpGet]
        public async Task<ServiceResponse<UserTypeViewModel>> Get(long id)
        {
            ServiceResponse<UserTypeViewModel> objReturn = new ServiceResponse<UserTypeViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _userTypeService.GetById(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        // POST: api/UserType
        [HttpPost]
        public async Task<ServiceResponse<string>> Post(UserTypePostModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _userTypeService.Create(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    return objReturn;
                }

            }
            catch
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        // PUT: api/UserType/5
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(int id, UserTypePostModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0 && model != null)
                {
                    model.UserTypeId = id;
                    return await _userTypeService.Edit(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                    return objReturn;
                }

            }
            catch
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        // DELETE: api/UserType/Delete/5
        [HttpPost]
        public async Task<ServiceResponse<string>> Delete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _userTypeService.Delete(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateIsActive(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _userTypeService.UpdateIsActive(id);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        public ServiceResponse<List<UserTypeViewModel>> GetDownLevelUserType(string id)
        {
            ServiceResponse<List<UserTypeViewModel>> objReturn = new ServiceResponse<List<UserTypeViewModel>>();
            try
            {
                if (!string.IsNullOrEmpty(id))
                {
                    objReturn = _userTypeService.GetUserTypeDownLevel(id);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

    }
}
