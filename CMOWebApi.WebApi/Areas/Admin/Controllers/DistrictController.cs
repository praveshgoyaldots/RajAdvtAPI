using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel.MasterModel;
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
    public class DistrictController : ApiController
    {
        private readonly IDistrictService _districtService;

        public DistrictController(IDistrictService districtService)
        {
            _districtService = districtService;
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> AddUpdateDistrict()
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                DistrictViewModel model = JsonConvert.DeserializeObject<DistrictViewModel>(HttpContext.Current.Request.Form["Data"]);

                if (HttpContext.Current.Request.Files.Count > 0)
                {
                    var file = HttpContext.Current.Request.Files[0];
                    string extension = System.IO.Path.GetExtension(file.FileName);
                    string guidName = Guid.NewGuid().ToString();
                    var FileName = guidName + extension;
                    var path = System.Web.HttpContext.Current.Server.MapPath("~/Content/UploadFolder/AdvertisementEntry/") + FileName;
                    file.SaveAs(path);
                    model.DistrictImage = FileName;
                }

                if (model != null)
                {
                    if (model.DistrictId > 0)
                    {
                        return await _districtService.Edit(model);
                    }
                    else
                    {
                        return await _districtService.Create(model);
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
        public async Task<ServiceResponse<string>> Delete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _districtService.Delete(id);
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

        [HttpGet]
        public async Task<ServiceResponse<DistrictViewModel>> GetById(long id)
        {
            ServiceResponse<DistrictViewModel> objReturn = new ServiceResponse<DistrictViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _districtService.GetById(id);
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

        [HttpGet]
        public ServiceResponse<List<DistrictViewModel>> Get()
        {
            ServiceResponse<List<DistrictViewModel>> objReturn = new ServiceResponse<List<DistrictViewModel>>();
            try
            {
                return _districtService.GetAll();
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        public ServiceResponse<List<DistrictViewModel>> GetDistrictByDivisionIds(string ids)
        {
            ServiceResponse<List<DistrictViewModel>> objReturn = new ServiceResponse<List<DistrictViewModel>>();
            try
            {
                if (!string.IsNullOrEmpty(ids))
                {
                    return _districtService.GetDistrictByDivisionIds(ids);
                }
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.InvalidData;
                return objReturn;
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

    }
}
