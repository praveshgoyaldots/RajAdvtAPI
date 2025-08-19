using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.VideoConferencing.Controllers
{
    [Authorize]
    public class VCCreationController : ApiController
    {


        private readonly IVCService _vcService;
        IndexModel model = null;
        // GET api/values
        public VCCreationController(IVCService iVCService, IndexModel indexModel)
            {
            this._vcService = iVCService;
            this.model = indexModel;
            }

        [HttpPost]
        public ServiceResponse<PagedData<VCCreationViewModel>> Get(VCSearchModel model)
            {
            ServiceResponse<PagedData<VCCreationViewModel>> objReturn = new ServiceResponse<PagedData<VCCreationViewModel>>();
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
        public ServiceResponse<VCCreationModel> Get(long id)
            {
            ServiceResponse<VCCreationModel> objReturn = new ServiceResponse<VCCreationModel>();
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
        public async Task<ServiceResponse<string>> Post(VCCreationModel model)
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
        public async Task<ServiceResponse<string>> Put(VCCreationModel model)
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
        public ServiceResponse<string> Delete(long id)
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

        #region Reports

        /// <summary>
        /// Get VC report
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<VCReportModel>> GetAllVcReport(VCReportSearchModel model)
        {
            ServiceResponse<List<VCReportModel>> objReturn = new ServiceResponse<List<VCReportModel>>();
            try
            {
                objReturn = _vcService.GetAllVcReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// VC Summary Report
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ReportSummeryViewModel>> VCSummaryReport(ReportSummerySearchModel model)
        {
            ServiceResponse<List<ReportSummeryViewModel>> objReturn = new ServiceResponse<List<ReportSummeryViewModel>>();
            try
            {
                objReturn = _vcService.VCSummaryReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Get participant count of all district
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
         [HttpPost]
        public ServiceResponse<List<ParticipantCountByDistrictReportModel>> VCParticipantCountByDistrictReport(ParticipantByDistrictReportModel model)
        {
            ServiceResponse<List<ParticipantCountByDistrictReportModel>> objReturn = new ServiceResponse<List<ParticipantCountByDistrictReportModel>>();
            try
            {
                objReturn = _vcService.VCParticipantCountByDistrictReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// VC Chairperson Category Summary Report
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<ChairPersonCategorySummaryReportModel>> VCChairpersonCategorySummaryReport(ChairpersonSummeryReportSearchModel model)
        {
            ServiceResponse<List<ChairPersonCategorySummaryReportModel>> objReturn = new ServiceResponse<List<ChairPersonCategorySummaryReportModel>>();
            try
            {
                objReturn = _vcService.VCChairpersonCategorySummaryReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Get VC report summary report by category and department
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<CatDptWiseSummaryReportModel>> GetCategoryAndDptWiseSummaryVCReport(CategoryAndDptWiseSummaryVCReportFilterModel model)
        {
            ServiceResponse<List<CatDptWiseSummaryReportModel>> objReturn = new ServiceResponse<List<CatDptWiseSummaryReportModel>>();
            try
            {
                objReturn = _vcService.GetCategoryAndDptWiseSummaryVCReport(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
            }
            return objReturn;
        }

        /// <summary>
        /// Get VC summary report by admin department, department and category wise
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<AdminDptCatWiseSummaryReportModel>> GetAdmDptCatWiseSummaryVCReport(CategoryAndDptWiseSummaryVCReportFilterModel model)
        {
            ServiceResponse<List<AdminDptCatWiseSummaryReportModel>> objReturn = new ServiceResponse<List<AdminDptCatWiseSummaryReportModel>>();
            try
            {
                objReturn = _vcService.GetAdmDptCatWiseSummaryVCReport(model);
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

