using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.VendorPressRelease;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Web;
using System.Linq;
using System.Web.Mvc;

namespace CMOWebApi.Services.Services
{
    public class TenderMasterService : BaseService, ITenderMasterService
    {
        #region Variable

        IUnitofWork _uow;

        #endregion

        #region Constructor

        public TenderMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        /// <summary>
        /// Get all record of tender master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<TenderMasterListModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<TenderMasterListModel> responseList = new PagedData<TenderMasterListModel>();
                PagedData<vwJAN_TenderMaster> data = GenericGridCall<vwJAN_TenderMaster>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_TenderMaster, TenderMasterListModel>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(data.Data, responseList.Data);

                PagedData<TenderMasterListModel>.ReturnCustomizeData(responseList, model.PageSize, data.TotalRecords);

                return SetResultStatus(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("tender master All ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master All ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master All ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<TenderMasterListModel>>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
        /// Get record by id of tender master
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<TenderMasterModel>> GetById(long id)
        {
            try
            {
                TenderMasterModel result = new TenderMasterModel();
                tblJAN_TenderMaster objData = await _uow.GenericRepository<tblJAN_TenderMaster>().GetByIdAsync(id);
                if (objData != null)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblJAN_TenderMaster, TenderMasterModel>()
                          .ForMember(des => des.SoftCopyURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.SoftCopyURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.SoftCopyURL.Trim())) : string.Empty));
                    });
                    IMapper mapper = config.CreateMapper();
                    result = mapper.Map(objData, result);
                }
                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("tender master GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<TenderMasterModel>(null, MessageStatus.Error, false);
            }

        }

        /// <summary>
		/// This for create new record in tender master.
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
        public async Task<ServiceResponse<string>> Create(TenderMasterModel model)
        {
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<TenderMasterModel, tblJAN_TenderMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.SoftCopyURL, opt => opt.MapFrom(src => string.Empty))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_TenderMaster obj = Mapper.Map<TenderMasterModel, tblJAN_TenderMaster>(model);

                await _uow.GenericRepository<tblJAN_TenderMaster>().AddAsync(obj);
                _uow.save();

                if (!string.IsNullOrEmpty(model.SoftCopyURL))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.SoftCopyURL, true, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        obj.SoftCopyURL = CommonUtility.UploadTenderFile(model.SoftCopyURL, obj.Id);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }

                obj.Code = obj.Id;
                await _uow.GenericRepository<tblJAN_TenderMaster>().UpdateAsync(obj);

                _uow.save();

                return SetResultStatus(obj.Id.ToString(), MessageStatus.Create, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("tender master Create ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master Create ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master Create ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// this is for edit the record of tender master.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(TenderMasterModel model)
        {
            try
            {
                tblJAN_TenderMaster obj = await _uow.GenericRepository<tblJAN_TenderMaster>().GetByIdAsync(model.Id);

                if (!string.IsNullOrEmpty(model.SoftCopyURL))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.SoftCopyURL, true, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        model.SoftCopyURL = CommonUtility.UploadTenderFile(model.SoftCopyURL, obj.Id, false, obj.SoftCopyURL);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<TenderMasterModel, tblJAN_TenderMaster>()
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                await _uow.GenericRepository<tblJAN_TenderMaster>().UpdateAsync(obj);

                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("tender master Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
		/// For toggle the status of specific record.
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblJAN_TenderMaster objResult = await _uow.GenericRepository<tblJAN_TenderMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_TenderMaster>().UpdateAsync(objResult);
                        _uow.save();
                        objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.StatusUpdate, true);
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

        /// <summary>
        /// Get record by id of tender master with child data
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<TenderDetailModel> GetTenderDetailWithChildList(long id)
        {
            try
            {
                TenderDetailModel result = new TenderDetailModel();
                vwJAN_TenderMaster objData = _uow.GenericRepository<vwJAN_TenderMaster>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (objData != null)
                {
                    List<tblJAN_TenderMapping> objDataList = _uow.GenericRepository<tblJAN_TenderMapping>().GetAll(filter: x => x.TenderId == id).ToList();

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vwJAN_TenderMaster, TenderMasterListModel>()
                          .ForMember(des => des.SoftCopyURL, src => src.MapFrom(y => !string.IsNullOrEmpty(y.SoftCopyURL) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.SoftCopyURL.Trim())) : string.Empty));
                    });
                    IMapper mapper = config.CreateMapper();
                    result.TenderMasterData = mapper.Map(objData, result.TenderMasterData);

                    //child Data
                    config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblJAN_TenderMapping, TenderMappingModel>()
                          .ForMember(des => des.PDFUrl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.PDFUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.PDFUrl.Trim())) : string.Empty));
                    });
                    mapper = config.CreateMapper();
                    result.TenderMappingList = mapper.Map(objDataList, result.TenderMappingList);
                }
                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("tender master Detail ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master Detail ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("tender master Detail ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<TenderDetailModel>(null, MessageStatus.Error, false);
            }
        }

    
        public ServiceResponse<PagedData<DiprTenderMasterModel>> GetAllTendorData(IndexModel model)
            {
            ServiceResponse<PagedData<DiprTenderMasterModel>> objReturn = new ServiceResponse<PagedData<DiprTenderMasterModel>>();
            try
                {
                PagedData<DiprTenderMasterModel> resulData = new PagedData<DiprTenderMasterModel>();

                int dptCode = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["DepartmentCode"].ToString()) : 0) : 0;

                int tendorID = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("ID") ? Convert.ToInt32(model.AdvanceSearchModel["ID"].ToString()) : 0) : 0;

                PagedData<vwJAN_TenderMaster> data = GenericGridCall<vwJAN_TenderMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false && (dptCode > 0 ? (x.DepartmentCode.HasValue && x.DepartmentCode == dptCode) : true) && (tendorID > 0 ? (x.Code.HasValue && x.Code == tendorID) : true), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var dep = data.Data.Select(x => x.Id.ToString()).ToList();


                //todo  For child Record
                List<tblJAN_TenderMapping> objChildDataList = _uow.GenericRepository<tblJAN_TenderMapping>().GetAll(filter: x => dep.Contains((x.TenderId.ToString()))).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_TenderMaster, DiprTenderMasterModel>()
                     .ForMember(des => des.SoftCopyURL, src => src.MapFrom(x => !string.IsNullOrEmpty(x.SoftCopyURL) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.SoftCopyURL))) : string.Empty))
                      .ForMember(des => des.TenderMappingList, src => src.MapFrom(x =>
                      objChildDataList.Where(c => c.TenderId == x.Id).Select(item => new TenderMappingModel {

                          PDFUrl = CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(item.PDFUrl)),
                          //PDFUrl = item.PDFUrl,
                          Description = item.Description,
                          Date = item.Date,
                          Id = item.Id,
                          TenderId = Convert.ToInt32(item.TenderId)

                          }).ToList()
                      ));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<DiprTenderMasterModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
                }
            catch (Exception ex)
                {
                objReturn = SetResultStatus<PagedData<DiprTenderMasterModel>>(null, MessageStatus.Error, false);
                }
            return objReturn;
            }

        #endregion

        #region Child Data(Update Progress)

        /// <summary>
        /// Update tender progress
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateTenderProgress(TenderMappingModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<TenderMappingModel, tblJAN_TenderMapping>()
                    .ForMember(dest => dest.PDFUrl, opt => opt.MapFrom(src => string.Empty));
                });
                tblJAN_TenderMapping data = Mapper.Map<TenderMappingModel, tblJAN_TenderMapping>(model);
                if (!string.IsNullOrEmpty(model.PDFUrl))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.PDFUrl, true, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        data.PDFUrl = CommonUtility.UploadTenderFile(model.PDFUrl, model.TenderId, true);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                await _uow.GenericRepository<tblJAN_TenderMapping>().AddAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("tender Update Progress Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("tender Update Progress Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("tender Update Progress Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// modified tender progress
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> ModifyTenderProgress(TenderMappingModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblJAN_TenderMapping objData = await _uow.GenericRepository<tblJAN_TenderMapping>().GetByIdAsync(model.Id);
                if (!string.IsNullOrEmpty(model.PDFUrl))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.PDFUrl, true, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        model.PDFUrl = CommonUtility.UploadTenderFile(model.PDFUrl, model.TenderId, true, objData.PDFUrl);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
             
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<TenderMappingModel, tblJAN_TenderMapping>();
                });
                IMapper mapper = config.CreateMapper();
                objData = mapper.Map(model, objData);

                await _uow.GenericRepository<tblJAN_TenderMapping>().UpdateAsync(objData);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("tender modify Progress Edit ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("tender modify Progress Edit ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("tender modify Progress Edit ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Tender Progress record by id of tender master
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<TenderMappingModel>> GetTenderProgressById(long id)
        {
            try
            {
                TenderMappingModel result = new TenderMappingModel();
                tblJAN_TenderMapping objData = await _uow.GenericRepository<tblJAN_TenderMapping>().GetByIdAsync(id);
                if (objData != null)
                {
                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<tblJAN_TenderMapping, TenderMappingModel>()
                          .ForMember(des => des.PDFUrl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.PDFUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.PDFUrl.Trim())) : string.Empty));
                    });
                    IMapper mapper = config.CreateMapper();
                    result = mapper.Map(objData, result);
                }
                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("Tender Progress GetById ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("Tender Progress GetById ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("Tender Progress GetById ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<TenderMappingModel>(null, MessageStatus.Error, false);
            }

        }

        #endregion
    }
}
