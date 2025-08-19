using CMOWebApi.Core;
using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace CMOWebApi.WebAPI.Areas.VideoConferencing.Controllers
{
    [Authorize]
    public class VCGraphicalReportController : ApiController
    {
        #region /// Variable ///
        private readonly IVCGraphicalReportService _reportService;
        #endregion

        #region Constructor

        /// <summary>
        /// Add Participant Controller
        /// </summary>
        /// <param name="iVCParticipantService"></param>
        /// <param name="indexModel"></param>
        public VCGraphicalReportController(IVCGraphicalReportService reportService)
        {
            this._reportService = reportService;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Get district List of VC with participant count 
        /// </summary>
        /// <param name="VCCode"></param>
        /// <returns></returns>
        [HttpGet]
        public ServiceResponse<List<GraphicalReportByDistrictModel>> GetDistrictCountByVC(long VCCode)
        {
            ServiceResponse<List<GraphicalReportByDistrictModel>> objReturn = new ServiceResponse<List<GraphicalReportByDistrictModel>>();
            try
            {
               return _reportService.GetDistrictCountByVC(VCCode);
            }
            catch(Exception ex)
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
           
        }

        /// <summary>
        /// Get Location List of VC with participant count 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<GraphicalReportByLocationModel>> GetLocationCountByDistrict(VCGLocationFilterModel model)
        {
            ServiceResponse<List<GraphicalReportByLocationModel>> objReturn = new ServiceResponse<List<GraphicalReportByLocationModel>>();
            try
            {
                return _reportService.GetLocationCountByDistrict(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        /// <summary>
        /// Get All participant by Location
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        public ServiceResponse<List<GraphicalParticipantReportByLocationModel>> GetParticipantByLocation(VCGParticipantFilterModel model)
        {
            ServiceResponse<List<GraphicalParticipantReportByLocationModel>> objReturn = new ServiceResponse<List<GraphicalParticipantReportByLocationModel>>();
            try
            {
                return _reportService.GetParticipantByLocation(model);
            }
            catch
            {
                objReturn.IsSuccess = false;
                objReturn.Message = MessageStatus.Error;
                return objReturn;
            }
        }

        #endregion
    }
}
