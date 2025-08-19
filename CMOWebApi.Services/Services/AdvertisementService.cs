using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.LookUpTypeEnum;
using static CMOWebApi.Core.Enums.NotificationTemplatesTypeEnum;
using static CMOWebApi.Core.Enums.SchemeValueTypeEnum;

namespace CMOWebApi.Services.Services
{
    public class AdvertisementService : BaseService, IAdvertisementService
    {
        #region Variable Declaration's
        IUnitofWork _uow;

        private static string _baseUrl = ConfigurationManager.AppSettings["baseUrl"];
        private static string _redesignLocation = HttpContext.Current.Server.MapPath(FilePath.RedesignLocation.GetStringValue());
        private static string _advLocation = HttpContext.Current.Server.MapPath(FilePath.AdvLocation.GetStringValue());
        private readonly string _path = FilePath.AdvLocation.GetStringValue();
        private readonly string apiBaseUrl = ConfigurationManager.AppSettings["BaseUrl"];

        #endregion

        public AdvertisementService(IUnitofWork uow)
        {
            _uow = uow;
        }

        public async Task<ServiceResponse<string>> AddUpdateAdvertisement(AdvertisementModel model)
        {
            try
            {
                ServiceResponse<string> objReturn = new ServiceResponse<string>();
                tblADV_AdvertisementMaster obj = new tblADV_AdvertisementMaster();

                if (model.Id > 0)
                {
                    if (!string.IsNullOrEmpty(model.DocumentUrl))
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(model.DocumentUrl, false, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess)
                        {
                            string base64File = model.DocumentUrl;
                            model.DocumentUrl = CommonUtility.UploadAdvertisement(model.DocumentUrl, model.Id);
                            UploadDefaultAdvtFile(base64File);
                        }
                        else
                        {
                            return isValid;
                        }
                    }

                    if (!string.IsNullOrEmpty(model.PdfUrl))
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(model.PdfUrl, true, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess)
                        {
                            model.PdfUrl = CommonUtility.UploadAdvertisement(model.PdfUrl, model.Id, true);
                        }
                        else
                        {
                            return isValid;
                        }
                    }
                    obj = _uow.GenericRepository<tblADV_AdvertisementMaster>().GetByID(model.Id);
                }

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<AdvertisementModel, tblADV_AdvertisementMaster>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                if (model.Id > 0)
                {

                    obj.ModifiedDate = DateTime.Now;
                    obj.ModifiedBy = _loginUserDetail.UserId;//TODO
                    await _uow.GenericRepository<tblADV_AdvertisementMaster>().UpdateAsync(obj);
                }
                else
                {
                    obj.ModifiedBy = _loginUserDetail.UserId;
                    obj.ModifiedDate = DateTime.Now;
                    obj.CreateDate = DateTime.Now;
                    obj.CreatedBy = _loginUserDetail.UserId;//TODO
                    obj.DocumentUrl = null;
                    obj.PdfUrl = null;
                    await _uow.GenericRepository<tblADV_AdvertisementMaster>().AddAsync(obj);
                    _uow.save();
                    obj.Code = obj.Id;

                    if (!string.IsNullOrEmpty(model.DocumentUrl))
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(model.DocumentUrl, false, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess)
                        {
                            obj.DocumentUrl = CommonUtility.UploadAdvertisement(model.DocumentUrl, obj.Id);
                        }
                        else
                        {
                            return isValid;
                        }
                    }

                    if (!string.IsNullOrEmpty(model.PdfUrl))
                    {
                        var isValid = CommonUtility.IsAllowedMimeType(model.PdfUrl, true, _loginUserDetail.FileSize);
                        if (isValid.IsSuccess)
                        {
                            obj.PdfUrl = CommonUtility.UploadAdvertisement(model.PdfUrl, obj.Id, true);
                        }
                        else
                        {
                            return isValid;
                        }
                    }

                    await _uow.GenericRepository<tblADV_AdvertisementMaster>().UpdateAsync(obj);
                    _uow.save();
                }

                if ((model.AdminDepartment != null && model.AdminDepartment.Count > 0)
                    || (model.BeneficiaryCategories != null && model.BeneficiaryCategories.Count > 0)
                    || (model.Districts != null && model.Districts.Count > 0))
                {
                    if (model.Id > 0)
                    {
                        if (obj.tblADV_AdminDepartmentLookup.Count > 0)
                        {
                            _uow.GenericRepository<tblADV_AdminDepartmentLookup>().DeleteAllById(obj.tblADV_AdminDepartmentLookup.ToList());
                        }
                        if (obj.tblADV_BeneficiaryCategoryLookup.Count > 0)
                        {
                            _uow.GenericRepository<tblADV_BeneficiaryCategoryLookup>().DeleteAllById(obj.tblADV_BeneficiaryCategoryLookup.ToList());
                        }
                        if (obj.tblADV_DistrictLookup.Count > 0)
                        {
                            _uow.GenericRepository<tblADV_DistrictLookup>().DeleteAllById(obj.tblADV_DistrictLookup.ToList());
                        }
                    }

                    if (model.AdminDepartment != null && model.AdminDepartment.Count > 0)
                    {
                        foreach (var item in model.AdminDepartment)
                        {
                            if (!string.IsNullOrEmpty(item))
                            {
                                tblADV_AdminDepartmentLookup objAdminDep = new tblADV_AdminDepartmentLookup();
                                objAdminDep.AdvertisementId = obj.Id;
                                objAdminDep.AdminDepartmentCode = Convert.ToInt32(item);
                                await _uow.GenericRepository<tblADV_AdminDepartmentLookup>().AddAsync(objAdminDep);
                            }
                        }
                    }

                    if (model.BeneficiaryCategories != null && model.BeneficiaryCategories.Count > 0)
                    {
                        foreach (var item in model.BeneficiaryCategories)
                        {
                            if (!string.IsNullOrEmpty(item))
                            {
                                tblADV_BeneficiaryCategoryLookup objBenCategory = new tblADV_BeneficiaryCategoryLookup();
                                objBenCategory.AdvertisementId = obj.Id;
                                objBenCategory.BeneficiaryCategoryId = Convert.ToInt32(item);
                                await _uow.GenericRepository<tblADV_BeneficiaryCategoryLookup>().AddAsync(objBenCategory);
                            }
                        }
                    }

                    if (model.Districts != null && model.Districts.Count > 0)
                    {
                        foreach (var item in model.Districts)
                        {
                            if (!string.IsNullOrEmpty(item))
                            {
                                tblADV_DistrictLookup objDistrict = new tblADV_DistrictLookup();
                                objDistrict.AdvertisementId = obj.Id;
                                objDistrict.DistrictCode = Convert.ToInt32(item);
                                await _uow.GenericRepository<tblADV_DistrictLookup>().AddAsync(objDistrict);
                            }
                        }
                    }
                }
                _uow.save();
                objReturn = SetResultStatus(string.Empty, MessageStatus.Save, true);

                return objReturn;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ AddUpdateAdvertisement", ex);
                return SetResultStatus(string.Empty, MessageStatus.Error, false, Convert.ToString(ex));
            }
        }

        public async Task<ServiceResponse<string>> Delete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblADV_AdvertisementMaster objAdvt = await _uow.GenericRepository<tblADV_AdvertisementMaster>().GetByIdAsync(id);
                objAdvt.IsDeleted = true;
                await _uow.GenericRepository<tblADV_AdvertisementMaster>().UpdateAsync(objAdvt);
                _uow.save();
                return objReturn = SetResultStatus(string.Empty, MessageStatus.Delete, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ Delete", ex);
                return objReturn = SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<AdvertisementViewModel>> GetById(long idModel)
        {
            ServiceResponse<AdvertisementViewModel> objReturn = new ServiceResponse<AdvertisementViewModel>();
            try
            {
                vwADV_AdvertisementDetails objAdvt = await _uow.GenericRepository<vwADV_AdvertisementDetails>().GetByIdAsync(idModel);
                AdvertisementViewModel resultAdvt = new AdvertisementViewModel();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_AdvertisementDetails, AdvertisementViewModel>()
                    .ForMember(des => des.DocumentUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(HttpContext.Current.Server.MapPath(x.DocumentUrl)) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.DocumentUrl))) : string.Empty))
                    .ForMember(des => des.PdfUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(HttpContext.Current.Server.MapPath(x.PdfUrl)) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.PdfUrl))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resultAdvt = mapper.Map(objAdvt, resultAdvt);

                objReturn = SetResultStatus(resultAdvt, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetById", ex);
                objReturn = SetResultStatus<AdvertisementViewModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public async Task<ServiceResponse<string>> LockToggle(long id)
        {
            try
            {
                tblADV_AdvertisementMaster obj = await _uow.GenericRepository<tblADV_AdvertisementMaster>().GetByIdAsync(id);
                if (obj != null)
                {
                    obj.IsLock = !(obj.IsLock != null ? obj.IsLock : false);
                    await _uow.GenericRepository<tblADV_AdvertisementMaster>().UpdateAsync(obj);
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.Lock, true);
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.NotExist, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ LockToggle", ex);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<AdvertisementListModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<AdvertisementListModel> responsedata = new PagedData<AdvertisementListModel>();

                PagedData<tblADV_AdvertisementMaster> resultdata = GenericGridCall<tblADV_AdvertisementMaster>.ListView(model.PageSize, x => x.Id, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblADV_AdvertisementMaster, AdvertisementListModel>()
                    .ForMember(des => des.SubjectEng, src => src.MapFrom(x => !string.IsNullOrEmpty(x.SubjectEng) ? x.SubjectEng : "--")).ForMember(des => des.SubjectHin, src => src.MapFrom(x => !string.IsNullOrEmpty(x.SubjectHin) ? x.SubjectHin : "--"));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<AdvertisementListModel>>(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetAll", ex);
                return SetResultStatus<PagedData<AdvertisementListModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// when Admin set ISActive=True then We send notification to All Admin  department 
        /// correspondent this advertisement,thier Department and plateform Users
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> SendNotificationOnPublish(long id)
        {
            try
            {
                List<spADV_ListOfAdminDepartmentDepartmentUserMaster_Result> data = _uow.ExeccuteStoreProcedure<spADV_ListOfAdminDepartmentDepartmentUserMaster_Result>("spADV_ListOfAdminDepartmentDepartmentUserMaster @AdvId", new SqlParameter("AdvId", SqlDbType.BigInt) { Value = id }).ToList();

                if (data != null && data.Count > 0)
                {

                    //set IsActive =true 
                    var obj = _uow.GenericRepository<tblADV_AdvertisementMaster>().GetByID(id);
                    obj.IsActive = true;
                    await _uow.GenericRepository<tblADV_AdvertisementMaster>().UpdateAsync(obj);

                    //Get Email/SMS Template 
                    List<tblNotificationEmailTemplate> objEmailTemplate = _uow.GenericRepository<tblNotificationEmailTemplate>().GetAll().ToList();
                    List<tblNotificationSMSTemplate> objSMSTemplate = _uow.GenericRepository<tblNotificationSMSTemplate>().GetAll().ToList();

                    //Insert data of all notified user 
                    foreach (var item in data.Where(x => !string.IsNullOrEmpty(x.Email) && !string.IsNullOrEmpty(x.MobileNo)))
                    {
                        tblADV_NotificationLookup objNotfn = new tblADV_NotificationLookup();

                        objNotfn.AdvertisementCode = item.AdvertisementCode;
                        objNotfn.IsUploaded = false;
                        objNotfn.NotifiedUseDptCode = item.NotifiedUseCode;
                        await _uow.GenericRepository<tblADV_NotificationLookup>().AddAsync(objNotfn);
                        _uow.save();

                        if (item.IsApprove == true)
                        {
                            tblADV_RedesignPlatformUserLookup objChild = new tblADV_RedesignPlatformUserLookup();
                            objChild.IsApproved = false;
                            objChild.NotificationLookupId = objNotfn.Id;
                            await _uow.GenericRepository<tblADV_RedesignPlatformUserLookup>().AddAsync(objChild);
                        }


                    }

                    _uow.save();

                    //send notification to Admin Approval Master ----Need to be descuss

                    var objApproval = _uow.GenericRepository<tblADV_ApprovalDetailMaster>().GetAll(filter: x => x.IsActive == true && x.IsDelete == false).FirstOrDefault();

                    string name = string.Join(", ", data.Where(x => x.Type != AdvUserTypeEnum.UserType.PlatformUser.ToString() && string.IsNullOrEmpty(x.Email) && string.IsNullOrEmpty(x.MobileNo)).Select(x => x.Name).ToList());

                    List<String> toEmail = new List<String>();
                    toEmail.Add(objApproval.DefaultEmail);
                    if (toEmail != null && toEmail.Count > 0)
                    {
                        var emailTemptItem = objEmailTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.AdminNotificationToAddUserForNotification)).FirstOrDefault();

                        EmailHelper.SendMail("Ds Test", Convert.ToString(ConfigurationManager.AppSettings["EmailSentFrom"]), toEmail, null, null, emailTemptItem.Subject, emailTemptItem.EmailContent + name, null);
                    }
                    var sMSTemptItem = objSMSTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.AdminNotificationToAddUserForNotification)).FirstOrDefault();

                    List<String> mobileNo = new List<String>();
                    mobileNo.Add(objApproval.DefaultMobileNo);

                    SmsHelper.SendSms(mobileNo, sMSTemptItem.SMSContent);

                    // send notification to admin department and department upload advertisement
                    var toEmailDepartment = data.Where(x => x.Type != AdvUserTypeEnum.UserType.PlatformUser.ToString() && !string.IsNullOrEmpty(x.Email)).Select(x => x.Email).ToList();

                    var emailTepmtItem = objEmailTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.AdminDepartmentDepartmentNotification)).FirstOrDefault();

                    if (toEmailDepartment != null && toEmailDepartment.Count > 0)
                    {
                        EmailHelper.SendMail("Ds Test", Convert.ToString(ConfigurationManager.AppSettings["EmailSentFrom"]), toEmailDepartment, null, null, emailTepmtItem.Subject, emailTepmtItem.EmailContent, null);
                    }

                    var sMSTepmtItem = objSMSTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.AdminDepartmentDepartmentNotification)).FirstOrDefault();

                    mobileNo = new List<String>();
                    mobileNo = data.Where(x => x.Type != AdvUserTypeEnum.UserType.PlatformUser.ToString() && !string.IsNullOrEmpty(x.MobileNo)).Select(x => x.MobileNo).ToList();

                    var smsRes = SmsHelper.SendSms(mobileNo, sMSTepmtItem.SMSContent);

                    //send notification to Non approval plateform user for upload advertisement
                    emailTepmtItem = objEmailTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.NonApprovePlatformNotification)).FirstOrDefault();

                    var toEmailNonApproveUser = data.Where(x => x.Type == AdvUserTypeEnum.UserType.PlatformUser.ToString() && !string.IsNullOrEmpty(x.Email) && x.IsApprove == false).Select(x => x.Email).ToList();
                    if (toEmailNonApproveUser != null && toEmailNonApproveUser.Count > 0)
                    {
                        EmailHelper.SendMail("Ds Test", Convert.ToString(ConfigurationManager.AppSettings["EmailSentFrom"]), toEmailNonApproveUser, null, null, emailTepmtItem.Subject, emailTepmtItem.EmailContent, null);
                    }

                    sMSTepmtItem = objSMSTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.NonApprovePlatformNotification)).FirstOrDefault();

                    mobileNo = new List<String>();
                    mobileNo = data.Where(x => x.Type == AdvUserTypeEnum.UserType.PlatformUser.ToString() && !string.IsNullOrEmpty(x.MobileNo) && x.IsApprove == false).Select(x => x.MobileNo).ToList();

                    smsRes = SmsHelper.SendSms(mobileNo, sMSTepmtItem.SMSContent);

                    // send notification to plateform user for upload advertisement
                    var toEmailApproveUser = data.Where(x => x.Type == AdvUserTypeEnum.UserType.PlatformUser.ToString() && !string.IsNullOrEmpty(x.Email) && x.IsApprove == true).Select(x => x.Email).ToList();
                    emailTepmtItem = objEmailTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.PlatformNotification)).FirstOrDefault();

                    if (toEmailApproveUser != null && toEmailApproveUser.Count > 0)
                    {
                        EmailHelper.SendMail("Ds Test", Convert.ToString(ConfigurationManager.AppSettings["EmailSentFrom"]), toEmailApproveUser, null, null, emailTepmtItem.Subject, emailTepmtItem.EmailContent, null);
                    }

                    sMSTepmtItem = objSMSTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.PlatformNotification)).FirstOrDefault();

                    mobileNo = new List<String>();
                    mobileNo = data.Where(x => x.Type == AdvUserTypeEnum.UserType.PlatformUser.ToString() && !string.IsNullOrEmpty(x.MobileNo) && x.IsApprove == true).Select(x => x.MobileNo).ToList();

                    smsRes = SmsHelper.SendSms(mobileNo, sMSTepmtItem.SMSContent);

                }

                return SetResultStatus("", MessageStatus.StatusUpdate, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ SendNotificationOnPublish", ex);
                return SetResultStatus("", MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Platform User can request with New Design of Advertisment using This API
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> RedesignRequestByPlatformUser(RedesignRequestModel model)
        {
            try
            {
                var urls = String.Join(",", model.RedesignRequestByPlatformUserList.Select(x => x.RequestUrl));

                spADV_RedesignRequestSave_Result data = _uow.ExeccuteStoreProcedure<spADV_RedesignRequestSave_Result>("spADV_RedesignRequestSave @RedesignId,@Urls",
                    new SqlParameter("RedesignId", SqlDbType.BigInt) { Value = model.RedesignPlatformUserLookupId },
                    new SqlParameter("Urls", SqlDbType.NVarChar) { Value = urls }).FirstOrDefault();

                //Get Email/SMS Template 
                List<tblNotificationEmailTemplate> objEmailTemplate = _uow.GenericRepository<tblNotificationEmailTemplate>().GetAll().ToList();
                List<tblNotificationSMSTemplate> objSMSTemplate = _uow.GenericRepository<tblNotificationSMSTemplate>().GetAll().ToList();

                //Send notification to Admin
                if (data != null)
                {
                    if (!string.IsNullOrEmpty(data.Email))
                    {
                        List<String> ToEmail = new List<String>();
                        ToEmail.Add(data.Email);
                        var emailTepmtItem = objEmailTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.MailForAdminToApproveRedesign)).FirstOrDefault();

                        EmailHelper.SendMail("Ds Test", Convert.ToString(ConfigurationManager.AppSettings["EmailSentFrom"]), ToEmail, null, null, emailTepmtItem.Subject, emailTepmtItem.EmailContent, null);
                    }
                    if (!string.IsNullOrEmpty(data.MobileNo))
                    {
                        var sMSTepmtItem = objSMSTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.MailForAdminToApproveRedesign)).FirstOrDefault();

                        List<String> mobileNo = new List<String>();
                        mobileNo.Add(data.MobileNo);

                        SmsHelper.SendSms(mobileNo, sMSTepmtItem.SMSContent);
                    }
                }

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ RedesignRequestByPlatformUser", ex);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// this API is use to Get List Of All Active=True Advertisement with 
        /// action of Redesign Detail screen 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<RedesignViewForAdminModel>> GetRedesignListForAdmin(IndexModel model)
        {
            try
            {
                PagedData<RedesignViewForAdminModel> responsedata = new PagedData<RedesignViewForAdminModel>();

                PagedData<vwADV_RedesignForAdmin> resultdata = GenericGridCall<vwADV_RedesignForAdmin>.ListView(model.PageSize, x => x.SubjectEng, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_RedesignForAdmin, RedesignViewForAdminModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<RedesignViewForAdminModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetRedesignListForAdmin", ex);
                return SetResultStatus<PagedData<RedesignViewForAdminModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// using this API admin can see Detail of New Design requested by 
        /// Platform User, and take action on it
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<RedesignDetailModel> GetRedesignRequestDetailsForAdmin(AdvertisementRedesignRequestIdModel model)
        {
            try
            {
                RedesignDetailModel result = new RedesignDetailModel();

                //Original Advertisement Details
                vwADV_AdvertisementDetails objAdvt = _uow.GenericRepository<vwADV_AdvertisementDetails>().GetByID(model.AdvId);
                AdvertisementViewModel resultAdvt = new AdvertisementViewModel();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_AdvertisementDetails, AdvertisementViewModel>().ForMember(des => des.DocumentUrl, src => src.MapFrom(x => CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.DocumentUrl))))
                    .ForMember(des => des.CategoryName, src => src.MapFrom(x => x.CategoryName))
                    .ForMember(des => des.SubCategoryName, src => src.MapFrom(x => x.SubCategoryName));
                });
                IMapper mapper = config.CreateMapper();
                resultAdvt = mapper.Map(objAdvt, resultAdvt);

                if (model.RedesignId > 0)
                {
                    //Requested Advertisement Details 
                    List<string> reqImageList = new List<string>();

                    var redesignRequest = _uow.GenericRepository<tblADV_RedesignRequestByPlatformUserLookup>().GetAll(filter: x => x.RedesignPlatformUserLookupId == model.RedesignId);
                    result.IsApproved = redesignRequest.Select(x => x.tblADV_RedesignPlatformUserLookup.IsApproved).FirstOrDefault();
                    result.IsRejected = redesignRequest.Select(x => x.tblADV_RedesignPlatformUserLookup.IsRejected).FirstOrDefault();
                    result.Remaks = redesignRequest.Select(x => x.tblADV_RedesignPlatformUserLookup.Remaks).FirstOrDefault();

                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblADV_RedesignRequestByPlatformUserLookup, RedesignRequestByPlatformUserViewModel>().ForMember(des => des.Url, src => src.MapFrom(x => CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.RequestUrl))));
                    });
                    mapper = config.CreateMapper();
                    result.RequestImageList = mapper.Map(redesignRequest, result.RequestImageList);
                }

                result.AdvertisementList = resultAdvt;
                return SetResultStatus<RedesignDetailModel>(result, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetRedesignRequestDetailsForAdmin", ex);
                return SetResultStatus<RedesignDetailModel>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// when Platform user request with New design Then Admin have 
        /// rights to reject and approve using this API
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> RedesignApproveByAdmin(ApproveByAdminModel model)
        {
            try
            {
                spADV_PlatformUserDetailByRedesignId_Result data = _uow.ExeccuteStoreProcedure<spADV_PlatformUserDetailByRedesignId_Result>("spADV_PlatformUserDetailByRedesignId @RedesignId,@Remaks,@IsApprove",
                    new SqlParameter("RedesignId", SqlDbType.BigInt) { Value = model.Id },
                    new SqlParameter("Remaks", SqlDbType.NVarChar) { Value = model.Remaks },
                     new SqlParameter("IsApprove", SqlDbType.Bit) { Value = model.IsApprove }).FirstOrDefault();

                //Send notification to correspondent user
                if (data != null)
                {
                    //Get Email/SMS Template 
                    List<tblNotificationEmailTemplate> objEmailTemplate = _uow.GenericRepository<tblNotificationEmailTemplate>().GetAll().ToList();
                    List<tblNotificationSMSTemplate> objSMSTemplate = _uow.GenericRepository<tblNotificationSMSTemplate>().GetAll().ToList();

                    if (!string.IsNullOrEmpty(data.UserEmail))
                    {
                        List<String> ToEmail = new List<String>();
                        ToEmail.Add(data.UserEmail);
                        var emailTepmtItem = objEmailTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.MailForUserRegardingRedesignApprove)).FirstOrDefault();

                        EmailHelper.SendMail("Ds Test", Convert.ToString(ConfigurationManager.AppSettings["EmailSentFrom"]), ToEmail, null, null, emailTepmtItem.Subject, emailTepmtItem.EmailContent, null);
                    }
                    if (!string.IsNullOrEmpty(data.UserMobileNo))
                    {
                        var sMSTepmtItem = objSMSTemplate.Where(x => x.TypeCode == Convert.ToInt32(TemplatesTypeEnum.MailForUserRegardingRedesignApprove)).FirstOrDefault();

                        List<String> mobileNo = new List<String>();
                        mobileNo.Add(data.UserMobileNo);

                        SmsHelper.SendSms(mobileNo, sMSTepmtItem.SMSContent);
                    }
                }

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ RedesignApproveByAdmin", ex);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// when Admin Department/Department And platform user login on
        /// our portal then this Api is use to show advertisement list acc. to User Id which 
        /// is stored in table tblADV_NotificationMaster(MappingCode)
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<AdvListForAdmindeptDptPlatformUserModel>> GetAdvListForAdminDepartmentDepartmentPlatformUser(IndexModel model)
        {
            try
            {
                PagedData<AdvListForAdmindeptDptPlatformUserModel> responsedata = new PagedData<AdvListForAdmindeptDptPlatformUserModel>();
                //add filter acc to SSo id(Admin department/user/department ids) TODO
                PagedData<vwADV_AdvListForAdmindeptDptPlatformUser> resultdata = GenericGridCall<vwADV_AdvListForAdmindeptDptPlatformUser>.ListView(model.PageSize, x => x.SubjectEng, x => x.SSOId.ToLower() == _loginUserDetail.SSOID.ToLower(), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_AdvListForAdmindeptDptPlatformUser, AdvListForAdmindeptDptPlatformUserModel>()
                    .ForMember(des => des.DocumentUrl, src => src.MapFrom(x => !string.IsNullOrEmpty((x.DocumentUrl)) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.DocumentUrl))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<AdvListForAdmindeptDptPlatformUserModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetAdvListForAdminDepartmentDepartmentPlatformUser", ex);
                return SetResultStatus<PagedData<AdvListForAdmindeptDptPlatformUserModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// When user upload Advertisment on thier portal then 
        /// call this service to inform admin about that
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UploadedService(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblADV_NotificationLookup objAdvt = await _uow.GenericRepository<tblADV_NotificationLookup>().GetByIdAsync(id);
                objAdvt.IsUploaded = true;
                await _uow.GenericRepository<tblADV_NotificationLookup>().UpdateAsync(objAdvt);
                _uow.save();
                return objReturn = SetResultStatus(string.Empty, MessageStatus.Uploaded, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ UploadedService", ex);
                return objReturn = SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<AdvertisementByDateModel>> GetAdvertisementByDate(string date)
        {
            try
            {
                DateTime advDate = !string.IsNullOrEmpty(date) ? date.ToValidDate() : DateTime.Now.Date;

                List<vwADV_AdvertisementDetails> objAdvt = _uow.GenericRepository<vwADV_AdvertisementDetails>().GetAll(x => x.AdvDate == advDate && x.IsActive == true && x.IsDeleted == false).ToList();

                List<AdvertisementByDateModel> resultAdvt = new List<AdvertisementByDateModel>();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_AdvertisementDetails, AdvertisementByDateModel>().ForMember(des => des.DocumentUrl, src => src.MapFrom(x => CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.DocumentUrl))));
                });
                IMapper mapper = config.CreateMapper();
                resultAdvt = mapper.Map(objAdvt, resultAdvt);

                return SetResultStatus(resultAdvt, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetAdvertisementByDate", ex);
                return SetResultStatus<List<AdvertisementByDateModel>>(null, ex.Message, false);
            }
        }

        public ServiceResponse<List<AdvertisementByDateModel>> GetDataByDate(ApiGetDataModel model, HttpRequestHeaders header = null)
        {
            try
            {
                if (header != null)
                {
                    model = (model == null) ? new ApiGetDataModel() : model;
                    DateTime? toDate = !string.IsNullOrEmpty(model.Todate) ? model.Todate.ToValidDate() : (DateTime?)null;
                    DateTime? fromDate = !string.IsNullOrEmpty(model.Fromdate) ? model.Fromdate.ToValidDate() : (DateTime?)null;

                    var temp = Convert.ToInt64(LookUpEnumKeys.Advertisement);
                    IEnumerable<string> username, password, clientid;
                    header.TryGetValues("username", out username);
                    header.TryGetValues("password", out password);
                    header.TryGetValues("clientid", out clientid);
                    tblClientIdForService objclient = _uow.GenericRepository<tblClientIdForService>().GetAll(
                        filter: x => x.UserId == username.FirstOrDefault() && x.Password == password.FirstOrDefault() && x.ClientId == clientid.FirstOrDefault()
                        && x.tblClientIdModuleMappings.Select(z => z.ModuleCode == temp).FirstOrDefault()
                        ).FirstOrDefault();

                    if (objclient != null)
                    {

                        List<vwADV_AdvertisementServiceList> objAdvt = _uow.GenericRepository<vwADV_AdvertisementServiceList>()
                            .GetAll(x => (!string.IsNullOrEmpty(model.Fromdate) ? x.AdvDate >= fromDate : true)
                            && (!string.IsNullOrEmpty(model.Todate) ? x.AdvDate <= toDate : true) &&
                            (model.Id > 0 ? x.Id == model.Id : true) && x.IsActive == true && x.IsDeleted == false).ToList();

                        List<AdvertisementByDateModel> resultAdvt = new List<AdvertisementByDateModel>();

                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<vwADV_AdvertisementServiceList, AdvertisementByDateModel>().ForMember(des => des.DocumentUrl, src => src.MapFrom(x => CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.DocumentUrl))));
                        });
                        IMapper mapper = config.CreateMapper();
                        resultAdvt = mapper.Map(objAdvt, resultAdvt);

                        return SetResultStatus(resultAdvt, MessageStatus.Success, true);
                    }
                    else
                    {
                        return SetResultStatus<List<AdvertisementByDateModel>>(null, MessageStatus.UnauthorizedUser, false);
                    }
                }
                else
                {
                    return SetResultStatus<List<AdvertisementByDateModel>>(null, MessageStatus.UnauthorizedUser, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetDataByDate", ex);
                return SetResultStatus<List<AdvertisementByDateModel>>(null, ex.Message, false);
            }
        }

        public ServiceResponse<AdvertisementAchievementModel> ServiceForGetAllAdvertisement()
        {
            try
            {
                AdvertisementAchievementModel result = new AdvertisementAchievementModel();

                // Advertisement list
                List<vwADV_AdvertisementServiceList> objclient = _uow.GenericRepository<vwADV_AdvertisementServiceList>().GetAll().OrderByDescending(x => x.Id).ToList();

                if (objclient != null)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vwADV_AdvertisementServiceList, AdvertisementByDateModel>()
                        .ForMember(des => des.DocumentUrl, src => src.MapFrom(x => x.DocumentUrl.Replace("~", "")))
                        .ForMember(des => des.PdfUrl, src => src.MapFrom(x => x.PdfUrl.Replace("~", "")));
                    });
                    IMapper mapper = config.CreateMapper();
                    result.AdvertismentDataList = mapper.Map(objclient, result.AdvertismentDataList);

                    //// Government Achievement list
                    //List<vwAdv_GovermentAchivementDetail> objAchv = _uow.GenericRepository<vwAdv_GovermentAchivementDetail>()
                    //  .GetAll(filter:x=>x.IsActive==true).OrderByDescending(x => x.Id).ToList();

                    // config = new MapperConfiguration(cfg =>
                    //{
                    //    cfg.CreateMap<vwAdv_GovermentAchivementDetail, GovermentAchievementViewModel>()
                    //    .ForMember(des => des.UploadAttachment, src => src.MapFrom(x => CommonUtility.GetBase64strFromFilePath(_advLocation + x.UploadAttachment)))
                    //        .ForMember(des => des.ImageUrl, src => src.MapFrom(x => CommonUtility.GetBase64strFromFilePath(_advLocation + x.ImageUrl)));
                    //});
                    // mapper = config.CreateMapper();
                    //result.GovAchievementDataList = mapper.Map(objAchv, result.GovAchievementDataList);

                    //Is Advertisement Or Goverment Achivement
                    tblAdv_or_GovermentAchievement objIsAchv = _uow.GenericRepository<tblAdv_or_GovermentAchievement>()
                   .GetAll(filter: x => x.IsDelete == false && x.IsActive == true).OrderByDescending(x => x.Id).FirstOrDefault();

                    result.IsAdvertisementorGovermentAchivement = objIsAchv.IsAdvertisementorGovermentAchivement;

                    return SetResultStatus(result, MessageStatus.Success, true);
                }
                else
                {
                    return SetResultStatus<AdvertisementAchievementModel>(null, MessageStatus.UnauthorizedUser, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ ServiceForGetAllAdvertisement", ex);
                return SetResultStatus<AdvertisementAchievementModel>(null, ex.Message, false);
            }
        }

        public ServiceResponse<AdvertisementAchievementModel> ServiceForGetAllAdvertisement_Front()
        {
            try
            {
                AdvertisementAchievementModel result = new AdvertisementAchievementModel();

                // Advertisement list
                List<vwADV_AdvertisementList_Front> objclient = _uow.GenericRepository<vwADV_AdvertisementList_Front>().GetAll().OrderByDescending(x => x.Id).ToList();

                if (objclient != null)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vwADV_AdvertisementList_Front, AdvertisementByDateModel>()
                        .ForMember(des => des.DocumentUrl, src => src.MapFrom(x => x.DocumentUrl.Replace("~", "")))
                        .ForMember(des => des.PdfUrl, src => src.MapFrom(x => x.PdfUrl.Replace("~", "")));
                    });
                    IMapper mapper = config.CreateMapper();
                    result.AdvertismentDataList = mapper.Map(objclient, result.AdvertismentDataList);

                    tblAdv_or_GovermentAchievement objIsAchv = _uow.GenericRepository<tblAdv_or_GovermentAchievement>()
                   .GetAll(filter: x => x.IsDelete == false && x.IsActive == true).OrderByDescending(x => x.Id).FirstOrDefault();

                    result.IsAdvertisementorGovermentAchivement = objIsAchv.IsAdvertisementorGovermentAchivement;

                    return SetResultStatus(result, MessageStatus.Success, true);
                }
                else
                {
                    return SetResultStatus<AdvertisementAchievementModel>(null, MessageStatus.UnauthorizedUser, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ ServiceForGetAllAdvertisement_Front", ex);
                return SetResultStatus<AdvertisementAchievementModel>(null, ex.Message, false);
            }
        }

        #region Goverment achivement
        public async Task<ServiceResponse<string>> AddGovermentAchivement(GovermentAchievementModel model)
        {
            try
            {
                ServiceResponse<string> objReturn = new ServiceResponse<string>();
                tblGovermentAchievement obj = new tblGovermentAchievement();
                if (!string.IsNullOrEmpty(model.ImageUrl))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.ImageUrl, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        string path = HttpContext.Current.Server.MapPath(_path);
                        model.ImageUrl = CommonUtility.SaveFileFromBase64str(model.ImageUrl, path);
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.UploadAttachment))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.UploadAttachment, true, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        string path = HttpContext.Current.Server.MapPath(_path);
                        model.UploadAttachment = CommonUtility.SaveFileFromBase64str(model.UploadAttachment, path);
                    }
                    else
                    {
                        return isValid;
                    }
                }
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<GovermentAchievementModel, tblGovermentAchievement>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                obj.CreatedDate = DateTime.Now;
                //obj.CreatedBy = model.CreatedBy;//TODO
                await _uow.GenericRepository<tblGovermentAchievement>().AddAsync(obj);
                _uow.save();
                obj.Code = obj.Id;
                await _uow.GenericRepository<tblGovermentAchievement>().UpdateAsync(obj);
                _uow.save();

                objReturn = SetResultStatus(string.Empty, MessageStatus.Save, true);

                return objReturn;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ AddGovermentAchivement", ex);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> UpdateGovermentAchivement(GovermentAchievementModel model)
        {
            ServiceResponse<tblGovermentAchievement> objReturn = new ServiceResponse<tblGovermentAchievement>();
            try
            {
                tblGovermentAchievement obj = await _uow.GenericRepository<tblGovermentAchievement>().GetByIdAsync(model.Id);
                if (!string.IsNullOrEmpty(model.ImageUrl))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.ImageUrl, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        string path = HttpContext.Current.Server.MapPath(_path);
                        model.ImageUrl = CommonUtility.SaveFileFromBase64str(model.ImageUrl, path);
                    }
                    else
                    {
                        return isValid;
                    }
                }
                if (!string.IsNullOrEmpty(model.UploadAttachment))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.UploadAttachment, true, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        string path = HttpContext.Current.Server.MapPath(_path);
                        model.UploadAttachment = CommonUtility.SaveFileFromBase64str(model.UploadAttachment, path);
                    }
                    else
                    {
                        return isValid;
                    }
                }

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<GovermentAchievementModel, tblGovermentAchievement>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;
                await _uow.GenericRepository<tblGovermentAchievement>().UpdateAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ UpdateGovermentAchivement", ex);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<GovermentAchievementModel>> GetByIdGovermentAchivement(long id)
        {
            ServiceResponse<GovermentAchievementModel> objReturn = new ServiceResponse<GovermentAchievementModel>();
            try
            {
                tblGovermentAchievement objAdvt = await _uow.GenericRepository<tblGovermentAchievement>().GetByIdAsync(id);
                GovermentAchievementModel resultAdvt = new GovermentAchievementModel();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblGovermentAchievement, GovermentAchievementModel>().ForMember(des => des.ImageUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ImageUrl) ? (CommonUtility.GetBase64strFromFilePath(_advLocation + x.ImageUrl)) : string.Empty))
                    .ForMember(des => des.UploadAttachment, src => src.MapFrom(x => !string.IsNullOrEmpty(x.UploadAttachment) ? (CommonUtility.GetBase64strFromFilePath(_advLocation + x.UploadAttachment)) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resultAdvt = mapper.Map(objAdvt, resultAdvt);

                objReturn = SetResultStatus(resultAdvt, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetByIdGovermentAchivement", ex);
                objReturn = SetResultStatus<GovermentAchievementModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public async Task<ServiceResponse<string>> DeleteGovermentAchivement(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblGovermentAchievement objAdvt = await _uow.GenericRepository<tblGovermentAchievement>().GetByIdAsync(id);
                objAdvt.IsDelete = true;
                await _uow.GenericRepository<tblGovermentAchievement>().UpdateAsync(objAdvt);
                _uow.save();
                return objReturn = SetResultStatus(string.Empty, MessageStatus.Delete, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ DeleteGovermentAchivement", ex);
                return objReturn = SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Set Active and De-Active status for show result on fron
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateGovermentAchivementStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tblGovermentAchievement objResult = _uow.GenericRepository<tblGovermentAchievement>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblGovermentAchievement>().UpdateAsync(objResult);
                        _uow.save();
                        return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ UpdateGovermentAchivementStatus", ex);
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }

        public ServiceResponse<PagedData<GovermentAchievementModel>> GetAllGovermentAchivement(IndexModel model)
        {
            try
            {
                PagedData<GovermentAchievementModel> responsedata = new PagedData<GovermentAchievementModel>();

                PagedData<vwAdv_GovermentAchivementDetail> resultdata = GenericGridCall<vwAdv_GovermentAchivementDetail>.ListView(model.PageSize, x => x.Id, x => x.IsActive == true, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var advViewLocation = FilePath.AdvViewLocation.GetStringValue();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwAdv_GovermentAchivementDetail, GovermentAchievementModel>()
                    .ForMember(des => des.ImageUrl, src => src.MapFrom(x => advViewLocation + x.ImageUrl))
                    .ForMember(des => des.UploadAttachment, src => src.MapFrom(x => advViewLocation + x.UploadAttachment));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<GovermentAchievementModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetAllGovermentAchivement", ex);
                return SetResultStatus<PagedData<GovermentAchievementModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<GovermentAchievementModel>> GetAllGovermentAchivement_Front(IndexModel model)
        {
            try
            {
                PagedData<GovermentAchievementModel> responsedata = new PagedData<GovermentAchievementModel>();

                PagedData<tblGovermentAchievement> resultdata = GenericGridCall<tblGovermentAchievement>.ListView(model.PageSize, x => x.Id, x => x.IsDelete == false && x.IsActive == true, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var advViewLocation = FilePath.AdvViewLocation.GetStringValue();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblGovermentAchievement, GovermentAchievementModel>()
                    .ForMember(des => des.ImageUrl, src => src.MapFrom(x => advViewLocation + x.ImageUrl))
                    .ForMember(des => des.UploadAttachment, src => src.MapFrom(x => advViewLocation + x.UploadAttachment));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<GovermentAchievementModel>>(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetAllGovermentAchivement_Front", ex);
                return SetResultStatus<PagedData<GovermentAchievementModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<GovermentAchievementModel>> GetAllGovermentAchivementList(IndexModel model)
        {
            try
            {
                PagedData<GovermentAchievementModel> responsedata = new PagedData<GovermentAchievementModel>();

                PagedData<vwAdv_GovermentAchivementDetail> resultdata = GenericGridCall<vwAdv_GovermentAchivementDetail>.ListView(model.PageSize, x => x.Id, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var advViewLocation = FilePath.AdvViewLocation.GetStringValue();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwAdv_GovermentAchivementDetail, GovermentAchievementModel>()
                    .ForMember(des => des.ImageUrl, src => src.MapFrom(x => advViewLocation + x.ImageUrl))
                     .ForMember(des => des.UploadAttachment, src => src.MapFrom(x => advViewLocation + x.UploadAttachment));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<GovermentAchievementModel>>(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetAllGovermentAchivementList", ex);
                return SetResultStatus<PagedData<GovermentAchievementModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Advertisement Or Goverment Achivement checked
        public async Task<ServiceResponse<string>> AddGovermentAchivementOrAdvertisement(AdvertisementOrGovermentAchievementModel model)
        {
            try
            {
                ServiceResponse<string> objReturn = new ServiceResponse<string>();
                tblAdv_or_GovermentAchievement obj = new tblAdv_or_GovermentAchievement();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<AdvertisementOrGovermentAchievementModel, tblAdv_or_GovermentAchievement>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                obj.CreatedDate = DateTime.Now;
                //obj.CreatedBy = model.CreatedBy;//TODO
                await _uow.GenericRepository<tblAdv_or_GovermentAchievement>().AddAsync(obj);
                _uow.save();
                await _uow.GenericRepository<tblAdv_or_GovermentAchievement>().UpdateAsync(obj);
                _uow.save();

                objReturn = SetResultStatus(string.Empty, MessageStatus.Save, true);

                return objReturn;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ AddGovermentAchivementOrAdvertisement", ex);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> UpdateGovermentAchivementOrAdvertisement(AdvertisementOrGovermentAchievementModel model)
        {
            ServiceResponse<tblAdv_or_GovermentAchievement> objReturn = new ServiceResponse<tblAdv_or_GovermentAchievement>();
            try
            {
                tblAdv_or_GovermentAchievement obj = await _uow.GenericRepository<tblAdv_or_GovermentAchievement>().GetByIdAsync(model.Id);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<AdvertisementOrGovermentAchievementModel, tblAdv_or_GovermentAchievement>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;
                await _uow.GenericRepository<tblAdv_or_GovermentAchievement>().UpdateAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ UpdateGovermentAchivementOrAdvertisement", ex);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<AdvertisementOrGovermentAchievementModel>> GetAllGovermentAchivementOrAdvertisement(IndexModel model)
        {
            try
            {
                PagedData<AdvertisementOrGovermentAchievementModel> responsedata = new PagedData<AdvertisementOrGovermentAchievementModel>();

                PagedData<tblAdv_or_GovermentAchievement> resultdata = GenericGridCall<tblAdv_or_GovermentAchievement>.ListView(model.PageSize, x => x.Id, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblAdv_or_GovermentAchievement, AdvertisementOrGovermentAchievementModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<AdvertisementOrGovermentAchievementModel>>(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetAllGovermentAchivementOrAdvertisement", ex);
                return SetResultStatus<PagedData<AdvertisementOrGovermentAchievementModel>>(null, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<AdvertisementOrGovermentAchievementModel>> GetByIdGovermentAchivementOrAdvertisement(long id)
        {
            ServiceResponse<AdvertisementOrGovermentAchievementModel> objReturn = new ServiceResponse<AdvertisementOrGovermentAchievementModel>();
            try
            {
                tblAdv_or_GovermentAchievement objAdvt = await _uow.GenericRepository<tblAdv_or_GovermentAchievement>().GetByIdAsync(id);
                AdvertisementOrGovermentAchievementModel resultAdvt = new AdvertisementOrGovermentAchievementModel();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblAdv_or_GovermentAchievement, AdvertisementOrGovermentAchievementModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultAdvt = mapper.Map(objAdvt, resultAdvt);

                objReturn = SetResultStatus(resultAdvt, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetByIdGovermentAchivementOrAdvertisement", ex);
                objReturn = SetResultStatus<AdvertisementOrGovermentAchievementModel>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }
        #endregion

        #region Service For All Department and other User

        /// <summary>
        /// Get the list of all Goverment Achievement, Advertisement and display status of
        /// Is Advertisement Or Goverment Achivement
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<AllAdvertisementAndGovAchievmentListModel> GetAllAdvertisementAndGovAchievment()
        {
            try
            {
                AllAdvertisementAndGovAchievmentListModel result = new AllAdvertisementAndGovAchievmentListModel();

                //Advertisement list
                List<vwADV_AdvertisementServiceList> objAdvt = _uow.GenericRepository<vwADV_AdvertisementServiceList>()
                    .GetAll().OrderByDescending(x => x.Id).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_AdvertisementServiceList, AdvertisementByDateServiceModel>()
                    .ForMember(des => des.DocumentUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.DocumentUrl) ? (apiBaseUrl + x.DocumentUrl.Replace("~", "")) : string.Empty))
                    .ForMember(des => des.PdfUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfUrl) ? (apiBaseUrl + x.PdfUrl.Replace("~", "")) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                result.AdvertismentDataList = mapper.Map(objAdvt, result.AdvertismentDataList);

                //Is Advertisement Or Goverment Achivement
                tblAdv_or_GovermentAchievement objIsAchvOrAdv = _uow.GenericRepository<tblAdv_or_GovermentAchievement>()
               .GetAll(filter: x => x.IsDelete == false && x.IsActive == true).OrderByDescending(x => x.Id).FirstOrDefault();

                result.IsAdvertisementorGovermentAchivement = objIsAchvOrAdv.IsAdvertisementorGovermentAchivement;

                // Goverment Achivement
                List<vwAdv_GovermentAchivementDetail> achivData = _uow.GenericRepository<vwAdv_GovermentAchivementDetail>()
                   .GetAll(filter: x => x.IsActive == true).OrderByDescending(x => x.Id).ToList();

                config = new MapperConfiguration(cfg =>
               {
                   cfg.CreateMap<vwAdv_GovermentAchivementDetail, GovermentAchievementServiceModel>()
                   .ForMember(des => des.ImageUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.ImageUrl) ? (apiBaseUrl + _path.Replace("~", "") + x.ImageUrl) : string.Empty))
                    .ForMember(des => des.UploadAttachment, src => src.MapFrom(x => !string.IsNullOrEmpty(x.UploadAttachment) ? (apiBaseUrl + _path.Replace("~", "") + x.UploadAttachment) : string.Empty));
               });
                mapper = config.CreateMapper();
                result.GovAchievementDataList = mapper.Map(achivData, result.GovAchievementDataList);

                return SetResultStatus(result, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetAllAdvertisementAndGovAchievment", ex);
                return SetResultStatus<AllAdvertisementAndGovAchievmentListModel>(null, ex.Message, false);
            }
        }

        /// <summary>
        /// Get the list of all Advertisement 
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<AdvertisementServiceModel>> GetAllAdvertisement()
        {
            ServiceResponse<List<AdvertisementServiceModel>> objReturn = new ServiceResponse<List<AdvertisementServiceModel>>();
            try
            {
                List<AdvertisementServiceModel> result = new List<AdvertisementServiceModel>();

                //Advertisement list
                List<vwADV_AdvertisementServiceList> objAdvt = _uow.GenericRepository<vwADV_AdvertisementServiceList>()
                    .GetAll().OrderByDescending(x => x.Id).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_AdvertisementServiceList, AdvertisementServiceModel>()
                    .ForMember(des => des.DocumentUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.DocumentUrl) ? (apiBaseUrl + x.DocumentUrl.Replace("~/", "")) : string.Empty))
                    .ForMember(des => des.PdfUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.PdfUrl) ? (apiBaseUrl + x.PdfUrl.Replace("~/", "")) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(objAdvt, result);

                objReturn.IsSuccess = true;
                objReturn.Message = MessageStatus.Success;
                objReturn.StatusCode = ResponseStatusCode.ok; ;
                objReturn.Data = result;
                return objReturn;

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetAllAdvertisement", ex);

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.StatusCode = ResponseStatusCode.error; ;
                return objReturn;
            }
        }

        #endregion


        #region RajAdvt Site 

        /// <summary>
        /// Save record of end user from advertisement popup on click on "I Pledge" button
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> CreateRajAdvtPortalLog(RajAdvtPortalAddLogRequestModel model)
        {
            try
            {
                var ipAddress = CommonUtility.GetIpAddress();
                var createdDate = DateTime.Now;
                _uow.ExeccuteStoreProcedure("Sp_CreateRajAdvtPortalLog @IPAddress,@WebSitUrl,@CreatedDate",
                    new SqlParameter("IPAddress", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(ipAddress) ? string.Empty : ipAddress },
                    new SqlParameter("WebSitUrl", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.WebSitUrl) ? string.Empty : model.WebSitUrl },
                    new SqlParameter("CreatedDate", SqlDbType.DateTime) { Value = createdDate }
                );

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ CreateRajAdvtPortalLog", null, ex.Message);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> CreateRajAdvtPortalLogV1(RajAdvtPortalAddLogRequestModel model)
        {
            try
            {
                if (model != null && !string.IsNullOrEmpty(model.WebSitUrl))
                {
                    var ipAddress = CommonUtility.GetIpAddress();

                    var log = new tblADV_RajAdvtPortalLog();
                    log.IPAddress = ipAddress;
                    log.WebSitUrl = model.WebSitUrl;
                    log.CreatedDate = DateTime.Now;

                    await _uow.GenericRepository<tblADV_RajAdvtPortalLog>().AddAsync(log);
                    _uow.save();

                    return SetResultStatus(string.Empty, MessageStatus.Save, true);
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.Error, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ CreateRajAdvtPortalLog", null, ex.Message);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get total count of click of "I Pledge" button on RajAdvt site
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<RajAdvtPortalLogCountModel> GetRajAdvtPortalLogCount()
        {
            ServiceResponse<RajAdvtPortalLogCountModel> objReturn = new ServiceResponse<RajAdvtPortalLogCountModel>();
            try
            {
                RajAdvtPortalLogCountModel result = new RajAdvtPortalLogCountModel();

                result.Count = _uow.GenericRepository<tblADV_RajAdvtPortalLog>().GetAll().Count();

                objReturn.IsSuccess = true;
                objReturn.Message = MessageStatus.Success;
                objReturn.StatusCode = ResponseStatusCode.ok; ;
                objReturn.Data = result;
                return objReturn;

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetRajAdvtPortalLogCount", ex);
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.StatusCode = ResponseStatusCode.error; ;
                return objReturn;
            }
        }

        #endregion

        #region Visitor Counter Report and detail report

        /// <summary>
        /// get all visitor count according to websiteurl and add custom filter on todate ,fromdate, websiteurl
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<VisitorCountReportViewModel>> VisitorCountReport(VisitorCountSearchModel model)
        {
            try
            {
                List<VisitorCountReportViewModel> resultData = new List<VisitorCountReportViewModel>();

                List<SP_ADV_RajAdvtVisitorCountReport_Result> data = _uow.ExeccuteStoreProcedure<SP_ADV_RajAdvtVisitorCountReport_Result>("SP_ADV_RajAdvtVisitorCountReport @ToDate, @FromDate, @WebSitUrl"
                    , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : Convert.ToDateTime(model.ToDate).ToLocalTime().ToString("dd-MM-yyyy") }
                    , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : Convert.ToDateTime(model.FromDate).ToLocalTime().ToString("dd-MM-yyyy") }
                    , new SqlParameter("WebSitUrl", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.WebSitUrl) ? string.Empty : model.WebSitUrl }

                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_ADV_RajAdvtVisitorCountReport_Result, VisitorCountReportViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);
                if (model.OrderBy != null && model.OrderBy.ToLower() == "VisitorCount".ToLower())
                {
                    resultData = model.OrderByAsc == 1 ? (resultData.OrderBy(x => x.VisitorCount).ToList()) : (resultData.OrderByDescending(x => x.VisitorCount).ToList());
                }
                else
                {
                    resultData = model.OrderByAsc == 1 ? (resultData.OrderBy(x => x.WebSitUrl).ToList()) : (resultData.OrderByDescending(x => x.WebSitUrl).ToList());
                }

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ VisitorCountReport", ex);
                return SetResultStatus<List<VisitorCountReportViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// get all visitor count according to websiteurl and add filter and custom search also
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<VisitorCountDetailReportViewModel>> VisitorCountDetailReport(VisitorCountSearchModel model)
        {
            try
            {
                PagedData<VisitorCountDetailReportViewModel> responsedata = new PagedData<VisitorCountDetailReportViewModel>();

                object[] @parameters = new object[8];
                @parameters[0] = string.IsNullOrEmpty(model.FromDate) ? string.Empty : Convert.ToDateTime(model.FromDate).ToLocalTime().ToString("dd-MM-yyyy");
                @parameters[1] = string.IsNullOrEmpty(model.ToDate) ? string.Empty : Convert.ToDateTime(model.ToDate).ToLocalTime().ToString("dd-MM-yyyy");
                @parameters[2] = string.IsNullOrEmpty(model.WebSitUrl) ? string.Empty : model.WebSitUrl;
                @parameters[3] = string.IsNullOrEmpty(model.CustomSearch) ? string.Empty : model.CustomSearch;
                @parameters[4] = string.IsNullOrEmpty(model.OrderBy) ? "TotalCount" : model.OrderBy;
                @parameters[5] = model.OrderByAsc == 0 ? false : true;
                @parameters[6] = model.Page;
                @parameters[7] = model.PageSize;

                PagedData<SP_ADV_RajAdvtVisitorCountDetailReport_Result> resultdata = GenericGridCall<SP_ADV_RajAdvtVisitorCountDetailReport_Result>.SPListView(@parameters, model.PageSize, x => x.TotalCount, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page, true);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_ADV_RajAdvtVisitorCountDetailReport_Result, VisitorCountDetailReportViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                if (resultdata.Data.Count() > 0)
                {
                    responsedata.TotalRecords = resultdata.Data.ToList()[0].TotalRecord;
                }

                return SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ VisitorCountDetailReport", ex);
                return SetResultStatus<PagedData<VisitorCountDetailReportViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<VisitorCountReportViewModel>> DateWiseVisitorCountReport(VisitorCountSearchModel model)
        {
            try
            {
                List<VisitorCountReportViewModel> resultData = new List<VisitorCountReportViewModel>();

                List<SP_ADV_RajAdvtVisitorDateWiseCountReport_Result> data = _uow.ExeccuteStoreProcedure<SP_ADV_RajAdvtVisitorDateWiseCountReport_Result>(
                    "SP_ADV_RajAdvtVisitorDateWiseCountReport @FromDate, @ToDate",
                    new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : Convert.ToDateTime(model.FromDate).ToLocalTime().ToString("dd-MM-yyyy") },
                    new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : Convert.ToDateTime(model.ToDate).ToLocalTime().ToString("dd-MM-yyyy") }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_ADV_RajAdvtVisitorDateWiseCountReport_Result, VisitorCountReportViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                if (model.OrderBy != null && model.OrderBy.ToLower() == "VisitorCount".ToLower())
                {
                    resultData = model.OrderByAsc == 1 ? (resultData.OrderBy(x => x.VisitorCount).ToList()) : (resultData.OrderByDescending(x => x.VisitorCount).ToList());
                }
                else
                {
                    resultData = model.OrderByAsc == 1 ? (resultData.OrderBy(x => x.CreatedDate).ToList()) : (resultData.OrderByDescending(x => x.CreatedDate).ToList());
                }

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ DateWiseVisitorCountReport", ex);
                return SetResultStatus<List<VisitorCountReportViewModel>>(null, MessageStatus.Error, false);
            }
        }
        #endregion

        #region RajAdvt Service

        /// <summary>
        ///this service is used for making an entry in pledge table for SSO site only
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<string> CreateRajAdvtPortalLogServiceForSSO()
        {
            ServiceResponse<string> resultData = new ServiceResponse<string>();
            try
            {
                tblADV_RajAdvtPortalLog obj = new tblADV_RajAdvtPortalLog();
                obj.WebSitUrl = "https://sso.rajasthan.gov.in";
                obj.IPAddress = CommonUtility.GetIpAddress();
                obj.CreatedDate = DateTime.Now;

                // Commented by tanmaya on 11-08-2020--- As pledge click is stoped for now//--Uncommented on 08-10-2020
                _uow.GenericRepository<tblADV_RajAdvtPortalLog>().Add(obj);
                _uow.save();

                resultData.IsSuccess = true;
                resultData.Message = MessageStatus.Save;
                resultData.StatusCode = ResponseStatusCode.ok;
                return resultData;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ CreateRajAdvtPortalLogServiceForSSO", ex);
                resultData.IsSuccess = false;
                resultData.Message = MessageStatus.Error;
                resultData.StatusCode = ResponseStatusCode.error;
                return resultData;
            }
        }

        /// <summary>
        /// get all Pledged count according to websiteurl for other users
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<PledgedCountReportViewModel>> PledgedCountReport()
        {
            ServiceResponse<List<PledgedCountReportViewModel>> resultData = new ServiceResponse<List<PledgedCountReportViewModel>>();
            try
            {
                List<SP_ADV_RajAdvtVisitorCountReport_Result> data = _uow.ExeccuteStoreProcedure<SP_ADV_RajAdvtVisitorCountReport_Result>("SP_ADV_RajAdvtVisitorCountReport @ToDate, @FromDate, @WebSitUrl"
         , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.Empty }
         , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.Empty }
         , new SqlParameter("WebSitUrl", SqlDbType.NVarChar) { Value = string.Empty }).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_ADV_RajAdvtVisitorCountReport_Result, PledgedCountReportViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data, resultData.Data);

                resultData.IsSuccess = true;
                resultData.Message = MessageStatus.Success;
                resultData.StatusCode = ResponseStatusCode.ok;
                return resultData;
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ PledgedCountReport", ex);
                resultData.IsSuccess = false;
                resultData.Message = MessageStatus.Error;
                resultData.StatusCode = ResponseStatusCode.error;
                return resultData;
            }
        }

        #endregion

        #region RajAdvt Pledge Register

        /// <summary>
        /// Save record of end-user when user wants to register for a certificate of taking Pledge
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> RajAdvtPledgeRegister(RajAdvtPledgeRegisterModel model)
        {
            try
            {
                tblADV_RajAdvtPledgeRegister obj = new tblADV_RajAdvtPledgeRegister();

                if (model.Id > 0)
                {
                    obj = _uow.GenericRepository<tblADV_RajAdvtPledgeRegister>().GetByID(model.Id);
                    if (obj.OTP != model.OTP)
                    {
                        return SetResultStatus(string.Empty, MessageStatus.VerifyOTP, false);
                    }
                }
                else
                {
                    model.OTP = Convert.ToInt32(_uow.ExeccuteStoreProcedure<sp_ADV_PledgeGenerateOTP_Result>("sp_ADV_PledgeGenerateOTP").FirstOrDefault().OTP);
                    //Send OTP
                    CreateLogHelper.CreateLogFile("Send Pledge OTP :" + DateTime.Now.ToString() + " \n");
                    List<string> mobile = new List<string>();
                    mobile.Add(model.Mobile);
                    var content = "Your OTP for Pledge is:  - " + model.OTP;
                    CreateLogHelper.CreateLogFile("Send Pledge OTP Mobile no./ OTP :" + model.Mobile + "/" + model.OTP + " \n");
                    var smsStatus = SmsHelper.SendSms(mobile, content);
                    CreateLogHelper.CreateLogFile("Send Pledge smsStatus:" + smsStatus.responseCode + " \n");
                }

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<RajAdvtPledgeRegisterModel, tblADV_RajAdvtPledgeRegister>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                obj.CreatedDate = DateTime.Now;


                await _uow.GenericRepository<tblADV_RajAdvtPledgeRegister>().AddAsync(obj);
                _uow.save();

                return SetResultStatus(obj.Id.ToString(), MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ RajAdvtPledgeRegister", ex);
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        #endregion

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblADV_AdvertisementMaster objResult = _uow.GenericRepository<tblADV_AdvertisementMaster>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblADV_AdvertisementMaster>().UpdateAsync(objResult);
                        _uow.save();
                        return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ UpdateStatus", ex);
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }

        private void UploadDefaultAdvtFile(string path)
        {
            try
            {
                #region Update lastest default advt image
                string defaultPath = FilePath.AdvtDefaultFilePath.GetStringValue();
                string fullFilePath = HttpContext.Current.Server.MapPath(defaultPath);
                if (!Directory.Exists(fullFilePath))
                {
                    Directory.CreateDirectory(fullFilePath);
                }

                string fileName = "Advt-default-image.jpg";

                // Delete old file 
                CommonUtility.DeleteExistingFile(fullFilePath + fileName);

                // Upload new file
                CommonUtility.SaveFileFromBase64strWithFileName(path, fullFilePath, fileName);
                #endregion
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ UploadDefaultAdvtFile", ex);
            }
        }

        #region RajAdvt Front
        public ServiceResponse<GetAdvertisementPoppupDataModel> GetRajAdvtAdvertisementPopupData(int advtTypeCode = 0)
        {
            ServiceResponse<GetAdvertisementPoppupDataModel> response = new ServiceResponse<GetAdvertisementPoppupDataModel>();
            GetAdvertisementPoppupDataModel model = new GetAdvertisementPoppupDataModel();

            try
            {
                tblAdv_or_GovermentAchievement objIsAchv = _uow.GenericRepository<tblAdv_or_GovermentAchievement>()
               .GetAll(filter: x => x.IsDelete == false && x.IsActive == true).OrderByDescending(x => x.Id).FirstOrDefault();

                model.IsAdvertisementorGovermentAchivement = advtTypeCode > 0 ? advtTypeCode : objIsAchv.IsAdvertisementorGovermentAchivement;
                model.AdvtPopupHeaderUrl = !string.IsNullOrEmpty(objIsAchv.AdvtPopupHeaderUrl) ? objIsAchv.AdvtPopupHeaderUrl : string.Empty;

                #region Sector Wise Popup
                if (model.IsAdvertisementorGovermentAchivement == (int)SchemeTypeEnum.GovermentAchievement)
                {
                    var sectorWisePopupData = _uow.ExeccuteStoreProcedure<GetSectorWiseAdvertisementPoppupData_Result>("GetSectorWiseAdvertisementPoppupData").ToList();
                    if (sectorWisePopupData != null && sectorWisePopupData.Count > 0)
                    {
                        var advViewLocation = FilePath.AdvViewLocation.GetStringValue();

                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<GetSectorWiseAdvertisementPoppupData_Result, SectorWiseAdvertisementPoppupModel>();
                            //.ForMember(des => des.ImageUrl, src => src.MapFrom(x => string.IsNullOrEmpty(x.ImageUrl) ? string.Empty : advViewLocation + x.ImageUrl))
                            //.ForMember(des => des.UploadAttachment, src => src.MapFrom(x => string.IsNullOrEmpty(x.UploadAttachment) ? string.Empty : advViewLocation + x.UploadAttachment));
                        });
                        IMapper mapper = config.CreateMapper();
                        model.SectorWiseAdvertisementPoppupList = mapper.Map(sectorWisePopupData, model.SectorWiseAdvertisementPoppupList);
                    }
                }
                #endregion

                #region Display Newspaper Popup
                if (model.IsAdvertisementorGovermentAchivement == (int)SchemeTypeEnum.Advertisement || model.IsAdvertisementorGovermentAchivement == (int)SchemeTypeEnum.Jankalyan)
                {
                    var displayNewspaperPopupData = _uow.ExeccuteStoreProcedure<GetDisplayNewspaperAdvertisementPoppupData_Result>("GetDisplayNewspaperAdvertisementPoppupData").ToList();
                    if (displayNewspaperPopupData != null && displayNewspaperPopupData.Count > 0)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<GetDisplayNewspaperAdvertisementPoppupData_Result, DisplayNewspaperAdvertisementPoppupModel>()
                            .ForMember(des => des.DocumentUrl, src => src.MapFrom(x => string.IsNullOrEmpty(x.DocumentUrl) ? string.Empty : x.DocumentUrl.ToAbsolutePath()))
                            .ForMember(des => des.PdfUrl, src => src.MapFrom(x => string.IsNullOrEmpty(x.PdfUrl) ? string.Empty : x.PdfUrl.ToAbsolutePath()));
                        });
                        IMapper mapper = config.CreateMapper();
                        model.DisplayNewspaperAdvertisementPoppupList = mapper.Map(displayNewspaperPopupData, model.DisplayNewspaperAdvertisementPoppupList);
                    }
                }
                #endregion

                #region Ebooklet Popup
                if (model.IsAdvertisementorGovermentAchivement == (int)SchemeTypeEnum.Jankalyan || model.IsAdvertisementorGovermentAchivement == (int)SchemeTypeEnum.IsSocialMedia)
                {
                    var ebookletPopupData = _uow.ExeccuteStoreProcedure<GetEbookletAndDisplayNewspaperAdvertisementPoppupData_Result>("GetEbookletAndDisplayNewspaperAdvertisementPoppupData").ToList();
                    if (ebookletPopupData != null && ebookletPopupData.Count > 0)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<GetEbookletAndDisplayNewspaperAdvertisementPoppupData_Result, EbookletAndDisplayNewspaperAdvertisementPoppupModel>()
                             .ForMember(des => des.ImageIcon, src => src.MapFrom(f => string.IsNullOrEmpty(f.ImageIcon) ? string.Empty : f.ImageIcon.ToAbsolutePath()));
                        });
                        IMapper mapper = config.CreateMapper();
                        model.EbookletAndDisplayNewspaperAdvertisementPoppupList = mapper.Map(ebookletPopupData, model.EbookletAndDisplayNewspaperAdvertisementPoppupList);
                    }
                }
                #endregion

                #region Social Media Popup
                //if (model.IsAdvertisementorGovermentAchivement == (int)SchemeTypeEnum.Jankalyan || model.IsAdvertisementorGovermentAchivement == (int)SchemeTypeEnum.IsSocialMedia)
                if (model.IsAdvertisementorGovermentAchivement == (int)SchemeTypeEnum.IsSocialMedia)
                {
                    var socialMediaPopupData = _uow.ExeccuteStoreProcedure<GetSocialMediaAndEbookletAdvertisementPoppupData_Result>("GetSocialMediaAndEbookletAdvertisementPoppupData").ToList();
                    if (socialMediaPopupData != null && socialMediaPopupData.Count > 0)
                    {
                        var mapper = new MapperConfiguration(cfg => cfg.CreateMap<GetSocialMediaAndEbookletAdvertisementPoppupData_Result, SocialMediaAndEbookletAdvertisementPoppupModel>()
                              .AfterMap((s, d) =>
                              {
                                  d.PdfFIleName = string.IsNullOrEmpty(s.PdfFIleName) ? string.Empty : s.PdfFIleName.ToAbsolutePath();
                                  d.ImagePath = string.IsNullOrEmpty(s.ImagePath) ? string.Empty : s.ImagePath.ToAbsolutePath();
                              })
                          ).CreateMapper();
                        model.SocialMediaAndEbookletAdvertisementPoppupList = mapper.Map(socialMediaPopupData, model.SocialMediaAndEbookletAdvertisementPoppupList);
                    }
                }
                #endregion

                response.Data = model;
                return SetResultStatus<GetAdvertisementPoppupDataModel>(response.Data, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateErrorLogFile("AdvertisementService/ GetRajAdvtAdvertisementPopupData", ex);
                return SetResultStatus<GetAdvertisementPoppupDataModel>(null, ex.Message, false);
            }
        }

        #endregion

    }

}

