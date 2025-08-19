using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.VCModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;

namespace CMOWebApi.Services.Services
{
    public class VCGraphicalReportService : BaseService, IVCGraphicalReportService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///
        public VCGraphicalReportService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Get district List of VC with participant count 
        /// </summary>
        /// <param name="VCCode"></param>
        /// <returns></returns>
        public ServiceResponse<List<GraphicalReportByDistrictModel>> GetDistrictCountByVC(long VCCode)
        {
            try
            {
                List<GraphicalReportByDistrictModel> resultData = new List<GraphicalReportByDistrictModel>();
                List<SP_VC_G_DistrictCountByVC_Result> data = _uow.ExeccuteStoreProcedure<SP_VC_G_DistrictCountByVC_Result>("SP_VC_G_DistrictCountByVC @VCCreateCode", new SqlParameter("VCCreateCode", SqlDbType.BigInt) { Value = VCCode }).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_VC_G_DistrictCountByVC_Result, GraphicalReportByDistrictModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<GraphicalReportByDistrictModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Location List of VC with participant count 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<GraphicalReportByLocationModel>> GetLocationCountByDistrict(VCGLocationFilterModel model)
        {
            try
            {
                List<GraphicalReportByLocationModel> resultData = new List<GraphicalReportByLocationModel>();
                List<SP_VC_G_LocationCountByDistrict_Result> data = _uow.ExeccuteStoreProcedure<SP_VC_G_LocationCountByDistrict_Result>("SP_VC_G_LocationCountByDistrict @VCCreateCode, @District"
                    , new SqlParameter("VCCreateCode", SqlDbType.BigInt) { Value = model.VCCreateCode }
                    , new SqlParameter("District", SqlDbType.BigInt) { Value = model.DistrictCode }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_VC_G_LocationCountByDistrict_Result, GraphicalReportByLocationModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<GraphicalReportByLocationModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get All participant by Location
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<GraphicalParticipantReportByLocationModel>> GetParticipantByLocation(VCGParticipantFilterModel model)
        {
            try
            {
                List<GraphicalParticipantReportByLocationModel> resultData = new List<GraphicalParticipantReportByLocationModel>();
                List<SP_VC_G_ParticipantReportByLocation_Result> data = _uow.ExeccuteStoreProcedure<SP_VC_G_ParticipantReportByLocation_Result>("SP_VC_G_ParticipantReportByLocation @VCCreateCode, @Location"
                     , new SqlParameter("VCCreateCode", SqlDbType.BigInt) { Value = model.VCCreateCode }
                    , new SqlParameter("Location", SqlDbType.BigInt) { Value = model.LocationCode }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_VC_G_ParticipantReportByLocation_Result, GraphicalParticipantReportByLocationModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<GraphicalParticipantReportByLocationModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

    }
}
