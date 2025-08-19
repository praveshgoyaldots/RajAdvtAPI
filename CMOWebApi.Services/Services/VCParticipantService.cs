using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VCModel;
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
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
    public class VCParticipantService : BaseService, IVCParticipantService
    {
        private static string _BlankExcelFileLocation = HttpContext.Current.Server.MapPath(FilePath.ExcelDocLocation.GetStringValue());

        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///
        public VCParticipantService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Methods

        /// <summary>
        /// Get all Video Conferencing Participant according to login user by CV Code
        /// </summary>
        /// <param name="model"></param>
        /// <param name="CVCode"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<VCParticipantViewModel>> GetAll(IndexModel model, long vCCode)
        {
            try
            {
                PagedData<VCParticipantViewModel> resulData = new PagedData<VCParticipantViewModel>();

                var usertypeADM = UserTypeEnum.ADM.GetStringValue();
                var usertypeSADM = UserTypeEnum.SADM.GetStringValue();

                PagedData<vwVC_Participant> data = GenericGridCall<vwVC_Participant>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false && x.VCCreateCode == vCCode
                // && x.CreatedBy== _loginUserDetail.UserId
                && (_loginUserDetail.UserType == usertypeADM || _loginUserDetail.UserType == usertypeSADM ? true : x.CreatedBy == _loginUserDetail.UserId)
                , model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwVC_Participant, VCParticipantViewModel>();
                    // .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--")); 
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<VCParticipantViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<VCParticipantViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get all Video Conferencing Participant by CV Code
        /// </summary>
        /// <param name="model"></param>
        /// <param name="CVCode"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<VCParticipantViewModel>> GetParicipantReport(IndexModel model, long vCCode)
        {
            try
            {
                PagedData<VCParticipantViewModel> resulData = new PagedData<VCParticipantViewModel>();
                PagedData<vwVC_Participant> data = GenericGridCall<vwVC_Participant>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false && x.VCCreateCode == vCCode, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwVC_Participant, VCParticipantViewModel>();
                    // .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--")); 
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<VCParticipantViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<VCParticipantViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Video Conferencing Report with filter
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<VCParticipantReportViewModel>> GetVcReport(VCCustomFilter model)
        {
            try
            {

                List<VCParticipantReportViewModel> resultData = new List<VCParticipantReportViewModel>();

                List<SP_VC_ParticipantReport_Result> data = _uow.ExeccuteStoreProcedure<SP_VC_ParticipantReport_Result>("SP_VC_ParticipantReport @VcCode, @TypeCode, @Date, @ChairPersonCategoryCode, @ChairPersonCode, @DistrictCode, @LocationCode, @IsPresent,@IsOrderByDLPCorPCDL, @ParticipantCategoryCode"
                    , new SqlParameter("VcCode", SqlDbType.BigInt) { Value = model.VcCode > 0 ? model.VcCode : 0 }
                    , new SqlParameter("TypeCode", SqlDbType.BigInt) { Value = model.TypeCode > 0 ? model.TypeCode : 0 }
                    , new SqlParameter("Date", SqlDbType.NVarChar) { Value = string.IsNullOrEmpty(model.VCDate) ? string.Empty : model.VCDate }
                    , new SqlParameter("ChairPersonCategoryCode", SqlDbType.BigInt) { Value = model.ChairPersonCategoryCode > 0 ? model.ChairPersonCategoryCode : 0 }
                    , new SqlParameter("ChairPersonCode", SqlDbType.BigInt) { Value = model.ChairPersonCode > 0 ? model.ChairPersonCode : 0 }
                    , new SqlParameter("DistrictCode", SqlDbType.BigInt) { Value = model.DistrictCode > 0 ? model.DistrictCode : 0 }
                    , new SqlParameter("LocationCode", SqlDbType.BigInt) { Value = model.locationCode > 0 ? model.locationCode : 0 }
                     , new SqlParameter("IsPresent", SqlDbType.Int) { Value = model.IsPresent }
                 , new SqlParameter("IsOrderByDLPCorPCDL", SqlDbType.Int) { Value = model.IsOrderByDLPCorPCDL }
                   , new SqlParameter("ParticipantCategoryCode", SqlDbType.BigInt) { Value = model.ParticipantCategoryCode > 0 ? model.ParticipantCategoryCode : 0 }

                 ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<SP_VC_ParticipantReport_Result, VCParticipantReportViewModel>()
                   .ForMember(des => des.MobileNo, src => src.MapFrom(x => !string.IsNullOrEmpty(x.MobileNo) ? x.MobileNo : "--"));

                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus<List<VCParticipantReportViewModel>>(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<VCParticipantReportViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add new Video Conferencing Participant
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(VCParticipantModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<VCParticipantModel, tblVCParticipant>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblVCParticipant data = Mapper.Map<VCParticipantModel, tblVCParticipant>(model);
                if (model.ParticipantCodeList != null && model.ParticipantCodeList.Count > 0)
                {
                    List<tblVCParticipantMaster> objResult = _uow.GenericRepository<tblVCParticipantMaster>().GetAll(filter: x => model.ParticipantCodeList.Contains(x.Code.ToString())).ToList();

                    foreach (var item in model.ParticipantCodeList)
                    {
                        if (Convert.ToInt64(item) > 0)
                        {
                            tblVCParticipant dataObj = Mapper.Map<VCParticipantModel, tblVCParticipant>(model);

                            dataObj.ParticipantCode = Convert.ToInt64(item);
                            var dataItem = objResult.Where(x => x.Code == dataObj.ParticipantCode).FirstOrDefault();
                            if (dataItem != null)
                            {
                                dataObj.Name = dataItem.NameEnglish;
                                dataObj.Designation = dataItem.DesignationEnglish;
                            }

                            dataObj.MobileNo = null;
                            _uow.GenericRepository<tblVCParticipant>().Add(dataObj);

                        }
                    }
                }
                if (model.ParticipantCode == 0)
                {
                    await _uow.GenericRepository<tblVCParticipant>().AddAsync(data);
                }

                _uow.save();

                sp_VC_UpdateParticipantCode_Result updateCode = _uow.ExeccuteStoreProcedure<sp_VC_UpdateParticipantCode_Result>("sp_VC_UpdateParticipantCode").FirstOrDefault();
                //data.Code = Convert.ToInt32(data.Id);
                // data = await _uow.GenericRepository<tblVCParticipant>().UpdateAsync(data);
                // _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing Video Conferencing Participant
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(VCParticipantModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblVCParticipant objResult = await _uow.GenericRepository<tblVCParticipant>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<VCParticipantModel, tblVCParticipant>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblVCParticipant>().UpdateAsync(objResult);
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
        /// get Video Conferencing Participant by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<VCParticipantModel> GetById(long id)
        {
            ServiceResponse<VCParticipantModel> objReturn = new ServiceResponse<VCParticipantModel>();
            try
            {
                tblVCParticipant resultData = _uow.GenericRepository<tblVCParticipant>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblVCParticipant, VCParticipantModel>();
                    });
                    objReturn.Data = Mapper.Map<tblVCParticipant, VCParticipantModel>(resultData);
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
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblVCParticipant objResult = _uow.GenericRepository<tblVCParticipant>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblVCParticipant>().UpdateAsync(objResult);
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

        /// <summary>
        /// Mark present and absent to participant
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> MarkPresentAbsent(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tblVCParticipant objResult = _uow.GenericRepository<tblVCParticipant>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsPresent = objResult.IsPresent == null ? true : !objResult.IsPresent;
                        await _uow.GenericRepository<tblVCParticipant>().UpdateAsync(objResult);
                        _uow.save();
                        if (Convert.ToBoolean(objResult.IsPresent))
                        {
                            return SetResultStatus(string.Empty, MessageStatus.MarkPresent, true);
                        }
                        else
                        {
                            return SetResultStatus(string.Empty, MessageStatus.MarkAbsent, true);
                        }
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


        #region Bulk upload

        /// <summary>
        /// Use to upload bulk participant from excel
        /// </summary>
        /// <param name="excelRecords"></param>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<ParticipantTempBulkViewModel>> ParticipantExcelUpload(DataSet excelRecords, ParticipantTempBulkModel model)
        {
            try
            {
                List<ParticipantTempBulkViewModel> resultData = new List<ParticipantTempBulkViewModel>();
                DateTime date = DateTime.Now;
                var finalRecords = excelRecords.Tables[0];
                if (finalRecords.Rows.Count > 0)
                {
                    List<tblVCParticipantTempBulk> obj = _uow.GenericRepository<tblVCParticipantTempBulk>().GetAll(filter: x => x.CreatedBy == _loginUserDetail.UserId).ToList();
                    _uow.GenericRepository<tblVCParticipantTempBulk>().DeleteAllById(obj);
                }
                for (int i = 1; i < finalRecords.Rows.Count; i++)
                {
                    tblVCParticipantTempBulk objItem = new tblVCParticipantTempBulk();
                    objItem.VCCreateCode = model.VCCreateCode;
                    objItem.ParticipantCategoryCode = 0;
                    objItem.ParticipantCode = 0;
                    objItem.DistrictCode = model.DistrictCode;
                    objItem.LocationCode = model.LocationCode;
                    objItem.CreatedBy = _loginUserDetail.UserId;
                    objItem.CreatedDate = date;
                    objItem.IsActive = true;
                    objItem.IsDeleted = false;
                    objItem.IsPresent = true;
                    objItem.Name = finalRecords.Rows[i][0].ToString();
                    objItem.Designation = finalRecords.Rows[i][1].ToString();
                    objItem.MobileNo = finalRecords.Rows[i][2].ToString();

                    _uow.GenericRepository<tblVCParticipantTempBulk>().Add(objItem);
                }
                _uow.save();

                List<vwVC_ParticipantTempBulk> objData = _uow.GenericRepository<vwVC_ParticipantTempBulk>().GetAll(filter: x => x.CreatedBy == _loginUserDetail.UserId).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwVC_ParticipantTempBulk, ParticipantTempBulkViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(objData, resultData);

                return SetResultStatus<List<ParticipantTempBulkViewModel>>(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<ParticipantTempBulkViewModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Save final excel data in main table
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<string> ParticipantExcelFinalUpload()
        {
            try
            {
                SP_VC_BulkParticipantAdd_Result data = _uow.ExeccuteStoreProcedure<SP_VC_BulkParticipantAdd_Result>("SP_VC_BulkParticipantAdd @UserId",
                  new SqlParameter("UserId", SqlDbType.Int) { Value = _loginUserDetail.UserId }
               ).FirstOrDefault();
                var result = data.ResultStatus;

                if (result.Contains("true"))
                {
                    return SetResultStatus(string.Empty, MessageStatus.Save, true);
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
                }

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
            }
        }

        /// <summary>
        /// Delete item from Bulk upload which is not want to upload
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Delete(long id)
        {
            try
            {
                tblVCParticipantTempBulk objOrder = await _uow.GenericRepository<tblVCParticipantTempBulk>().GetByIdAsync(id);
                objOrder.IsDeleted = true;
                await _uow.GenericRepository<tblVCParticipantTempBulk>().UpdateAsync(objOrder);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Delete, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Delete Participant 
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> DeleteParticipant(long id)
        {
            try
            {
                tblVCParticipant objOrder = await _uow.GenericRepository<tblVCParticipant>().GetByIdAsync(id);
                objOrder.IsDeleted = true;
                await _uow.GenericRepository<tblVCParticipant>().UpdateAsync(objOrder);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Delete, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get All Excel Temp data
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<ParticipantTempBulkViewModel>> GetParticipantExcelUploadTempList()
        {
            try
            {
                List<ParticipantTempBulkViewModel> resultData = new List<ParticipantTempBulkViewModel>();

                List<vwVC_ParticipantTempBulk> objData = _uow.GenericRepository<vwVC_ParticipantTempBulk>().GetAll(filter: x => x.CreatedBy == _loginUserDetail.UserId).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwVC_ParticipantTempBulk, ParticipantTempBulkViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(objData, resultData);

                return SetResultStatus<List<ParticipantTempBulkViewModel>>(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<ParticipantTempBulkViewModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion

        #region excel file upload
        public ServiceResponse<ExcelFileViewModel> GetExcelFileDownload()
        {
            try
            {
                ExcelFileViewModel response = new ExcelFileViewModel();
                response.BlankDocUrl = CommonUtility.GetBase64strFromFilePath(_BlankExcelFileLocation);

                return SetResultStatus<ExcelFileViewModel>(response, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<ExcelFileViewModel>(null, MessageStatus.Error, false);
            }

        }
        #endregion
    }
}
