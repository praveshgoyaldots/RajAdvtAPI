using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class ChiefMinisterProfileService : BaseService, IChiefMinisterProfileService
    {
        #region ///   variable  //
        IUnitofWork _uow;

        #endregion

        #region ///   constructor   ///
        public ChiefMinisterProfileService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region ///  Method   ///


        public async Task<ServiceResponse<string>> AddUpdate(ChiefMinisterProfilePostModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                string mappingParaStr = string.Empty;

                tblJAN_ChiefMinisterProfile objUpdateModel = new tblJAN_ChiefMinisterProfile();

                if (model.Code > 0)
                {
                    objUpdateModel = _uow.GenericRepository<tblJAN_ChiefMinisterProfile>().GetAll(filter: x => x.Code.Value == model.Code).FirstOrDefault();
                    if (!string.IsNullOrEmpty(objUpdateModel.PhotoPath) && (string.IsNullOrEmpty(model.PhotoPath) || model.PhotoPath.Contains(objUpdateModel.PhotoPath.ToAbsolutePath())))
                    {
                        model.PhotoPath = objUpdateModel.PhotoPath;
                    }
                }


                List<SqlParameter> param = SetSP_AddUpdateParam(model, out mappingParaStr);
                AddUpdateChiefMinisterProfile_Result Result = _uow.ExeccuteStoreProcedure<AddUpdateChiefMinisterProfile_Result>("AddUpdateChiefMinisterProfile " + mappingParaStr, param.ToArray()).FirstOrDefault();
                _uow.save();
                //if add
                if (Result.Code > 0 && (model.Code == null || model.Code == 0))
                {
                    model.Code = Result.Code;
                    objUpdateModel = _uow.GenericRepository<tblJAN_ChiefMinisterProfile>().GetAll(filter: x => x.Code.Value == model.Code).FirstOrDefault();

                    if (objUpdateModel != null)
                    {
                        objUpdateModel.PhotoPath = CommonUtility.UploadCMProfilePhoto(model.PhotoPath, objUpdateModel.Code.Value, string.Empty);
                        objUpdateModel.PathUrl = model.PathUrl;
                        _uow.GenericRepository<tblJAN_ChiefMinisterProfile>().Update(objUpdateModel);
                        _uow.save();
                    }
                    objReturn = SetResultStatus(Result.Code.ToString(), MessageStatus.Save, true);
                }
                //if Update
                else if (Result.Code > 0 && model.Code > 0)
                {
                    if (objUpdateModel != null && !model.PhotoPath.Contains(string.IsNullOrEmpty(objUpdateModel.PhotoPath) ? string.Empty : objUpdateModel.PhotoPath))
                    {
                        objUpdateModel.PhotoPath = CommonUtility.UploadCMProfilePhoto(model.PhotoPath, model.Code.Value, string.IsNullOrEmpty(objUpdateModel.PhotoPath) ? string.Empty : objUpdateModel.PhotoPath);
                        objUpdateModel.PathUrl = model.PathUrl;
                        _uow.GenericRepository<tblJAN_ChiefMinisterProfile>().Update(objUpdateModel);
                        _uow.save();

                    }


                    objReturn = SetResultStatus(Result.Code.ToString(), MessageStatus.Update, true);
                }
                else
                {

                    objReturn = SetResultStatus<string>(null, MessageStatus.Error, false);
                }
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Cm Profile Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Cm Profile Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Cm Profile Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }
        public ServiceResponse<PagedData<ChiefMinisterProfileViewModel>> GetAll(IndexModel model)
        {

            ServiceResponse<PagedData<ChiefMinisterProfileViewModel>> objReturn = new ServiceResponse<PagedData<ChiefMinisterProfileViewModel>>();
            try
            {
                PagedData<ChiefMinisterProfileViewModel> resulData = new PagedData<ChiefMinisterProfileViewModel>();
                PagedData<vwJAN_ChiefMinisterProfile> data = GenericGridCall<vwJAN_ChiefMinisterProfile>.ListView(model.PageSize, x => x.Name, x => x.IsDelete == false, (string.IsNullOrEmpty(model.Search) ? null : model.Search), (string.IsNullOrEmpty(model.Search) ? null : model.OrderBy), model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_ChiefMinisterProfile, ChiefMinisterProfileViewModel>()
                     .ForMember(des => des.PhotoPath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.PhotoPath) ? mdlSrc.PhotoPath.ToAbsolutePath() : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<ChiefMinisterProfileViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Cm Profile GetAll ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Cm Profile GetAll ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Cm Profile GetAll ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus<PagedData<ChiefMinisterProfileViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<ChiefMinisterProfileViewModel> GetByCode(long code)
        {
            ServiceResponse<ChiefMinisterProfileViewModel> objReturn = new ServiceResponse<ChiefMinisterProfileViewModel>();
            try
            {
                vwJAN_ChiefMinisterProfile objMaster = _uow.GenericRepository<vwJAN_ChiefMinisterProfile>().GetAll(filter: x => x.Code == code).FirstOrDefault();
                if (objMaster != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwJAN_ChiefMinisterProfile, ChiefMinisterProfileViewModel>()
                        .ForMember(des => des.PhotoPath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.PhotoPath) ? mdlSrc.PhotoPath.ToAbsolutePath() : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<vwJAN_ChiefMinisterProfile, ChiefMinisterProfileViewModel>(objMaster);

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
                CreateLogHelper.CreateLogFile("Cm Profile GetByCode ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Cm Profile GetByCode ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Cm Profile GetByCode ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id >= 0)
                {
                    List<SqlParameter> sqlParam = new List<SqlParameter>() {
                        new SqlParameter("Code", SqlDbType.BigInt) { Value = id }
                    };
                    sp_UpdateChiefMinisterProfileActiveStatus_Result Result = _uow.ExeccuteStoreProcedure<sp_UpdateChiefMinisterProfileActiveStatus_Result>("sp_UpdateChiefMinisterProfileActiveStatus @Code", sqlParam.ToArray()).FirstOrDefault();
                    _uow.save();
                    objReturn.Data = Convert.ToString(Result.Code);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Update, true);
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Update, true);
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public async Task<ServiceResponse<string>> UpdateDeleteStatusAsync(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id >= 0)
                {
                    tblJAN_ChiefMinisterProfile objMaster = _uow.GenericRepository<tblJAN_ChiefMinisterProfile>().GetAll(filter: x => x.Code == id).FirstOrDefault();
                    if (objMaster != null)
                    {
                        objMaster.IsDelete = !objMaster.IsDelete;
                        await _uow.GenericRepository<tblJAN_ChiefMinisterProfile>().UpdateAsync(objMaster);
                        _uow.save();
                        objReturn = SetResultStatus(objMaster.Code.ToString(), MessageStatus.StatusUpdate, true);
                    }
                    else
                    {
                        objReturn.Data = null;
                        objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                    }
                }
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
                }
            }
            catch (Exception)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<ChiefMinisterProfileViewModel> GetActiveDetail(bool isbase64File = false)
        {
            ServiceResponse<ChiefMinisterProfileViewModel> objReturn = new ServiceResponse<ChiefMinisterProfileViewModel>();
            try
            {
                vwJAN_ChiefMinisterProfile objMaster = _uow.GenericRepository<vwJAN_ChiefMinisterProfile>().GetAll(filter: x => x.IsActive == true && x.IsDelete == false).FirstOrDefault();
                if (objMaster != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwJAN_ChiefMinisterProfile, ChiefMinisterProfileViewModel>()
                        .ForMember(des => des.PhotoPath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.PhotoPath) ? isbase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.PhotoPath)) : mdlSrc.PhotoPath.ToAbsolutePath() : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<vwJAN_ChiefMinisterProfile, ChiefMinisterProfileViewModel>(objMaster);

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

        #region ///   Private Method   ///


        /// <summary>
        /// SetSP_AddUpdateDistrictParam
        /// </summary>
        /// <param name="model"></param>
        /// <param name="mappingParamStr"></param>
        /// <returns></returns>
        private List<SqlParameter> SetSP_AddUpdateParam(ChiefMinisterProfilePostModel model, out string mappingParamStr)
        {
            List<SqlParameter> sqlParam = new List<SqlParameter>();
            string mapStr = string.Empty;
            try
            {
                mapStr += "@Code";
                sqlParam.Add(new SqlParameter("Code", SqlDbType.BigInt) { Value = model.Code ?? 0 });
                mapStr += ",@TitleCode";
                sqlParam.Add(new SqlParameter("TitleCode", SqlDbType.Int) { Value = model.TitleCode ?? (object)DBNull.Value });

                mapStr += ",@DesignationCode";
                sqlParam.Add(new SqlParameter("DesignationCode", SqlDbType.Int) { Value = model.DesignationCode ?? (object)DBNull.Value });

                mapStr += ",@Name";
                sqlParam.Add(new SqlParameter("Name", SqlDbType.NVarChar) { Value = model.Name ?? (object)DBNull.Value });

                mapStr += ",@NameHindi";
                sqlParam.Add(new SqlParameter("NameHindi", SqlDbType.NVarChar) { Value = model.NameHindi ?? (object)DBNull.Value });

                mapStr += ",@Message";
                sqlParam.Add(new SqlParameter("Message", SqlDbType.NVarChar) { Value = model.Message ?? (object)DBNull.Value });

                mapStr += ",@MessageHindi";
                sqlParam.Add(new SqlParameter("MessageHindi", SqlDbType.NVarChar) { Value = model.MessageHindi ?? (object)DBNull.Value });

                mapStr += ",@PhotoPath";
                sqlParam.Add(new SqlParameter("PhotoPath", SqlDbType.VarChar) { Value = model.PhotoPath ?? (object)DBNull.Value });

                mapStr += ",@IsActive";
                sqlParam.Add(new SqlParameter("IsActive", SqlDbType.Bit) { Value = model.IsActive == null ? 0 : model.CreatedBy });

                mapStr += ",@CreatedBy";
                sqlParam.Add(new SqlParameter("CreatedBy", SqlDbType.Int) { Value = model.CreatedBy == null ? (object)DBNull.Value : model.CreatedBy });

                mapStr += ",@ModifiedBy";
                sqlParam.Add(new SqlParameter("ModifiedBy", SqlDbType.Int) { Value = model.ModifiedBy == null ? (object)DBNull.Value : model.ModifiedBy });

                mapStr += ",@PathUrl";
                sqlParam.Add(new SqlParameter("PathUrl", SqlDbType.NVarChar) { Value = model.PathUrl ?? (object)DBNull.Value });
                }
            catch
            {
                throw;
            }
            mappingParamStr = mapStr;
            return sqlParam;
        }
        #endregion
    }
}
