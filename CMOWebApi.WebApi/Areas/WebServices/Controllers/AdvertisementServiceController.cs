using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using Microsoft.Reporting.WebForms;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.WebServices.Controllers
{
    public class AdvertisementServiceController : ApiController
    {
        #region /// variable  ///
        private readonly IAdvertisementService _advertisementService;
        private readonly string apiBaseUrl = ConfigurationManager.AppSettings["BaseUrl"];
        #endregion

        #region /// constructor  //
        public AdvertisementServiceController(IAdvertisementService advertisementService)
        {
            _advertisementService = advertisementService;
        }
        #endregion

        #region /// Method  ///
        [HttpGet]
        public ServiceResponse<List<AdvertisementByDateModel>> GetAdvertisementByDate(string date)
        {
            ServiceResponse<List<AdvertisementByDateModel>> objReturn = new ServiceResponse<List<AdvertisementByDateModel>>();
            try
            {
                return _advertisementService.GetAdvertisementByDate(date);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }
        [HttpPost]
        public ServiceResponse<List<AdvertisementByDateModel>> GetAdvertisementByDate(ApiGetDataModel model)
        {


            ServiceResponse<List<AdvertisementByDateModel>> objReturn = new ServiceResponse<List<AdvertisementByDateModel>>();
            try
            {

                return _advertisementService.GetDataByDate(model, Request.Headers);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public ServiceResponse<AdvertisementAchievementModel> ServiceForGetAllAdvertisement()
        {
            ServiceResponse<AdvertisementAchievementModel> objReturn = new ServiceResponse<AdvertisementAchievementModel>();
            try
            {
                return _advertisementService.ServiceForGetAllAdvertisement();
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public ServiceResponse<AdvertisementAchievementModel> ServiceForGetAllAdvertisement_Front()
        {
            ServiceResponse<AdvertisementAchievementModel> objReturn = new ServiceResponse<AdvertisementAchievementModel>();
            try
            {
                return _advertisementService.ServiceForGetAllAdvertisement_Front();
            }
            catch
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
                return _advertisementService.GetAllGovermentAchivement(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public ServiceResponse<PagedData<GovermentAchievementModel>> GetAllGovermentAchivement_Front(IndexModel model)
        {
            ServiceResponse<PagedData<GovermentAchievementModel>> objReturn = new ServiceResponse<PagedData<GovermentAchievementModel>>();
            try
            {
                return _advertisementService.GetAllGovermentAchivement_Front(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }
        #endregion

        #region Service For All Department and other User

        /// <summary>
        /// Get the list of all Goverment Achievement, Advertisement and display status of
        /// Is Advertisement Or Goverment Achivement
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<AllAdvertisementAndGovAchievmentListModel> GetAllAdvertisementAndGovAchievment()
        {
            ServiceResponse<AllAdvertisementAndGovAchievmentListModel> objReturn = new ServiceResponse<AllAdvertisementAndGovAchievmentListModel>();
            try
            {
                return _advertisementService.GetAllAdvertisementAndGovAchievment();
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.StatusCode = 200;
                return objReturn;
            }
        }

        /// <summary>
        /// Get the list of all Advertisement 
        /// </summary>
        /// <returns></returns> 
        [HttpGet]
        public ServiceResponse<List<AdvertisementServiceModel>> GetAllAdvertisement()
        {
            ServiceResponse<List<AdvertisementServiceModel>> objReturn = new ServiceResponse<List<AdvertisementServiceModel>>();
            try
            {
                return _advertisementService.GetAllAdvertisement();
            }
            catch (Exception ex)
            {

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
        [HttpPost]
        public ServiceResponse<string> CreateRajAdvtPortalLog(RajAdvtPortalAddLogRequestModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();


            if (!ModelState.IsValid)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = "Invalid request. One or more parameters are incorrect.";
                objReturn.StatusCode = ResponseStatusCode.error;
                objReturn.Data = null;
                objReturn.Exception = string.Join(" | ", ModelState.Values
                                                   .SelectMany(v => v.Errors)
                                                   .Select(e => e.ErrorMessage));
                return objReturn;
            }
            try
            {
                return _advertisementService.CreateRajAdvtPortalLog(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.StatusCode = ResponseStatusCode.error;
                return objReturn;
            }
        }

        [HttpPost]
        public async Task<IHttpActionResult> CreateRajAdvtPortalLogV1(RajAdvtPortalAddLogRequestModel model)
        {
            try
            {
                return Ok(await _advertisementService.CreateRajAdvtPortalLogV1(model));
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }

        /// <summary>
        /// Get total count of click of "I Pledge" button on RajAdvt site
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<RajAdvtPortalLogCountModel> GetRajAdvtPortalLogCount()
        {
            ServiceResponse<RajAdvtPortalLogCountModel> objReturn = new ServiceResponse<RajAdvtPortalLogCountModel>();
            try
            {
                return _advertisementService.GetRajAdvtPortalLogCount();
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.StatusCode = ResponseStatusCode.error; ;
                return objReturn;
            }
        }
        #endregion


        #region RajAdvt Service

        /// <summary>
        ///this service is used for making an entry in pledge table for SSO site only
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<string> CreateRajAdvtPortalLogServiceForSSO()
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                return _advertisementService.CreateRajAdvtPortalLogServiceForSSO();
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.StatusCode = ResponseStatusCode.error; ;
                return objReturn;
            }
        }

        /// <summary>
        /// get all Pledged count according to websiteurl for other users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<PledgedCountReportViewModel>> PledgedCountReport()
        {
            ServiceResponse<List<PledgedCountReportViewModel>> objReturn = new ServiceResponse<List<PledgedCountReportViewModel>>();
            try
            {
                return _advertisementService.PledgedCountReport();
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.StatusCode = ResponseStatusCode.error; ;
                return objReturn;
            }
        }

        #endregion


        #region RajAdvt Pledge Register

        /// <summary>
        /// Save record of end-user when user wants to register for a certificate of taking Pledge
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> RajAdvtPledgeRegister(RajAdvtPledgeRegisterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    objReturn = await _advertisementService.RajAdvtPledgeRegister(model);
                    if (objReturn.IsSuccess == true)
                    {
                        objReturn.Data = PledgeCertificate(model.Name);
                        return objReturn;
                    }
                }
                return await _advertisementService.RajAdvtPledgeRegister(model);
            }
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.StatusCode = ResponseStatusCode.error;
                return objReturn;
            }
        }

        #endregion

        #region pledgeCertificate

        private string PledgeCertificate(string name)
        {
            try
            {
                List<tblADV_RajAdvtPledgeRegister> obj = new List<tblADV_RajAdvtPledgeRegister>();
                obj.Add(new tblADV_RajAdvtPledgeRegister());

                obj[0].Name = System.Globalization.CultureInfo.CurrentCulture.TextInfo.ToTitleCase(name.ToLower());
                obj[0].CreatedDate = DateTime.Now;
                ReportViewer reportViewer1 = new ReportViewer();
                reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath("~/RPTReport/PledgeCertificate.rdlc");

                ReportDataSource rdcData = new ReportDataSource("PledgeRegistrationDataSet", obj);
                reportViewer1.LocalReport.DataSources.Add(rdcData);

                //ReportParameter rpt6 = new ReportParameter("ImageBackground", filepath3);
                //this.reportViewer1.LocalReport.SetParameters(new ReportParameter[] { rpt6 });

                reportViewer1.LocalReport.Refresh();
                reportViewer1.ZoomMode = ZoomMode.PageWidth;
                //Generate Pdf
                byte[] Bytes = reportViewer1.LocalReport.Render(format: "PDF");
                string fileName = "~/content/PledgeCertificate/" + DateTime.Now.ToString("yyyy-dd-mm") + ".pdf";
                var savePath = reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath(fileName);// + DateTime.Now.ToString("yyyy-dd-mm") + ".pdf";
                using (FileStream stream = new FileStream(savePath, FileMode.Create))
                {
                    stream.Write(Bytes, 0, Bytes.Length);
                }

                var Url = CommonUtility.GetBase64strFromFilePath(savePath);

                //CommonUtility.DeleteExistingFile(savePath);

                // (apiBaseUrl + fileName.Replace("~/", "")

                return Url;

            }
            catch (Exception ex)
            {
                return null;
            }
        }
        #endregion

        [HttpGet]
        public ServiceResponse<GetAdvertisementPoppupDataModel> GetRajAdvtAdvertisementPopupData(int advtTypeCode = 0)
        {
            ServiceResponse<GetAdvertisementPoppupDataModel> objReturn = new ServiceResponse<GetAdvertisementPoppupDataModel>();
            try
            {
                return _advertisementService.GetRajAdvtAdvertisementPopupData(advtTypeCode);
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
