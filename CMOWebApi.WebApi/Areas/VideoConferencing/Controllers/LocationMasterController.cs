using CMOWebApi.Core;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.VideoConferencing.Controllers
{
    [Authorize]
    public class LocationMasterController : ApiController
    {
        private readonly ILocationMasterService _vcService;
        IndexModel model = null;
        // GET api/values
        public LocationMasterController(ILocationMasterService ILocationMasterService, IndexModel indexModel)
            {
            this._vcService = ILocationMasterService;
            this.model = indexModel;
            }



        [HttpPost]
        public ServiceResponse<PagedData<LocationMasterViewModel>> Get(VCLocationSearchModel model)
            {
            ServiceResponse<PagedData<LocationMasterViewModel>> objReturn = new ServiceResponse<PagedData<LocationMasterViewModel>>();
            try
                {
                objReturn = _vcService.GetAll(model);
                }
            catch
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

                }
            return objReturn;
            }


        [HttpGet]
        public ServiceResponse<LocationMasterViewModel> Get(long id)
            {
            ServiceResponse<LocationMasterViewModel> objReturn = new ServiceResponse<LocationMasterViewModel>();
            try
                {
                objReturn = _vcService.GetById(id);
                }
            catch
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
                }
            return objReturn;
            }

        [HttpPost]
        public async Task<ServiceResponse<string>> Post(LocationMasterViewModel model)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                if (ModelState.IsValid)
                    {
                    objReturn = await _vcService.Create(model);
                    }
                else
                    {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                             .Where(y => y.Count > 0)
                                             .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                    }
                }
            catch
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                }
            return objReturn;
            }

        // Edit
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(LocationMasterViewModel model)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                if (ModelState.IsValid && model.Id > 0)
                    {
                    objReturn = await _vcService.Edit(model);
                    }
                else
                    {
                    var errors = ModelState.Select(x => x.Value.Errors)
                                              .Where(y => y.Count > 0)
                                              .ToList();
                    List<string> err = new List<string>();

                    objReturn.IsSuccess = false;
                    objReturn.Message = string.Join(", ", errors.Select(x => x.Select(y => (string.IsNullOrEmpty(y.ErrorMessage) ? y.Exception.ToString() : y.ErrorMessage)).LastOrDefault()).ToList());
                    return objReturn;
                    }
                }
            catch
                {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                }
            return objReturn;
            }

        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateStatus(int id)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                objReturn = await _vcService.UpdateStatus(id);
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
        public ServiceResponse<string> Delete(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                return _vcService.Delete(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

    }

 

    }



