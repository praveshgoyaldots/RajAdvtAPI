//using AutoMapper;
//using CMOWebApi.Core;
//using CMOWebApi.Data;
//using CMOWebApi.Data.UnitOfWork;
//using CMOWebApi.Models.AdminModel.MasterModel;
//using CMOWebApi.Models.GeneralModel;
//using CMOWebApi.Services.IServices;
//using CMOWebApi.Services.ServiceHelper;
//using System;
//using System.Collections.Generic;
//using System.Data;
//using System.Data.SqlClient;
//using System.Linq;
//using System.Threading.Tasks;

//namespace CMOWebApi.Services.Services
//{
//    public class CitizenLetterTypeMasterService : BaseService, ICitizenLetterTypeMasterService
//    {
//        #region ///   variable  //
//        IUnitofWork _uow;
//        #endregion

//        #region ///   constructor   ///
//        public CitizenLetterTypeMasterService(IUnitofWork uow)
//        {
//            _uow = uow;
//        }
//        #endregion

//        #region ///   Method   ///
//        /// <summary>
//        /// Get All letter type data in list Format
//        /// </summary>
//        /// <param name="model"> default value: Page=1; PageSize = 10;OrderByAsc = 1;</param>
//        /// <returns>PagedData<CitizenLetterTypeMasterViewModel></returns>
//        public ServiceResponse<PagedData<CitizenLetterTypeMasterViewModel>> GetAll(IndexModel model)
//        {
//            ServiceResponse<PagedData<CitizenLetterTypeMasterViewModel>> objReturn = new ServiceResponse<PagedData<CitizenLetterTypeMasterViewModel>>();
//            try
//            {
//                PagedData<CitizenLetterTypeMasterViewModel> resulData = new PagedData<CitizenLetterTypeMasterViewModel>();
//                PagedData<vwCitizenLetterType> data = GenericGridCall<vwCitizenLetterType>.ListView(model.PageSize, x => x.LetterType, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
//                var config = new MapperConfiguration(cfg =>
//                {
//                    cfg.CreateMap<vwCitizenLetterType, CitizenLetterTypeMasterViewModel>();
//                });
//                IMapper mapper = config.CreateMapper();
//                resulData.Data = mapper.Map(data.Data, resulData.Data);
//                PagedData<CitizenLetterTypeMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

//                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
//            }
//            catch (Exception ex)
//            {
//                objReturn = SetResultStatus<PagedData<CitizenLetterTypeMasterViewModel>>(null, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Add/Update Letter Type Detail
//        /// </summary>
//        /// <param name="model">CitizenLetterTypeMasterViewModel </param>
//        /// <returns>Letter Type Code</returns>
//        public async Task<ServiceResponse<string>> AddUpdate(CitizenLetterTypeMasterViewModel model)
//        {
//            ServiceResponse<string> objReturn = new ServiceResponse<string>();
//            try
//            {
//                string mappingParaStr = string.Empty;
//                List<SqlParameter> param = SetSP_AddUpdateCitizenLetterTypeParam(model, out mappingParaStr);
//                sp_AddUpdateCitizenLetterType_Result Result = _uow.ExeccuteStoreProcedure<sp_AddUpdateCitizenLetterType_Result>("sp_AddUpdateCitizenLetterType " + mappingParaStr, param.ToArray()).FirstOrDefault();
//                _uow.save();
//                //if add
//                if (Result.LetterTypeCode > 0 && model.LetterTypeCode == 0)
//                {
//                    objReturn = SetResultStatus(Result.LetterTypeCode.ToString(), MessageStatus.Save, true);
//                }
//                //if Update
//                else if (Result.LetterTypeCode > 0 && model.LetterTypeCode > 0)
//                {
//                    objReturn = SetResultStatus(Result.ToString(), MessageStatus.Update, true);
//                }
//                else
//                {
//                    objReturn = SetResultStatus<string>(null, MessageStatus.Error, false);
//                }
//            }
//            catch (Exception ex)
//            {
//                objReturn.Data = null;
//                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Get Detail of Letter Type
//        /// </summary>
//        /// <param name="id">Letter Type Code</param>
//        public async Task<ServiceResponse<CitizenLetterTypeMasterViewModel>> GetById(long id)
//        {
//            ServiceResponse<CitizenLetterTypeMasterViewModel> objReturn = new ServiceResponse<CitizenLetterTypeMasterViewModel>();
//            try
//            {
//                vwCitizenLetterType objMaster = _uow.GenericRepository<vwCitizenLetterType>().GetAll(filter: x => x.LetterTypeCode == id).FirstOrDefault();
//                if (objMaster != null)
//                {
//                    Mapper.Initialize(x =>
//                    {
//                        x.CreateMap<vwCitizenLetterType, CitizenLetterTypeMasterViewModel>();
//                    });
//                    objReturn.Data = Mapper.Map<vwCitizenLetterType, CitizenLetterTypeMasterViewModel>(objMaster);
//                    if (objReturn.Data.AttachmentCodes != null && objReturn.Data.AttachmentCodes.Contains(","))
//                    {
//                        objReturn.Data.AttachmentCodes = objMaster.AttachmentCodes.Split(',').ToList();
//                    }
//                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
//                }
//                else
//                {
//                    objReturn.Data = null;
//                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
//                }
//            }
//            catch (Exception ex)
//            {
//                objReturn.Data = null;
//                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Update Active Status
//        /// </summary>
//        /// <param name="id">Letter Type Code </param>
//        /// <returns>Letter Type Code</returns>
//        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
//        {
//            ServiceResponse<string> objReturn = new ServiceResponse<string>();
//            try
//            {
//                if (id > 0)
//                {
//                    tblCitizenLetterTypeMaster objMaster = await _uow.GenericRepository<tblCitizenLetterTypeMaster>().GetByIdAsync(id);
//                    if (objMaster != null)
//                    {
//                        objMaster.IsActive = !objMaster.IsActive;
//                        await _uow.GenericRepository<tblCitizenLetterTypeMaster>().UpdateAsync(objMaster);
//                        _uow.save();
//                        objReturn = SetResultStatus(objMaster.LetterTypeCode.ToString(), MessageStatus.StatusUpdate, true);
//                    }
//                    else
//                    {
//                        objReturn.Data = null;
//                        objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
//                    }
//                }
//                else
//                {
//                    objReturn.Data = null;
//                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
//                }
//            }
//            catch (Exception)
//            {
//                objReturn.Data = null;
//                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Update Delete Status
//        /// </summary>
//        /// <param name="id">Letter Type Code </param>
//        /// <returns>Letter Type Code</returns>
//        public async Task<ServiceResponse<string>> UpdateDeleteStatus(long id)
//        {
//            ServiceResponse<string> objReturn = new ServiceResponse<string>();
//            try
//            {
//                if (id > 0)
//                {
//                    tblCitizenLetterTypeMaster objMaster = await _uow.GenericRepository<tblCitizenLetterTypeMaster>().GetByIdAsync(id);
//                    if (objMaster != null)
//                    {
//                        objMaster.IsDeleted = !objMaster.IsDeleted;
//                        await _uow.GenericRepository<tblCitizenLetterTypeMaster>().UpdateAsync(objMaster);
//                        _uow.save();
//                        objReturn = SetResultStatus(objMaster.LetterTypeCode.ToString(), MessageStatus.StatusUpdate, true);
//                    }
//                    else
//                    {
//                        objReturn.Data = null;
//                        objReturn = SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
//                    }
//                }
//                else
//                {
//                    objReturn.Data = null;
//                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
//                }
//            }
//            catch (Exception)
//            {
//                objReturn.Data = null;
//                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
//            }
//            return objReturn;
//        }

//        /// <summary>
//        /// Check Letter Type is Exist or not
//        /// </summary>
//        /// <param name="letterType">Letter Type</param>
//        /// <returns>Letter Type Code </returns>
//        public ServiceResponse<object> IsLetterTypeExist(string letterType)
//        {
//            ServiceResponse<object> objReturn = new ServiceResponse<object>();
//            try
//            {
//                var data = _uow.GenericRepository<tblCitizenLetterTypeMaster>().GetAll(filter: x => x.IsDeleted == false && x.LetterType.ToLower() == letterType.ToLower()).FirstOrDefault();
//                if (data != null)
//                {
//                    objReturn = SetResultStatus((object)true, MessageStatus.Exist, true);
//                }
//                else
//                {
//                    objReturn = SetResultStatus((object)false, MessageStatus.NotExist, true);
//                }
//            }
//            catch
//            {
//                objReturn.Message = MessageStatus.Error;
//                objReturn.IsSuccess = false;
//            }
//            return objReturn;
//        }
//        #endregion

//        #region ///   Private Method   ///

//        /// <summary>
//        /// Set sp_AddUpdateCitizenLetterType Parameters
//        /// </summary>
//        /// <param name="model">Citizen Letter Type Post Model</param>
//        /// <param name="mappingParaStr">Mapping stirng related to parameter</param>
//        /// <returns>List<SqlParameter></returns>
//        private List<SqlParameter> SetSP_AddUpdateCitizenLetterTypeParam(CitizenLetterTypeMasterViewModel model, out string mappingParaStr)
//        {
//            List<SqlParameter> sqlParam = new List<SqlParameter>();
//            string mapStr = string.Empty;
//            try
//            {
//                mapStr += "@LetterTypeCode";
//                sqlParam.Add(new SqlParameter("LetterTypeCode", SqlDbType.Int) { Value = model.LetterTypeCode });

//                mapStr += ",@LetterType";
//                sqlParam.Add(new SqlParameter("LetterType", SqlDbType.NVarChar) { Value = model.LetterType ?? (object)DBNull.Value });

//                mapStr += ",@LetterTypeHindi";
//                sqlParam.Add(new SqlParameter("LetterTypeHindi", SqlDbType.NVarChar) { Value = model.LetterTypeHindi ?? (object)DBNull.Value });

//                mapStr += ",@AttachmentCodes";
//                sqlParam.Add(new SqlParameter("AttachmentCodes", SqlDbType.NVarChar) { Value = model.AttachmentCodes == null ? (object)DBNull.Value : string.Join(",", model.AttachmentCodes.Select(int.Parse).ToList()) });

//                mapStr += ",@IsActive";
//                sqlParam.Add(new SqlParameter("IsActive", SqlDbType.Bit) { Value = model.IsActive });

//                mapStr += ",@CreatedBy";
//                sqlParam.Add(new SqlParameter("CreatedBy", SqlDbType.Int) { Value = model.CreatedBy == null ? (object)DBNull.Value : model.CreatedBy });

//                mapStr += ",@ModifiedBy";
//                sqlParam.Add(new SqlParameter("ModifiedBy", SqlDbType.Int) { Value = model.ModifiedBy == null ? (object)DBNull.Value : model.ModifiedBy });
//            }
//            catch
//            {
//                throw;
//            }
//            mappingParaStr = mapStr;
//            return sqlParam;
//        }
//        #endregion

//    }
//}
