using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.CommonModel;
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
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.WebAPI.Areas.CMDashboard.Controllers
{
    [Authorize]
    public class GenerateOrderController : ApiController
    {
        #region /// Variable ///
        private readonly IOrderGenerateMasterService _orderGenerateMasterService;
        private readonly string _path = FilePath.GenerateOrderLocation.GetStringValue();
        private readonly string _pdfPath = FilePath.GeneratePdfLocation.GetStringValue();
        private readonly string _dptPath = FilePath.DptSetupLocation.GetStringValue();
        #endregion

        #region /// constructor  ///
        public GenerateOrderController(IOrderGenerateMasterService orderGenerateMasterService)
        {
            _orderGenerateMasterService = orderGenerateMasterService;
        }

        #endregion

        #region /// Method  ///

        [HttpPost]
        public ServiceResponse<PagedData<OrderGenerateMasterListModel>> Get(IndexModel model)
        {
            ServiceResponse<PagedData<OrderGenerateMasterListModel>> objReturn = new ServiceResponse<PagedData<OrderGenerateMasterListModel>>();
            try
            {
                return _orderGenerateMasterService.GetAll(model);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public ServiceResponse<PagedData<OrderGenerateAuthorityListModel>> GetAuthorityList(IndexModel model)
        {
            ServiceResponse<PagedData<OrderGenerateAuthorityListModel>> objReturn = new ServiceResponse<PagedData<OrderGenerateAuthorityListModel>>();
            try
            {
                return _orderGenerateMasterService.GetAuthorityList(model);
            }
            catch (Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Add(OrderGenerateMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return await _orderGenerateMasterService.Create(model);
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
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpPost]
        public async Task<ServiceResponse<string>> Update(OrderGenerateMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    return await _orderGenerateMasterService.Edit(model);
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
            catch (Exception ex)
            {

                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public async Task<ServiceResponse<OrderGenerateMasterViewModel>> GetById(long id)
        {
            ServiceResponse<OrderGenerateMasterViewModel> objReturn = new ServiceResponse<OrderGenerateMasterViewModel>();
            try
            {
                if (id > 0)
                {
                    return await _orderGenerateMasterService.GetById(id);
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
        public async Task<ServiceResponse<string>> LockToggle(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _orderGenerateMasterService.LockToggle(id);
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
        public async Task<ServiceResponse<string>> SetStatus(long id, string dispatchNo)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _orderGenerateMasterService.SetStatus(id, dispatchNo);
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
        public async Task<ServiceResponse<string>> SetFinalAProval(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _orderGenerateMasterService.SetFinalAProval(id);
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

        [HttpPost]
        public ServiceResponse<PagedData<OrderFinalAProvalListModel>> GetFinalApprovalList(IndexModel model)
        {
            ServiceResponse<PagedData<OrderFinalAProvalListModel>> objReturn = new ServiceResponse<PagedData<OrderFinalAProvalListModel>>();
            try
            {
                return _orderGenerateMasterService.GetFinalApprovalList(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        [HttpGet]
        public ServiceResponse<string> GenerateUINumber(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return _orderGenerateMasterService.GenerateUINumber(id);
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

        #endregion

        #region Send Notification

        [HttpPost]
        public ServiceResponse<string> SendNotification(ReferencyNotificationResponseModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                return _orderGenerateMasterService.SendNotificationToReferency(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        #endregion

        #region generate pdf
        [HttpGet]
        public ServiceResponse<GeneratedPdfModel> GeneratePdf(long id)
        {
            ServiceResponse<GeneratedPdfModel> objReturn = new ServiceResponse<GeneratedPdfModel>();
            try
            {
                GeneratedPdfModel result = new GeneratedPdfModel();
                ServiceResponse<List<OrderGenerateHindiEnglishModel>> objorderDetail = _orderGenerateMasterService.OrderGenerateHindiEnglish(id);
                ServiceResponse<List<AttachmentsLookupModel>> attachments = _orderGenerateMasterService.GetAttachments(id);

                var orderDetail = objorderDetail.Data;
                orderDetail[0].Date = DateTime.Now;
                var attachmentList = attachments.Data;
                var logo1 = HttpContext.Current.Server.MapPath(_dptPath + orderDetail[0].Logo1);
                var logo2 = HttpContext.Current.Server.MapPath(_dptPath + orderDetail[0].Logo2);
                ReportViewer reportViewer1 = new ReportViewer();
                if (orderDetail[0].IsHindi == true)
                {
                    reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath("~/RPTReport/GenerateOrderHindi.rdlc");
                }
                else
                {
                    reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath("~/RPTReport/GenerateOrder.rdlc");
                }

                reportViewer1.LocalReport.DataSources.Clear();
                //Logo1
                reportViewer1.LocalReport.EnableExternalImages = true;

                string logo1Path = new Uri(logo1).AbsoluteUri;
                ReportParameter parameter1 = new ReportParameter("Logo1", logo1Path);
                reportViewer1.LocalReport.SetParameters(parameter1);
                //Logo2
                string logo2Path = new Uri(logo2).AbsoluteUri;
                ReportParameter parameter2 = new ReportParameter("Logo2", logo2Path);

                reportViewer1.LocalReport.SetParameters(parameter2);

                if (orderDetail[0].IsHindi == true)
                {
                    ReportDataSource rdcEnglish = new ReportDataSource("GenerateOrderHindi", orderDetail);
                    reportViewer1.LocalReport.DataSources.Add(rdcEnglish);
                }
                else
                {
                    ReportDataSource rdcOrder = new ReportDataSource("OrderGenerate", orderDetail);

                    reportViewer1.LocalReport.DataSources.Add(rdcOrder);
                }

                ReportDataSource rdcAttachments = new ReportDataSource("Attachments", attachmentList);

                reportViewer1.LocalReport.DataSources.Add(rdcAttachments);

                reportViewer1.LocalReport.Refresh();
                reportViewer1.ZoomMode = ZoomMode.PageWidth;
                //Generate Pdf
                byte[] Bytes = reportViewer1.LocalReport.Render(format: "PDF");
                var savePath = reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath(_pdfPath) + DateTime.Now.ToString("yyyy-dd-mm") + ".pdf";
                using (FileStream stream = new FileStream(savePath, FileMode.Create))
                {
                    stream.Write(Bytes, 0, Bytes.Length);
                }
                if (orderDetail[0].IsCancel == true)
                {
                    var isWatermarkAdd = savePath.AddWaterMarkHelper();
                }


                result.Url = CommonUtility.GetBase64strFromFilePath(savePath);

                //CreateLogFile("        result.Url:- " + result.Url + "\n");
                CommonUtility.DeleteExistingFile(savePath);

                //var Renderer = new IronPdf.HtmlToPdf();
                //var PDF = Renderer.RenderHtmlAsPdf(generateReport(objorderDetail));
                //var OutputPath = HttpContext.Current.Server.MapPath(_pdfPath) + "HtmlToPDF8.pdf";
                //PDF.SaveAs(OutputPath);



                objReturn.IsSuccess = true;
                objReturn.Message = MessageStatus.Success;
                objReturn.Data = result;
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
        public ServiceResponse<GeneratedPdfModel> GenerateWithEsignPdf(ESignPdfModel model)
        {
            ServiceResponse<GeneratedPdfModel> objReturn = new ServiceResponse<GeneratedPdfModel>();
            try
            {
                GeneratedPdfModel result = new GeneratedPdfModel();
                ServiceResponse<List<OrderGenerateHindiEnglishModel>> objorderDetail = _orderGenerateMasterService.OrderGenerateHindiEnglish(model.Id);
                ServiceResponse<List<AttachmentsLookupModel>> attachments = _orderGenerateMasterService.GetAttachments(model.Id);

                var orderDetail = objorderDetail.Data;
                orderDetail[0].Date = DateTime.Now;
                var attachmentList = attachments.Data;
                var logo1 = HttpContext.Current.Server.MapPath(_dptPath + orderDetail[0].Logo1);
                var logo2 = HttpContext.Current.Server.MapPath(_dptPath + orderDetail[0].Logo2);
                ReportViewer reportViewer1 = new ReportViewer();
                if (orderDetail[0].IsHindi == true)
                {
                    reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath("~/RPTReport/GenerateOrderHindi.rdlc");
                    //reportViewer1.LocalReport.ReportEmbeddedResource = "D:\\Tanmaya\\Api\\cmo\\cmo-webapi\\cmo-webapi\\CMOWebApi.WebApi\\RPTReport\\GenerateOrder.rdlc";
                }
                else
                {
                    reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath("~/RPTReport/GenerateOrder.rdlc");
                }

                reportViewer1.LocalReport.DataSources.Clear();
                //Logo1
                reportViewer1.LocalReport.EnableExternalImages = true;
                string logo1Path = new Uri(logo1).AbsoluteUri;
                ReportParameter parameter1 = new ReportParameter("Logo1", logo1Path);
                reportViewer1.LocalReport.SetParameters(parameter1);
                //Logo2
                string logo2Path = new Uri(logo2).AbsoluteUri;
                ReportParameter parameter2 = new ReportParameter("Logo2", logo2Path);
                reportViewer1.LocalReport.SetParameters(parameter2);

                if (orderDetail[0].IsHindi == true)
                {
                    ReportDataSource rdcEnglish = new ReportDataSource("GenerateOrderHindi", orderDetail);
                    reportViewer1.LocalReport.DataSources.Add(rdcEnglish);
                }
                else
                {
                    ReportDataSource rdcOrder = new ReportDataSource("OrderGenerate", orderDetail);
                    reportViewer1.LocalReport.DataSources.Add(rdcOrder);
                }

                ReportDataSource rdcAttachments = new ReportDataSource("Attachments", attachmentList);
                reportViewer1.LocalReport.DataSources.Add(rdcAttachments);

                reportViewer1.LocalReport.Refresh();
                reportViewer1.ZoomMode = ZoomMode.PageWidth;

                //Generate Pdf

                byte[] Bytes = reportViewer1.LocalReport.Render(format: "PDF");
                var fileName = DateTime.Now.ToString("yyyy-dd-mm") + ".pdf";
                //TODO
                //var savePath = reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath(_pdfPath) + fileName;
                var savePath = reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath(FilePath.EsignPath.GetStringValue()) + fileName;
                using (FileStream stream = new FileStream(savePath, FileMode.Create))
                {
                    stream.Write(Bytes, 0, Bytes.Length);
                }

                //Start Esign skip for Now //TODO
                //////For Esign
                //result.Url = eSignHelper.Create_eSignRequest(model.AdharNo, savePath,model.Id);//855370443548 //TODO

                var watermark = HttpContext.Current.Server.MapPath("~/UploadFile/") + "tick.png";
                var isWatermarkAdd = savePath.AddWaterMarkHelper(watermark);
                eSignHelper.SaveEsign(fileName, model.Id);

                //END Esign skip for Now //TODO

                objReturn.IsSuccess = true;
                objReturn.Message = MessageStatus.Success;
                objReturn.Data = result;
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

        #region generate Word
        [HttpGet]
        public ServiceResponse<GeneratedPdfModel> GenerateWord(long id)
        {
            ServiceResponse<GeneratedPdfModel> objReturn = new ServiceResponse<GeneratedPdfModel>();
            try
            {
                GeneratedPdfModel result = new GeneratedPdfModel();
                ServiceResponse<List<OrderGenerateHindiEnglishModel>> objorderDetail = _orderGenerateMasterService.OrderGenerateHindiEnglish(id);
                ServiceResponse<List<AttachmentsLookupModel>> attachments = _orderGenerateMasterService.GetAttachments(id);

                var orderDetail = objorderDetail.Data;
                orderDetail[0].Date = DateTime.Now;
                var attachmentList = attachments.Data;
                var logo1 = HttpContext.Current.Server.MapPath(_dptPath + orderDetail[0].Logo1);
                var logo2 = HttpContext.Current.Server.MapPath(_dptPath + orderDetail[0].Logo2);
                ReportViewer reportViewer1 = new ReportViewer();
                if (orderDetail[0].IsHindi == true)
                {
                    reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath("~/RPTReport/GenerateOrderHindi.rdlc");
                }
                else
                {
                    reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath("~/RPTReport/GenerateOrder.rdlc");
                }

                reportViewer1.LocalReport.DataSources.Clear();
                //Logo1
                reportViewer1.LocalReport.EnableExternalImages = true;
                string logo1Path = new Uri(logo1).AbsoluteUri;
                ReportParameter parameter1 = new ReportParameter("Logo1", logo1Path);
                reportViewer1.LocalReport.SetParameters(parameter1);
                //Logo2
                string logo2Path = new Uri(logo2).AbsoluteUri;
                ReportParameter parameter2 = new ReportParameter("Logo2", logo2Path);
                reportViewer1.LocalReport.SetParameters(parameter2);

                if (orderDetail[0].IsHindi == true)
                {
                    ReportDataSource rdcEnglish = new ReportDataSource("GenerateOrderHindi", orderDetail);
                    reportViewer1.LocalReport.DataSources.Add(rdcEnglish);
                }
                else
                {
                    ReportDataSource rdcOrder = new ReportDataSource("OrderGenerate", orderDetail);
                    reportViewer1.LocalReport.DataSources.Add(rdcOrder);
                }

                ReportDataSource rdcAttachments = new ReportDataSource("Attachments", attachmentList);
                reportViewer1.LocalReport.DataSources.Add(rdcAttachments);

                reportViewer1.LocalReport.Refresh();
                reportViewer1.ZoomMode = ZoomMode.PageWidth;

                //Generate Pdf

                byte[] Bytes = reportViewer1.LocalReport.Render(format: "WORD");
                var savePath = reportViewer1.LocalReport.ReportPath = HttpContext.Current.Server.MapPath(_pdfPath) + DateTime.Now.ToString("yyyy-dd-mm") + ".doc";

                using (FileStream stream = new FileStream(savePath, FileMode.Create))
                {
                    stream.Write(Bytes, 0, Bytes.Length);
                }

                // Convert pdf to base64
                result.Url = CommonUtility.GetBase64strFromFilePath(savePath);
                CommonUtility.DeleteExistingFile(savePath);

                objReturn.IsSuccess = true;
                objReturn.Message = MessageStatus.Success;
                objReturn.Data = result;
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

        #region Cancellation Order

        [HttpPost]
        public ServiceResponse<string> SaveCancellationOrder(CancellationLookupModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                return _orderGenerateMasterService.SaveCancellationOrder(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        #endregion

        #region Private Method

        public string generateReport(ServiceResponse<List<OrderGenerateHindiEnglishModel>> model)
        {
            string readerString = string.Empty;
            using (StreamReader reader = new StreamReader(HttpContext.Current.Server.MapPath("~/Report/generate-order-preview.component.html")))
            {
                readerString = reader.ReadToEnd();
                var orderDate = DateTime.Now.ToString("dd MM yyyy").Replace(' ', '/');
                readerString = readerString.Replace("{Date}", orderDate);
                readerString = readerString.Replace("{Content}", model.Data[0].Content);
                if (!string.IsNullOrEmpty(model.Data[0].Logo1))
                {
                    var logo1Image = HttpContext.Current.Server.MapPath(_dptPath + model.Data[0].Logo1);

                    string logo1 = string.Format(@"<img src=""{0}"" alt=""LOGO-IMAGE"" class=""logo img-responsive""/>", new Uri(logo1Image).AbsoluteUri);
                    readerString = readerString.Replace("{logo1}", logo1);
                }
                else
                {
                    readerString = readerString.Replace("{logo1}", string.Empty);
                }
                if (!string.IsNullOrEmpty(model.Data[0].Logo2))
                {
                    var logo2Image = HttpContext.Current.Server.MapPath(_dptPath + model.Data[0].Logo1);
                    string logo2 = string.Format(@"<img src=""{0}"" alt=""LOGO-IMAGE"" class=""logo img-responsive""/>", new Uri(logo2Image).AbsoluteUri);
                    readerString = readerString.Replace("{logo2}", logo2);
                }
                else
                {
                    readerString = readerString.Replace("{logo2}", string.Empty);
                }
                if (!string.IsNullOrEmpty(model.Data[0].Address1))
                {
                    string addess1 = string.Format(@"<h4> {0}</h4>>", model.Data[0].Address1);
                    readerString = readerString.Replace("{Address2}", addess1);
                }
                else
                {
                    readerString = readerString.Replace("{logo1}", string.Empty);
                }
            }

            return readerString;
        }
        #endregion
    }
}
