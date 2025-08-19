using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;

namespace StateDashboardWebapi.WebAPI.Areas.Admin.Controllers
{
    [Authorize]
    public class SectorController : ApiController
    {
        private readonly ISectorService _sectorService;

        public SectorController(ISectorService SectorService)
        {
            _sectorService = SectorService;
        }

        // GET: api/Sector
        [HttpGet]
        public ServiceResponse<List<SectorViewModel>> Get()
        {

            ServiceResponse<List<SectorViewModel>> objReturn = new ServiceResponse<List<SectorViewModel>>();
            try
            {
                return _sectorService.GetAll();
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }
        // GET: api/Sector/5
        [HttpGet]
        public async Task<ServiceResponse<SectorViewModel>> Get(long id)
        {
            ServiceResponse<SectorViewModel> objReturn = new ServiceResponse<SectorViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _sectorService.GetById(id);
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

        // POST: api/Sector
        [HttpPost]
        public async Task<ServiceResponse<string>> Post(SectorViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _sectorService.Create(model);
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

        // PUT: api/Sector/5
        [HttpPut]
        public async Task<ServiceResponse<string>> Put(SectorViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    return await _sectorService.Edit(model);
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
        // DELETE: api/Sector/5
        [HttpGet]
        public async Task<ServiceResponse<string>> Delete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _sectorService.Delete(id);
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
