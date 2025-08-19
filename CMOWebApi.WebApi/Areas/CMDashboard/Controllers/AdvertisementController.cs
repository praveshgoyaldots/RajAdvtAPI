

using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using static CMOWebApi.Core.Enums.FileValiodation;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    [Authorize]
    public class AdvertisementController : ApiController
    {
        private readonly IAdvertisementService _advertisementService;
        private readonly string _path = FilePath.AdvLocation.GetStringValue();

        public AdvertisementController(IAdvertisementService advertisementService)
        {
            _advertisementService = advertisementService;
        }


        [HttpPost]
        public async Task<ServiceResponse<string>> AddUpdateAdvertisement(AdvertisementModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model != null)
                {
                    // Add
                    if (!(model.Id > 0) && (model.Category > 0 || model.SubCategory > 0 || !string.IsNullOrEmpty(model.SubjectEng) || !string.IsNullOrEmpty(model.SubjectHin) || model.AdvDate != null || !string.IsNullOrEmpty(model.DocumentUrl) || !string.IsNullOrEmpty(model.PdfUrl)))
                    {
                        return await _advertisementService.AddUpdateAdvertisement(model);
                    }
                    else if (model.Id > 0)      // Update 
                    {
                        return await _advertisementService.AddUpdateAdvertisement(model);
                    }
                    else
                    {
                        objReturn.IsSuccess = false;
                        objReturn.Message = "Record not saved..! All Fields are blank";
                        return objReturn;
                    }
                }

                objReturn.Exception = "AdvertisementModel model is null";
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementController/ AddUpdateAdvertisement", ex, JsonConvert.SerializeObject(model));

                objReturn.IsSuccess = false;
                objReturn.Exception = ex.Message;
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
                    return await _advertisementService.Delete(id);
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
        public async Task<ServiceResponse<AdvertisementViewModel>> GetById(long id)
        {
            ServiceResponse<AdvertisementViewModel> objReturn = new ServiceResponse<AdvertisementViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _advertisementService.GetById(id);
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
        public ServiceResponse<PagedData<AdvertisementListModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<AdvertisementListModel>> objReturn = new ServiceResponse<PagedData<AdvertisementListModel>>();
            try
            {
                return _advertisementService.GetAll(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<string>> LockToggle(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _advertisementService.LockToggle(id);
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
        public async Task<ServiceResponse<string>> SendNotificationOnPublish(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _advertisementService.SendNotificationOnPublish(id);

                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.Error;
                    return objReturn;
                }
            }
            catch (Exception)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public ServiceResponse<string> RedesignRequestByPlatformUser()
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                RedesignRequestModel model = JsonConvert.DeserializeObject<RedesignRequestModel>(HttpContext.Current.Request.Form["Data"]);

                if (HttpContext.Current.Request.Files.Count > 0)
                {
                    List<RedesignRequestByPlatformUserLookupModel> attachment = new List<RedesignRequestByPlatformUserLookupModel>();
                    foreach (var item in HttpContext.Current.Request.Files.AllKeys)
                    {
                        RedesignRequestByPlatformUserLookupModel obj = new RedesignRequestByPlatformUserLookupModel();
                        HttpPostedFile file = HttpContext.Current.Request.Files[item];
                        if (file.ContentType.Contains("image/"))
                        {
                            if (file.ContentLength < Convert.ToInt64(SchemeValueTypeEnumKeyForFile.Size))
                            {
                                string extension = Path.GetExtension(file.FileName);
                                string guidName = Guid.NewGuid().ToString();
                                string path = CommonUtility.UploadAdvertisement(string.Empty, model.AdvertisementId, false, true) + extension;
                                obj.RequestUrl = path;
                                attachment.Add(obj);
                                file.SaveAs(HttpContext.Current.Server.MapPath(path));
                            }
                            else
                            {
                                objReturn.IsSuccess = false;
                                objReturn.Message = CustomMessageStatus.FileSize;
                                return objReturn;
                            }
                        }
                        else
                        {
                            objReturn.IsSuccess = false;
                            objReturn.Message = CustomMessageStatus.FileNotValid;
                            return objReturn;
                        }

                    }
                    model.RedesignRequestByPlatformUserList = attachment;
                }


                if (ModelState.IsValid)
                {
                    return _advertisementService.RedesignRequestByPlatformUser(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.ErrorValidation;
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
        public ServiceResponse<PagedData<RedesignViewForAdminModel>> GetRedesignListForAdmin(IndexModel model)
        {
            ServiceResponse<PagedData<RedesignViewForAdminModel>> objReturn = new ServiceResponse<PagedData<RedesignViewForAdminModel>>();
            try
            {
                return _advertisementService.GetRedesignListForAdmin(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }


        [HttpPost]
        public ServiceResponse<RedesignDetailModel> GetRedesignRequestDetailsForAdmin(AdvertisementRedesignRequestIdModel model)
        {
            ServiceResponse<RedesignDetailModel> objReturn = new ServiceResponse<RedesignDetailModel>();
            try
            {
                if (ModelState.IsValid)
                {
                    return _advertisementService.GetRedesignRequestDetailsForAdmin(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.ErrorValidation;
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
        public ServiceResponse<string> RedesignApproveByAdmin(ApproveByAdminModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return _advertisementService.RedesignApproveByAdmin(model);
                }
                else
                {
                    objReturn.IsSuccess = false;
                    objReturn.Message = MessageStatus.ErrorValidation;
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
        public ServiceResponse<PagedData<AdvListForAdmindeptDptPlatformUserModel>> GetAdvListForAdminDepartmentDepartmentPlatformUser(IndexModel model)
        {
            ServiceResponse<PagedData<AdvListForAdmindeptDptPlatformUserModel>> objReturn = new ServiceResponse<PagedData<AdvListForAdmindeptDptPlatformUserModel>>();
            try
            {
                return _advertisementService.GetAdvListForAdminDepartmentDepartmentPlatformUser(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<string>> UploadedService(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _advertisementService.UploadedService(id);
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

        /// <summary>
        /// Change advertisement status.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _advertisementService.UpdateStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #region Goverment Achivement Related And advertisement
        [HttpPost]
        public async Task<ServiceResponse<string>> AddGovermentAchivement(GovermentAchievementModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                if (model != null)
                {
                    return await _advertisementService.AddGovermentAchivement(model);

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
        public async Task<ServiceResponse<string>> UpdateGovermentAchivement(GovermentAchievementModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                if (model.Id > 0)
                {
                    return await _advertisementService.UpdateGovermentAchivement(model);
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
        public async Task<ServiceResponse<string>> DeleteGovermentAchivement(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _advertisementService.DeleteGovermentAchivement(id);
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
        public ServiceResponse<PagedData<GovermentAchievementModel>> GetAllGovermentAchivement(IndexModel model)
        {
            ServiceResponse<PagedData<GovermentAchievementModel>> objReturn = new ServiceResponse<PagedData<GovermentAchievementModel>>();
            try
            {
                return _advertisementService.GetAllGovermentAchivementList(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<GovermentAchievementModel>> GetByIdGovermentAchivement(long id)
        {
            ServiceResponse<GovermentAchievementModel> objReturn = new ServiceResponse<GovermentAchievementModel>();
            try
            {
                if (id > 0)
                {
                    return await _advertisementService.GetByIdGovermentAchivement(id);
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

        /// <summary>
        /// Set Active and De-Active status for show result on fron
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateGovermentAchivementStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _advertisementService.UpdateGovermentAchivementStatus(id);
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

        #endregion

        #region Advertisement Or Goverment Achivement checked

        [HttpPost]
        public async Task<ServiceResponse<string>> AddGovermentAchivementOrAdvertisement(AdvertisementOrGovermentAchievementModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                if (model != null)
                {

                    return await _advertisementService.AddGovermentAchivementOrAdvertisement(model);

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
        public async Task<ServiceResponse<string>> UpdateGovermentAchivementOrAdvertisement(AdvertisementOrGovermentAchievementModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                if (model.Id > 0)
                {

                    return await _advertisementService.UpdateGovermentAchivementOrAdvertisement(model);

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
        public ServiceResponse<PagedData<AdvertisementOrGovermentAchievementModel>> GetAllGovermentAchivementOrAdvertisement(IndexModel model)
        {
            ServiceResponse<PagedData<AdvertisementOrGovermentAchievementModel>> objReturn = new ServiceResponse<PagedData<AdvertisementOrGovermentAchievementModel>>();
            try
            {
                return _advertisementService.GetAllGovermentAchivementOrAdvertisement(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<AdvertisementOrGovermentAchievementModel>> GetByIdGovermentAchivementOrAdvertisement(long id)
        {
            ServiceResponse<AdvertisementOrGovermentAchievementModel> objReturn = new ServiceResponse<AdvertisementOrGovermentAchievementModel>();
            try
            {
                if (id > 0)
                {
                    return await _advertisementService.GetByIdGovermentAchivementOrAdvertisement(id);
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

        #endregion

        #region visitor count report and detail report

        /// <summary>
        /// get all visitor count according to websiteurl and add custom filter on todate ,fromdate, websiteurl
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<VisitorCountReportViewModel>> VisitorCountReport(VisitorCountSearchModel model)
        {
            ServiceResponse<List<VisitorCountReportViewModel>> objReturn = new ServiceResponse<List<VisitorCountReportViewModel>>();
            try
            {
                objReturn = _advertisementService.VisitorCountReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// get all visitor count according to websiteurl and add filter and custom search also
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<VisitorCountDetailReportViewModel>> VisitorCountDetailReport(VisitorCountSearchModel model)
        {
            ServiceResponse<PagedData<VisitorCountDetailReportViewModel>> objReturn = new ServiceResponse<PagedData<VisitorCountDetailReportViewModel>>();
            try
            {
                objReturn = _advertisementService.VisitorCountDetailReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        [HttpPost]
        public ServiceResponse<List<VisitorCountReportViewModel>> DateWiseVisitorCountReport(VisitorCountSearchModel model)
        {
            ServiceResponse<List<VisitorCountReportViewModel>> objReturn = new ServiceResponse<List<VisitorCountReportViewModel>>();
            try
            {
                objReturn = _advertisementService.DateWiseVisitorCountReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion

    }
}
