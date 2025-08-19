using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public  class VCService :BaseService, IVCService
        {
       
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion


        #region ///constructor ///
        public VCService(IUnitofWork uow)
            {
            _uow = uow;
            }
        #endregion



        #region Method

        /// <summary>
        /// Get all VC
        /// </summary>
        /// <param name = "model" ></ param >
        /// < returns ></ returns >

        public ServiceResponse<PagedData<VCCreationViewModel>> GetAll(VCSearchModel model)
            {
            try
                {
                PagedData<VCCreationViewModel> resultData = new PagedData<VCCreationViewModel>();
                PagedData<vwVC_Details> data = GenericGridCall<vwVC_Details>.ListView(model.PageSize, x => x.Date, (x => x.IsDelete == false && ( !string.IsNullOrEmpty(model.FromDate.ToString()) ? x.Date>=model.FromDate: true) && (!string.IsNullOrEmpty(model.ToDate.ToString()) ? x.Date <= model.ToDate : true) && ( model.TypeCode>0 ? x.TypeCode == model.TypeCode : true) && (model.ChairPersonCategoryCode > 0 ? x.ChairPersonCategoryCode == model.ChairPersonCategoryCode : true) && (model.ChairPersonCode > 0 ? x.ChairPersonCode == model.ChairPersonCode : true) ), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwVC_Details, VCCreationViewModel>()
                         .ForMember(des => des.Title, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Title) ? x.Title : "--"));
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data.Data, resultData.Data);

                PagedData<VCCreationViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resultData, MessageStatus.Success, true);
                }
            catch (Exception ex)
                {
                return SetResultStatus<PagedData<VCCreationViewModel>>(null, MessageStatus.Error, false);
                }
            }


        /// <summary>
        /// Add new VC
        /// </summary>
        /// <param name = "model" ></ param >
        /// < returns ></ returns >
        public async Task<ServiceResponse<string>> Create(VCCreationModel model)
            {
            model.IsActive = true;
            model.IsDelete = false;
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                model.IsActive = true;
                model.IsDelete = false;
                Mapper.Initialize(x =>
                {
                    x.CreateMap<VCCreationModel, tblVCCreation>()
                    .ForMember(dest => dest.CreateDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblVCCreation data = Mapper.Map<VCCreationModel, tblVCCreation>(model);

                data = await _uow.GenericRepository<tblVCCreation>().AddAsync(data);
                _uow.save();

                data.Code = data.Id;
                data = await _uow.GenericRepository<tblVCCreation>().UpdateAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
                }
            catch (Exception ex)
                {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
                }
            }

        /// <summary>
        /// Update existing VC
        /// </summary>
        /// <param name = "model" ></ param >
        /// < returns ></ returns >
        public async Task<ServiceResponse<string>> Edit(VCCreationModel model)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                if (model.Id > 0)
                    {
                  
                    tblVCCreation objResult = await _uow.GenericRepository<tblVCCreation>().GetByIdAsync(model.Id);
                    if (objResult != null)
                        {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<VCCreationModel, tblVCCreation>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblVCCreation>().UpdateAsync(objResult);
                        _uow.save();
                        return SetResultStatus(string.Empty, MessageStatus.Update, true);
                        }
                    else
                        {
                        return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
                        }
                    }
                else
                    {
                    return SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                    }
                }
            catch (Exception ex)
                {
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
                }
            }

        /// <summary>
        /// get VC by Id
        /// </summary>
        /// <param name = "id" ></ param >
        /// < returns ></ returns >
        public ServiceResponse<VCCreationModel> GetById(long id)
            {
            ServiceResponse<VCCreationModel> objReturn = new ServiceResponse<VCCreationModel>();
            try
                {
                tblVCCreation resultData = _uow.GenericRepository<tblVCCreation>().GetByID(id);
                if (resultData != null)
                    {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblVCCreation, VCCreationModel>();
                    });
                    objReturn.Data = Mapper.Map<tblVCCreation, VCCreationModel>(resultData);
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

        /// <summary>
        /// Set Actvive De-Actvive status by Id
        /// </summary>
        /// <param name = "id" ></ param >
        /// < returns ></ returns >
        public async Task<ServiceResponse<string>> UpdateStatus(long id)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
                {
                if (id > 0)
                    {
                    tblVCCreation objResult = _uow.GenericRepository<tblVCCreation>().GetByID(id);
                    if (objResult != null)
                        {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblVCCreation>().UpdateAsync(objResult);
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
            catch (Exception)
                {
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
                }
            }

        #endregion

        #region Reports

        /// <summary>
        /// Get VC report
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<VCReportModel>> GetAllVcReport(VCReportSearchModel model)
        {
            try
            {
                List<VCReportModel> resultData = new List<VCReportModel>();
                List<vwVC_ReportDetails> data = _uow.GenericRepository<vwVC_ReportDetails>().GetAll(filter: x => (!string.IsNullOrEmpty(model.FromDate.ToString()) ? x.Date >= model.FromDate : true) && (!string.IsNullOrEmpty(model.ToDate.ToString()) ? x.Date <= model.ToDate : true) && (model.ChairPersonCategoryCode > 0 ? x.ChairPersonCategoryCode == model.ChairPersonCategoryCode : true) && (model.ChairPersonCode > 0 ? x.ChairPersonCode == model.ChairPersonCode : true)).ToList();
                if (model.OrderByDateDptVCCat==0)
                {
                    data = data.OrderByDescending(x => x.Date).ToList();
                }
                else if(model.OrderByDateDptVCCat == 1)
                {
                    data = data.OrderBy(x => x.DepartmentTitle).ToList();
                }
                else
                {
                    data = data.OrderBy(x => x.VCCategoryName).ToList();
                }

                    //.OrderBy(x => x.ParticipantCategoryDisplayOrder).ThenBy(x=> x.ParticipantDisplayOrder).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwVC_ReportDetails, VCReportModel>()
                         .ForMember(des => des.Title, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Title) ? x.Title : "--"));
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<VCReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// VC Summary Report
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<ReportSummeryViewModel>> VCSummaryReport(ReportSummerySearchModel model)
        {
            try
            {
                List<ReportSummeryViewModel> resultData = new List<ReportSummeryViewModel>();
                //List<SP_VC_SummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_VC_SummaryReport_Result>("SP_VC_SummaryReport").ToList();

                List<SP_VC_SummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_VC_SummaryReport_Result>("SP_VC_SummaryReport @ToDate, @FromDate, @ChairPersonCategoryCode, @ChairPersonCode"
                    , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                    , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                    , new SqlParameter("ChairPersonCategoryCode", SqlDbType.BigInt) { Value = model.ChairPersonCategoryCode > 0 ? model.ChairPersonCategoryCode : 0 }
                    , new SqlParameter("ChairPersonCode", SqlDbType.BigInt) { Value = model.ChairPersonCode > 0 ? model.ChairPersonCode : 0 }).ToList();
                 

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_VC_SummaryReport_Result, ReportSummeryViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<ReportSummeryViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get participant count of all district
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ParticipantCountByDistrictReportModel>> VCParticipantCountByDistrictReport(ParticipantByDistrictReportModel model)
        {
            try
            {
                List<ParticipantCountByDistrictReportModel> resultData = new List<ParticipantCountByDistrictReportModel>();

                List<sp_VC_ParticipantByDistrictReport_Result> data = _uow.ExeccuteStoreProcedure<sp_VC_ParticipantByDistrictReport_Result>("sp_VC_ParticipantByDistrictReport @vcCode"
                    , new SqlParameter("vcCode", SqlDbType.BigInt) { Value = model.VCCode>0 ? model.VCCode : 0 }).Where(x=>x.ParticipantCount>0).ToList();


                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_VC_ParticipantByDistrictReport_Result, ParticipantCountByDistrictReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<ParticipantCountByDistrictReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// VC Chairperson Category Summary Report
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ChairPersonCategorySummaryReportModel>> VCChairpersonCategorySummaryReport(ChairpersonSummeryReportSearchModel model)
        {
            try
            {
                List<ChairPersonCategorySummaryReportModel> resultData = new List<ChairPersonCategorySummaryReportModel>();
                List<SP_VC_ChairPersonCategorySummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_VC_ChairPersonCategorySummaryReport_Result>("SP_VC_ChairPersonCategorySummaryReport @ToDate, @FromDate, @ChairPersonCategoryCode"
                    , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                    , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                    , new SqlParameter("ChairPersonCategoryCode", SqlDbType.BigInt) { Value = model.ChairPersonCategoryCode > 0 ? model.ChairPersonCategoryCode : 0 }
                   ).ToList();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_VC_ChairPersonCategorySummaryReport_Result, ChairPersonCategorySummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<ChairPersonCategorySummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Delete VC incase no participant added for this VC
        /// </summary>
        /// <param name="vCId"></param>
        /// <returns></returns>
        public ServiceResponse<string> Delete(long vCId)
        {
            try
            {
                SP_VC_DeleteVC_Result result = _uow.ExeccuteStoreProcedure<SP_VC_DeleteVC_Result>("SP_VC_DeleteVC @VCId"
                    , new SqlParameter("VCId", SqlDbType.BigInt) { Value = vCId }
                    ).FirstOrDefault();

                if (Convert.ToInt32(result.Result)>0)
                {
                    return SetResultStatus(string.Empty, MessageStatus.Delete, true);
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.ParticipantExistForVC, false);
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get VC report summary report by category and department
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<CatDptWiseSummaryReportModel>> GetCategoryAndDptWiseSummaryVCReport(CategoryAndDptWiseSummaryVCReportFilterModel model)
        {
            try
            {
                List<CatDptWiseSummaryReportModel> resultData = new List<CatDptWiseSummaryReportModel>();
                List<SP_VC_CatDptWiseSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_VC_CatDptWiseSummaryReport_Result>("SP_VC_CatDptWiseSummaryReport @ToDate,@FromDate,@ChairPersonCategoryCode,@ChairPersonCode,@Type,@VCCategoryCodes,@OrderByDptOrVCCat"
                   , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                   , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                    , new SqlParameter("ChairPersonCategoryCode", SqlDbType.BigInt) { Value = model.ChairPersonCategoryCode > 0 ? model.ChairPersonCategoryCode : 0 }
                    , new SqlParameter("ChairPersonCode", SqlDbType.BigInt) { Value = model.ChairPersonCode > 0 ? model.ChairPersonCode : 0 }
                    , new SqlParameter("Type", SqlDbType.BigInt) { Value = model.Type > 0 ? model.Type : 0 }
                     , new SqlParameter("VCCategoryCodes", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.VCCategoryCodes) ? string.Empty : model.VCCategoryCodes }
                      , new SqlParameter("OrderByDptOrVCCat", SqlDbType.Int) { Value = model.OrderByDptOrVCCat }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_VC_CatDptWiseSummaryReport_Result, CatDptWiseSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetCategoryAndDptWiseSummaryVCReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCategoryAndDptWiseSummaryVCReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCategoryAndDptWiseSummaryVCReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                return SetResultStatus<List<CatDptWiseSummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get VC summary report by admin department, department and category wise
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<AdminDptCatWiseSummaryReportModel>> GetAdmDptCatWiseSummaryVCReport(CategoryAndDptWiseSummaryVCReportFilterModel model)
        {
            try
            {
                List<AdminDptCatWiseSummaryReportModel> resultData = new List<AdminDptCatWiseSummaryReportModel>();
                List<SP_VC_AdminDptCatWiseSummaryReport_Result> data = _uow.ExeccuteStoreProcedure<SP_VC_AdminDptCatWiseSummaryReport_Result>("SP_VC_AdminDptCatWiseSummaryReport @ToDate,@FromDate,@ChairPersonCategoryCode,@ChairPersonCode,@Type,@VCCategoryCodes"
                   , new SqlParameter("ToDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.ToDate) ? string.Empty : model.ToDate }
                   , new SqlParameter("FromDate", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.FromDate) ? string.Empty : model.FromDate }
                    , new SqlParameter("ChairPersonCategoryCode", SqlDbType.BigInt) { Value = model.ChairPersonCategoryCode > 0 ? model.ChairPersonCategoryCode : 0 }
                    , new SqlParameter("ChairPersonCode", SqlDbType.BigInt) { Value = model.ChairPersonCode > 0 ? model.ChairPersonCode : 0 }
                    , new SqlParameter("Type", SqlDbType.BigInt) { Value = model.Type > 0 ? model.Type : 0 }
                     , new SqlParameter("VCCategoryCodes", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.VCCategoryCodes) ? string.Empty : model.VCCategoryCodes }
                    ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_VC_AdminDptCatWiseSummaryReport_Result, AdminDptCatWiseSummaryReportModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetAdmDptCatWiseSummaryVCReport ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetAdmDptCatWiseSummaryVCReport ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetAdmDptCatWiseSummaryVCReport ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");

                return SetResultStatus<List<AdminDptCatWiseSummaryReportModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

    }
}
