using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class DepartmentAuthoritySignatoryMasterController : ApiController
    {
        private readonly IDepartmentAuthoritySignatoryMasterService _departmentAuthoritySignatoryService;

        public DepartmentAuthoritySignatoryMasterController(IDepartmentAuthoritySignatoryMasterService departmentAuthoritySignatoryService)
        {
            _departmentAuthoritySignatoryService = departmentAuthoritySignatoryService;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Add(DepartmentAuthoritySignatoryModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                return await _departmentAuthoritySignatoryService.Create(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Update(DepartmentAuthoritySignatoryModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    return await _departmentAuthoritySignatoryService.Edit(model);
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
        public async Task<ServiceResponse<DepartmentAuthoritySignatoryModel>> GetById(long id)
        {
            ServiceResponse<DepartmentAuthoritySignatoryModel> objReturn = new ServiceResponse<DepartmentAuthoritySignatoryModel>();
            try
            {
                if (id > 0)
                {
                    return await _departmentAuthoritySignatoryService.GetById(id);
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
        public ServiceResponse<PagedData<DepartmentAuthoritySignatoryViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<DepartmentAuthoritySignatoryViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentAuthoritySignatoryViewModel>>();
            try
            {
                return _departmentAuthoritySignatoryService.GetAll(model);
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
				objReturn = await _departmentAuthoritySignatoryService.UpdateActiveStatus(id);
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
