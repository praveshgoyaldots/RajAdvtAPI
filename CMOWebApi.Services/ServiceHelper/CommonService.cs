using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.Services;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.NotificationTemplatesTypeEnum;

namespace CMOWebApi.Services.ServiceHelper
{
    public class CommonService : BaseService
    {
        #region ///   Variable   ///
        IUnitofWork _uow;
        private static string _helpDocLocation = HttpContext.Current.Server.MapPath(FilePath.HelpDocLocation.GetStringValue());
        private readonly DepartmentContactDetails _departmentContactDetails;

        #endregion

        #region /// Constructor  ///

        public CommonService(IUnitofWork uow, DepartmentContactDetails departmentContactDetails)
        {
            _uow = uow;
            _departmentContactDetails = departmentContactDetails;
        }
        #endregion

        #region Methods

        public ServiceResponse<CommonDocModel> GetHelpDocument(string module, bool isBase64 = true)
        {

            try
            {
                CommonDocModel obj = new CommonDocModel();
                var type = Convert.ToInt64(module);

                var helpDocUrl = _uow.GenericRepository<tblHelpDocument>().GetAll(filter: x => x.TypeCode == type && x.IsDelete == false && x.IsActive == true).FirstOrDefault();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblHelpDocument, CommonDocModel>().ForMember(des => des.Url, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Url) ? isBase64 ? ((CommonUtility.GetBase64strFromFilePath(_helpDocLocation + x.Url))) : (FilePath.HelpDocLocation.GetStringValue() + x.Url).ToAbsolutePath() : string.Empty))
                    .ForMember(des => des.BlankDocUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BlankDocUrl) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + x.BlankDocUrl)) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(helpDocUrl, obj);

                //string HelpDocUrl = (!string.IsNullOrEmpty(helpDocUrl.Url) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + helpDocUrl.Url)) : string.Empty);

                return SetResultStatus(obj, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<CommonDocModel>(null, MessageStatus.Error, false);
            }
        }
        #endregion

        #region OTP

        public ServiceResponse<string> GenerateOTP()
        {
            try
            {
                int type = Convert.ToInt32(TemplatesTypeEnum.OTPContent);
                CreateLogHelper.CreateLogFile("Send OTP on mobile number :" + DateTime.Now.ToString() + "\n");

                sp_GenerateOTP_Result data = _uow.ExeccuteStoreProcedure<sp_GenerateOTP_Result>("sp_GenerateOTP @UserId",
               new SqlParameter("UserId", SqlDbType.Int) { Value = _loginUserDetail.UserId }).FirstOrDefault();

                if (!string.IsNullOrEmpty(data.Mobile) && !string.IsNullOrEmpty(data.OTP))
                {
                    var smsTepmtItem = _uow.GenericRepository<tblNotificationSMSTemplate>().GetAll(filter: x => x.TypeCode == type).FirstOrDefault();

                    if (smsTepmtItem != null)
                    {
                        smsTepmtItem.SMSContent = smsTepmtItem.SMSContent + "\n" + "Your OTP is: " + data.OTP;
                        CreateLogHelper.CreateLogFile("Send SMS smsTepmtItem :" + smsTepmtItem + " \n");
                        List<String> mobileNo = new List<String>();
                        mobileNo.Add(data.Mobile);
                        CreateLogHelper.CreateLogFile("Mobile No like :- " + string.Join(",", mobileNo) + "\n");
                        CreateLogHelper.CreateLogFile("OTP like :- " + data.OTP + "\n");

                        var isSMSSent = SmsHelper.SendSms(mobileNo, smsTepmtItem.SMSContent);

                        CreateLogHelper.CreateLogFile("SMS Status :- " + isSMSSent.responseCode.ToString() + "\n");
                        if (isSMSSent.responseCode == 200)
                        {
                            return SetResultStatus(string.Empty, MessageStatus.OTPSendSuccess, true);
                        }
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.OTPTemplateNotAvailable, false);
                    }
                }
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<string> VerifyOTP(string OTP)
        {
            try
            {
                tblUserOTP otpObj = _uow.GenericRepository<tblUserOTP>().GetAll(filter: x => x.OTP == OTP && x.IsExpired == false && x.UserId == _loginUserDetail.UserId).FirstOrDefault();
                if (otpObj != null)
                {
                    var expiryData = otpObj.ExpiryDate >= DateTime.Now.AddMinutes(-10);

                    if (expiryData)
                    {
                        otpObj.IsExpired = true;
                        _uow.GenericRepository<tblUserOTP>().Update(otpObj);
                        _uow.save();

                        return SetResultStatus(string.Empty, MessageStatus.Success, true);
                    }
                }

                return SetResultStatus(string.Empty, MessageStatus.VerifyOTP, false);
            }
            catch (Exception)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Notification Email/sms 
        public ServiceResponse<NotificationPreviewModel> GetTemplateType(TypeModel model)
        {
            try
            {
                NotificationPreviewModel result = new NotificationPreviewModel();

                tblNotificationEmailTemplate emailResult = new tblNotificationEmailTemplate();
                tblNotificationSMSTemplate sMSResult = new tblNotificationSMSTemplate();

                if (Convert.ToInt32(MessageTypeEnum.EmailType) == model.NotificationType)
                {
                    emailResult = _uow.GenericRepository<tblNotificationEmailTemplate>().GetAll(filter: x => x.TypeCode == model.TypeCode).FirstOrDefault();
                }
                else
                {
                    sMSResult = _uow.GenericRepository<tblNotificationSMSTemplate>().GetAll(filter: x => x.TypeCode == model.TypeCode).FirstOrDefault();
                }

                if (emailResult.EmailContent != null && emailResult.Subject != null)
                {
                    result.Subject = emailResult.Subject;
                    result.Content = emailResult.EmailContent;
                }
                else
                {
                    result.Content = sMSResult.SMSContent;
                }
                if (model.ModuleName == Convert.ToInt32(NotificationModuleNameEnum.OrderGenerationNotification))
                {
                    var objOrder = _uow.GenericRepository<tblODR_OrderEntryMaster>().GetAll(filter: x => x.Id == model.FilterId).FirstOrDefault();
                    if (objOrder != null && !string.IsNullOrEmpty(objOrder.ESignedFinalUrl))
                    {

                        string shortUrl = URLShortenerHelper.GetShorterUrl(objOrder.ESignedFinalUrl);
                        string ss = shortUrl;
                        result.Content = result.Content.Replace("{url}", ss);

                    }
                    result.DataList = GetOrderNotification(model.FilterId);
                }
                return SetResultStatus(result, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<NotificationPreviewModel>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<string> SendNotification(NotificationFinalSubmissionModel model)
        {
            try
            {
                bool isMailSent = false, isSMSSent = false;
                CreateLogHelper.CreateLogFile("Send Notification by generic priview screen :" + DateTime.Now.ToString() + " \n");
                if (Convert.ToInt32(MessageTypeEnum.EmailType) == model.NotificationType)
                {
                    if (!string.IsNullOrEmpty(model.Content))
                    {
                        CreateLogHelper.CreateLogFile("Emails like :- " + string.Join(",", model.EmailList) + "\n");
                        if (model.EmailList != null && model.EmailList.Count > 0)
                        {
                            isMailSent = EmailHelper.SendMail("Ds Test", Convert.ToString(ConfigurationManager.AppSettings["EmailSentFrom"]), model.EmailList, null, null, model.Subject, model.Content, null);

                            CreateLogHelper.CreateLogFile("Emails Status :- " + isMailSent.ToString() + "\n");
                        }
                    }
                }
                else
                {
                    if (!string.IsNullOrEmpty(model.Content))
                    {

                        CreateLogHelper.CreateLogFile("Mobile No like :- " + string.Join(",", model.MobileNumberList) + "\n");

                        if (model.MobileNumberList.Count > 0)
                        {
                            var isSMSStatus = SmsHelper.SendSms(model.MobileNumberList, model.Content);

                            CreateLogHelper.CreateLogFile("SMS Status :- " + isSMSStatus.responseCode.ToString() + "\n");

                            isSMSSent = isSMSStatus.responseCode == 200 ? true : false;
                        }

                    }
                }
                if (isSMSSent)
                {
                    return SetResultStatus(string.Empty, MessageStatus.SMSSendSuccess, true);
                }
                else if (isMailSent)
                {
                    return SetResultStatus(string.Empty, MessageStatus.EmailSendSuccess, true);
                }

                return SetResultStatus<string>(string.Empty, MessageStatus.Error, false);
            }
            catch (Exception ex)
            {
                return SetResultStatus<string>(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Send Notification To Department Officer from Scheme module
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<string> SendNotificationToDepartmentOfficer(SendNotificationToDeptOfficerModel model)
        {
            try
            {

                ServiceResponse<List<DepartmentContactOfficerModel>> objContactDetail = new ServiceResponse<List<DepartmentContactOfficerModel>>();
                objContactDetail = _departmentContactDetails.GetDepartmentOfficerByDepartment(model.DepartmentCode);
                if (objContactDetail.Data.Count > 0)
                {
                    List<string> MobileNumberList = objContactDetail.Data.Select(x => x.Mobile).ToList();

                    bool isSMSSent = false;
                    CreateLogHelper.CreateLogFile("SendNotificationToDepartmentOfficer Mobile No like :- " + string.Join(",", MobileNumberList) + "\n");

                    if (MobileNumberList.Count > 0)
                    {
                        var isSMSStatus = SmsHelper.SendSms(MobileNumberList, model.Content);

                        CreateLogHelper.CreateLogFile("SMS Status :- " + isSMSStatus.responseCode.ToString() + "\n");

                        isSMSSent = isSMSStatus.responseCode == 200 ? true : false;
                    }

                    if (isSMSSent)
                    {
                        return SetResultStatus(string.Empty, MessageStatus.SMSSendSuccess, true);
                    }
                    else
                    {
                        return SetResultStatus(string.Empty, MessageStatus.Error, false);
                    }
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                }

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("SendNotificationToDepartmentOfficer ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("SendNotificationToDepartmentOfficer ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("SendNotificationToDepartmentOfficer ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<string>(string.Empty, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Private Method

        private PagedData<GetNotificationGenericModel> GetOrderNotification(long orderId)
        {
            try
            {
                IndexModel model = new IndexModel();
                model.PageSize = 101;
                object[] @parameters = new object[1];
                @parameters[0] = orderId;
                PagedData<GetNotificationGenericModel> resulData = new PagedData<GetNotificationGenericModel>();
                PagedData<spODR_GNRT_GetReferenceForNotification_Result> data = GenericGridCall<spODR_GNRT_GetReferenceForNotification_Result>.SPListView(@parameters, model.PageSize, x => x.Id, null, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<spODR_GNRT_GetReferenceForNotification_Result, GetNotificationGenericModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<GetNotificationGenericModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords,
                 columnNames: new string[] { "DepartmentTitle", "Reference", "MobileNumber1", "MobileNumber2", "Email1", "Email2" },
                 headersName: new string[] { "Department", "Reference", "Mobile No1", "Mobile No2", "Email 1", "Email 2" }
                 );
                return resulData;

            }
            catch (Exception ex)
            {
                return null;
            }
        }

        #endregion

        #region Achievement Category

        public ServiceResponse<AchievementCategoryModel> GetAchievementCategoryByCode(long Code)
        {
            ServiceResponse<AchievementCategoryModel> objReturn = new ServiceResponse<AchievementCategoryModel>();
            try
            {
                tblADV_AchievementCategoryMaster resultData = _uow.GenericRepository<tblADV_AchievementCategoryMaster>().GetAll(filter: x => x.CategoryCode == Code).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblADV_AchievementCategoryMaster, AchievementCategoryModel>()
                         .ForMember(des => des.HelpFileURL, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.HelpFileURL) ? mdlSrc.HelpFileURL.ToAbsolutePath() : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblADV_AchievementCategoryMaster, AchievementCategoryModel>(resultData);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        #endregion

        #region Export To Excel

        /// <summary>
        /// this method is use to export datalist into excel file, this is common for any type of excel file.
        /// </summary>
        /// <param name="model"></param>
        /// <param name="fileName"></param>
        /// <param name="sheetName"></param>
        /// <returns></returns>
        public ServiceResponse<string> CommonExportToExcel(ExportToExcelModel model)
        {
            try
            {
                //Export Functionality
                var _DataTable = new DataTable("exporttable");
                _DataTable = CommonUtility.ConvertJSONToDataTable(JsonConvert.SerializeObject(model.DataSet));

                DataRow newRow = _DataTable.NewRow();

                int index = 0;
                foreach (var cname in _DataTable.Columns)
                {
                    newRow[index] = cname.ToString();
                    ++index;
                }
                _DataTable.Rows.InsertAt(newRow, 0);


                var path = ExportHelper.ExportData(model.SheetName, _DataTable, model.FileName, FilePath.CommonReport.GetStringValue());
                var base64 = CommonUtility.GetBase64strFromFilePath(path);

                return SetResultStatus<string>(base64, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("CommonExportToExcel ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("CommonExportToExcel ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("CommonExportToExcel ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<string>(string.Empty, MessageStatus.Error, false);
            }
        }

        #endregion

        #region Connect With CMIS Service

        /// <summary>
        /// Get CMIS data by module, department and year to connect jankalyan modules with cmis
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ConnectWithCMISListModel>> GetConnectWithCMISData(ConnectWithCMISFilterModel model)
        {
            ServiceResponse<List<ConnectWithCMISListModel>> objReturn = new ServiceResponse<List<ConnectWithCMISListModel>>();
            try
            {
                List<CMISNew_Trans_Core> resultData = _uow.GenericRepository<CMISNew_Trans_Core>().GetAll(filter: x => x.isActive == true && (!string.IsNullOrEmpty(model.YearText) ? x.Financial_Year.Trim().ToLower().Replace(" ", "") == model.YearText.Trim().ToLower().Replace(" ", "") : true) && (model.Department > 0 ? x.Nodal_Department == model.Department : true) && (!string.IsNullOrEmpty(model.ModuleName) ? x.modulename.Trim().ToLower().Replace(" ", "") == model.ModuleName.Trim().ToLower().Replace(" ", "") : true)).ToList();

                if (resultData != null && resultData.Count > 0)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<CMISNew_Trans_Core, ConnectWithCMISListModel>()
                        .ForMember(des => des.CMISNewTransCoreId, src => src.MapFrom(s => s.ID));
                    });
                    objReturn.Data = Mapper.Map<List<CMISNew_Trans_Core>, List<ConnectWithCMISListModel>>(resultData);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        #endregion
    }
}
