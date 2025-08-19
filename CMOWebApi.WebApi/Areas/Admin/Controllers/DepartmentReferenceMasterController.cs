using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class DepartmentReferenceMasterController : ApiController
    {
        private readonly IDepartmentReferenceMasterService _departmentReferenceService;

        public DepartmentReferenceMasterController(IDepartmentReferenceMasterService departmentReferenceService)
        {
            _departmentReferenceService = departmentReferenceService;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Add(DepartmentReferenceModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                return await _departmentReferenceService.Create(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Update(DepartmentReferenceModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    return await _departmentReferenceService.Edit(model);
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
        public async Task<ServiceResponse<DepartmentReferenceModel>> GetById(long id)
        {
            ServiceResponse<DepartmentReferenceModel> objReturn = new ServiceResponse<DepartmentReferenceModel>();
            try
            {
                if (id > 0)
                {
                    return await _departmentReferenceService.GetById(id);
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
        public ServiceResponse<PagedData<DepartmentReferenceViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<DepartmentReferenceViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentReferenceViewModel>>();
            try
            {
                return _departmentReferenceService.GetAll(model);
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
				objReturn = await _departmentReferenceService.UpdateActiveStatus(id);
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
