using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;
using static CMOWebApi.Core.Enums.DdlKeysEnum;

namespace CMOWebApi.WebAPI.Areas.Admin.Controllers
{
    //[Authorize]
    public class GalleryController : ApiController
    {
        private readonly IGalleryService _galleryService;
        IndexModel model = null;

        public GalleryController(IGalleryService galleryService, IndexModel indexModel)
        {
            this._galleryService = galleryService;
            this.model = indexModel;
        }

        /// GET: api/gallery
        /// <summary>
        /// Get All Gallery
        /// </summary>
        /// <param name="model">IndexModel</param>
        /// <returns>Method returns ServiceResponse.</returns>
        [HttpPost]
        public ServiceResponse<PagedData<GalleryViewModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<GalleryViewModel>> objReturn = new ServiceResponse<PagedData<GalleryViewModel>>();
            try
            {
                objReturn = _galleryService.GetAll(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// GET: api/gallery/5
        /// <summary>
        /// Get Gallery Detail
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        [HttpGet]
        public ServiceResponse<GalleryViewModel> Get(int id)
        {
            ServiceResponse<GalleryViewModel> objReturn = new ServiceResponse<GalleryViewModel>();
            try
            {
                objReturn = _galleryService.GetById(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        /// POST: api/gallery
        /// <summary>
        /// Add/Update Gallery Detail
        /// </summary>
        /// <param name="model">GalleryViewModel</param>
        /// <returns>Method returns ServiceResponse.</returns>
        [HttpPost]
        public ServiceResponse<string> Post(GalleryViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = _galleryService.AddUpdate(model);
                }
                else
                {
                    IEnumerable<System.Web.Http.ModelBinding.ModelError> allErrors = ModelState.Values.SelectMany(v => v.Errors);
                    objReturn.Data = JsonConvert.SerializeObject(allErrors);
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.InvalidData;
                }
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Update Delete Status of Gallery
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _galleryService.UpdateDeleteStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Update Active Status of Gallery
        /// </summary>
        /// <param name="id">int</param>
        /// <returns>Method returns ServiceResponse.</returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _galleryService.UpdateActiveStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> GetAllDetails(IndexModel model, string excludeUploadType=null)
        {
            ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> objReturn = new ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>>();
            try
            {
                objReturn = _galleryService.GetAllDetails(model,excludeUploadType);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
        [HttpPost]
        public ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> GetAllPhotosDetails(IndexModel model)
        {
            ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> objReturn = new ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>>();
            try
            {
                if (model.AdvanceSearchModel != null && model.AdvanceSearchModel.ContainsKey("UploadType"))
                {
                    model.AdvanceSearchModel["UploadType"] = GalleryUploadType.Photo.GetStringValue();
                }
                else
                {
                    if (model.AdvanceSearchModel==null)
                    {
                        model.AdvanceSearchModel = new Dictionary<string, object>();
                    }
                  
                    model.AdvanceSearchModel.Add("UploadType", GalleryUploadType.Photo.GetStringValue());
                }

                objReturn = _galleryService.GetAllDetails(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> GetAllVideoDetails(IndexModel model)
        {
            ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> objReturn = new ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>>();
            try
            {

                if (model.AdvanceSearchModel != null && model.AdvanceSearchModel.ContainsKey("UploadType"))
                {
                    model.AdvanceSearchModel["UploadType"] = GalleryUploadType.Video.GetStringValue();
                }
                else
                {
                    if (model.AdvanceSearchModel == null)
                    {
                        model.AdvanceSearchModel = new Dictionary<string, object>();
                    }

                    model.AdvanceSearchModel.Add("UploadType", GalleryUploadType.Video.GetStringValue());
                }

                objReturn = _galleryService.GetAllDetails(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> GetAllYoutubeDetails(IndexModel model)
        {
            ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> objReturn = new ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>>();
            try
            {
                if (model != null)
                {
                    if (model.AdvanceSearchModel != null && model.AdvanceSearchModel.ContainsKey("UploadType"))
                    {
                        model.AdvanceSearchModel["UploadType"] = GalleryUploadType.VIDEO_URL.GetStringValue();
                    }
                    else
                    {
                        if (model.AdvanceSearchModel == null)
                        {
                            model.AdvanceSearchModel = new Dictionary<string, object>();
                        }

                        model.AdvanceSearchModel.Add("UploadType", GalleryUploadType.VIDEO_URL.GetStringValue());
                    }

                }


                objReturn = _galleryService.GetAllDetails(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }
        [HttpPost]
        public ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> GetAllVideoandYoutubeDetails(IndexModel model)
        {
            ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>> objReturn = new ServiceResponse<PagedData<PhotoVideoGalleryFileViewModel>>();
            try
            {

                objReturn = _galleryService.GetAllDetails(model, GalleryUploadType.Photo.GetStringValue()+","+ GalleryUploadType.PDF.GetStringValue() + "," + GalleryUploadType.URL.GetStringValue());
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


