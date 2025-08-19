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
    public class ClientWebServiceController : ApiController
    {
        private readonly IClientWebService _clientWebService;
        public ClientWebServiceController(IClientWebService clientWebService)
        {
            _clientWebService = clientWebService;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Post(ClientWebServiceModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    if (_clientWebService.IsModuleAvailableForDepartment(model.ModuleName ,model.DepartmentCode , model.Id))
                    {
                        return await _clientWebService.Create(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.ModuleExist;
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
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Put(ClientWebServiceModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    if (_clientWebService.IsModuleAvailableForDepartment(model.ModuleName, model.DepartmentCode, model.Id))
                    {
                        return await _clientWebService.Edit(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = MessageStatus.ModuleExist;
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
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }
        [HttpPost]
        public ServiceResponse<PagedData<ClientModuleViewDetail>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<ClientModuleViewDetail>> objReturn = new ServiceResponse<PagedData<ClientModuleViewDetail>>();
            try
            {
                return _clientWebService.GetAll(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<ClientModuleViewDetail>> Get(long id)
        {
            ServiceResponse<ClientModuleViewDetail> objReturn = new ServiceResponse<ClientModuleViewDetail>();
            try
            {
                if (id > 0)
                {
                    return await _clientWebService.GetById(id);
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
    }
}
