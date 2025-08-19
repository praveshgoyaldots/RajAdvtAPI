using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using ExcelDataReader;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.VideoConferencing.Controllers
{
    [Authorize]
    public class AddParticipantController : ApiController
    {

        #region /// Variable ///
        private readonly IVCParticipantService _vCParticipantService;
        IndexModel model = null;

        #endregion

        /// <summary>
        /// Add Participant Controller
        /// </summary>
        /// <param name="iVCParticipantService"></param>
        /// <param name="indexModel"></param>
        public AddParticipantController(IVCParticipantService iVCParticipantService, IndexModel indexModel)
        {
            this._vCParticipantService = iVCParticipantService;
            this.model = indexModel;
        }

        /// <summary>
        /// Get all Video Conferencing Participant according to login user by CV Code
        /// </summary>
        /// <param name="model"></param>
        /// <param name="CVCode"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<VCParticipantViewModel>> Get(IndexModel model, long vCCode)
        {
            ServiceResponse<PagedData<VCParticipantViewModel>> objReturn = new ServiceResponse<PagedData<VCParticipantViewModel>>();
            try
            {
                objReturn = _vCParticipantService.GetAll(model, vCCode);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }


        /// <summary>
        /// Get Video Conferencing Report with filter
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
       [HttpPost]
        public ServiceResponse<List<VCParticipantReportViewModel>> GetVcReport(VCCustomFilter model)
        {
            ServiceResponse<List<VCParticipantReportViewModel>> objReturn = new ServiceResponse<List<VCParticipantReportViewModel>>();
            try
            {
                objReturn = _vCParticipantService.GetVcReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        /// <summary>
        /// Get all Video Conferencing Participant by CV Code
        /// </summary>
        /// <param name="model"></param>
        /// <param name="CVCode"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<PagedData<VCParticipantViewModel>> GetParicipantReport(IndexModel model, long vCCode)
        {
            ServiceResponse<PagedData<VCParticipantViewModel>> objReturn = new ServiceResponse<PagedData<VCParticipantViewModel>>();
            try
            {
                objReturn = _vCParticipantService.GetParicipantReport(model, vCCode);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;

            }
            return objReturn;
        }

        /// <summary>
        /// get Video Conferencing Participant by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<VCParticipantModel> Get(long id)
        {
            ServiceResponse<VCParticipantModel> objReturn = new ServiceResponse<VCParticipantModel>();
            try
            {
                objReturn = _vCParticipantService.GetById(id);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                objReturn.Data = null;
            }
            return objReturn;
        }

        /// <summary>
        /// Create Video Conferencing Participant
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Post(VCParticipantModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid)
                {
                    objReturn = await _vCParticipantService.Create(model);
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

        /// <summary>
        /// Update Video Conferencing Participant
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ServiceResponse<string>> Put(VCParticipantModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (ModelState.IsValid && model.Id > 0)
                {
                    objReturn = await _vCParticipantService.Edit(model);
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

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> UpdateStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _vCParticipantService.UpdateStatus(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #region Bulk upload

        /// <summary>
        /// Use to upload bulk participant from excel
        /// </summary>
        /// <param name="excelRecords"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ParticipantTempBulkViewModel>> ParticipantExcelUpload()
        {
            ServiceResponse<List<ParticipantTempBulkViewModel>> objReturn = new ServiceResponse<List<ParticipantTempBulkViewModel>>();
            ParticipantTempBulkModel model = new ParticipantTempBulkModel();
            try
            {

                var httpRequest = HttpContext.Current.Request;
                model= JsonConvert.DeserializeObject<ParticipantTempBulkModel>(httpRequest.Form["Data"]); 


                if (httpRequest.Files.Count > 0)
                {
                    HttpPostedFile file = httpRequest.Files[0];
                    Stream stream = file.InputStream;

                    IExcelDataReader reader = null;

                    if (file.FileName.EndsWith(".xls"))
                    {
                        reader = ExcelReaderFactory.CreateBinaryReader(stream);
                    }
                    else if (file.FileName.EndsWith(".xlsx"))
                    {
                        reader = ExcelReaderFactory.CreateOpenXmlReader(stream);
                    }
                    else
                    {
                        objReturn.Message = MessageStatus.ExcelFormat;
                        return objReturn;
                    }

                    DataSet excelRecords = reader.AsDataSet();
                    reader.Close();

                  return  _vCParticipantService.ParticipantExcelUpload(excelRecords, model);
                }

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
        /// Save final excel data in main table
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<string> ParticipantExcelFinalUpload()
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn =  _vCParticipantService.ParticipantExcelFinalUpload();
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
        /// Delete item from Bulk upload which is not want to upload
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> Delete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _vCParticipantService.Delete(id);
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

        /// <summary>
        /// Delete Participant 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> DeleteParticipant(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    return await _vCParticipantService.DeleteParticipant(id);
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

        /// <summary>
        /// Get All Excel Temp data
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<ParticipantTempBulkViewModel>> GetParticipantExcelUploadTempList()
        {
            ServiceResponse<List<ParticipantTempBulkViewModel>> objReturn = new ServiceResponse<List<ParticipantTempBulkViewModel>>();
            try
            {
                    return  _vCParticipantService.GetParticipantExcelUploadTempList();
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Mark present and absent to participant
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ServiceResponse<string>> MarkPresentAbsent(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                objReturn = await _vCParticipantService.MarkPresentAbsent(id);
            }
            catch
            {
                objReturn.Data = null;
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        #endregion

        [HttpGet]
        public ServiceResponse<ExcelFileViewModel> GetExcelFileDownload()
        {

            ServiceResponse<ExcelFileViewModel> objReturn = new ServiceResponse<ExcelFileViewModel>();
            try
            {
                return _vCParticipantService.GetExcelFileDownload();
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
