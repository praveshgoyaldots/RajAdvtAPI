using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class DepartmentSetupMasterController : ApiController
    {
        private readonly IDepartmentSetupMasterService _departmentSetupService;
        
        public DepartmentSetupMasterController(IDepartmentSetupMasterService departmentSetupService)
        {
            _departmentSetupService = departmentSetupService;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Add(DepartmentSetupModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    if (_departmentSetupService.IsDepartmentNotAvailable(model.DepartmentCode, model.Id))
                    {
                        return await _departmentSetupService.Create(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.DepartmentExist;
                        return objReturn;
                    }

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

        [HttpPost]
        public async Task<ServiceResponse<string>> Update(DepartmentSetupModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    if (_departmentSetupService.IsDepartmentNotAvailable(model.DepartmentCode, model.Id))
                    {
                        return await _departmentSetupService.Edit(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.DepartmentExist;
                        return objReturn;
                    }
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

        [HttpGet]
        public async Task<ServiceResponse<DepartmentSetupModel>> GetById(long id)
        {
            ServiceResponse<DepartmentSetupModel> objReturn = new ServiceResponse<DepartmentSetupModel>();
            try
            {
                if (id > 0)
                {
                    return await _departmentSetupService.GetById(id);
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

        [HttpPost]
        public ServiceResponse<PagedData<DepartmentSetupViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<DepartmentSetupViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentSetupViewModel>>();
            try
            {
                return _departmentSetupService.GetAll(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

		[HttpGet]
		public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				objReturn = await _departmentSetupService.UpdateActiveStatus(id);
			}
			catch
			{
				objReturn.Data = null;
				objReturn.IsSuccess = false;
				objReturn.Message = MessageStatus.Error;
			}
			return objReturn;
		}

        [HttpGet]
        public ServiceResponse<DepartmentSetupCancellationModel> GetByLoggedInDepartment()
        {
            ServiceResponse<DepartmentSetupCancellationModel> objReturn = new ServiceResponse<DepartmentSetupCancellationModel>();
            try
            {
                objReturn =  _departmentSetupService.GetByLoggedInDepartment();
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

    }
}
