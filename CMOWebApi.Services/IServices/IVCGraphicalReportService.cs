using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.ServiceHelper;
using System.Collections.Generic;

namespace CMOWebApi.Services.IServices
{
    public interface IVCGraphicalReportService
    {
        /// <summary>
        /// Get district List of VC with participant count 
        /// </summary>
        /// <param name="VCCode"></param>
        /// <returns></returns>
        ServiceResponse<List<GraphicalReportByDistrictModel>> GetDistrictCountByVC(long VCCode);

        /// <summary>
        /// Get Location List of VC with participant count 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<GraphicalReportByLocationModel>> GetLocationCountByDistrict(VCGLocationFilterModel model);

        /// <summary>
        /// Get All participant by Location
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        ServiceResponse<List<GraphicalParticipantReportByLocationModel>> GetParticipantByLocation(VCGParticipantFilterModel model);
    }
}
