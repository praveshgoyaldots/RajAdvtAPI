using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.CommonModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.NewsModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data.Entity.Core.Objects;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class NewspaperService : BaseService, INewspaperService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// constructor  ///
        public NewspaperService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        /// <summary>
        /// Get all newspaper list
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<NewspaperViewModal>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<NewspaperViewModal> resulData = new PagedData<NewspaperViewModal>();
                PagedData<vw_JAN_News_NewspaperTransactionrDetails> data = GenericGridCall<vw_JAN_News_NewspaperTransactionrDetails>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_JAN_News_NewspaperTransactionrDetails, NewspaperViewModal>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);

                PagedData<NewspaperViewModal>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<NewspaperViewModal>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Add new newspaper
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(NewspaperModal model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<NewspaperModal, tblJAN_News_NewspaperTransaction>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_News_NewspaperTransaction data = Mapper.Map<NewspaperModal, tblJAN_News_NewspaperTransaction>(model);

                data = await _uow.GenericRepository<tblJAN_News_NewspaperTransaction>().AddAsync(data);
                _uow.save();

                //Chairperson List
                if (model.ChairpersonList != null && model.ChairpersonList.Count > 0)
                {
                    foreach (var item in model.ChairpersonList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_News_NewspaperChairpersonMapping objChild = new tblJAN_News_NewspaperChairpersonMapping();
                            objChild.ChairpersonCode = Convert.ToInt64(item);
                            objChild.NewspaperTransId = data.Id;
                            _uow.GenericRepository<tblJAN_News_NewspaperChairpersonMapping>().Add(objChild);
                        }
                    }
                }
                //Nodal Department List
                if (model.NodalDepartmentCodes != null && model.NodalDepartmentCodes.Count > 0)
                {
                    foreach (var item in model.NodalDepartmentCodes)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_News_NewsTransactionNodalDepartmentMapping objChild = new tblJAN_News_NewsTransactionNodalDepartmentMapping();
                            objChild.DepartmentCode = Convert.ToInt32(item);
                            objChild.NewsTransactionId = data.Id;
                            _uow.GenericRepository<tblJAN_News_NewsTransactionNodalDepartmentMapping>().Add(objChild);
                        }
                    }
                }

                data.Code = data.Id;
                data = await _uow.GenericRepository<tblJAN_News_NewspaperTransaction>().UpdateAsync(data);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update existing newspaper
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(NewspaperModal model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_News_NewspaperTransaction objResult = await _uow.GenericRepository<tblJAN_News_NewspaperTransaction>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<NewspaperModal, tblJAN_News_NewspaperTransaction>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblJAN_News_NewspaperTransaction>().UpdateAsync(objResult);

                        //  Delete existing Chairperson for this Id
                        if (objResult.tblJAN_News_NewspaperChairpersonMapping.Count > 0)
                        {
                            _uow.GenericRepository<tblJAN_News_NewspaperChairpersonMapping>().DeleteAllById(objResult.tblJAN_News_NewspaperChairpersonMapping.ToList());
                        }
                        //  Delete existing Nodal Department for this Id
                        if (objResult.tblJAN_News_NewsTransactionNodalDepartmentMapping.Count > 0)
                        {
                            _uow.GenericRepository<tblJAN_News_NewsTransactionNodalDepartmentMapping>().DeleteAllById(objResult.tblJAN_News_NewsTransactionNodalDepartmentMapping.ToList());
                        }
                        //Chairperson List
                        if (model.ChairpersonList != null && model.ChairpersonList.Count > 0)
                        {
                            foreach (var item in model.ChairpersonList)
                            {
                                if (!string.IsNullOrEmpty(item))
                                {
                                    tblJAN_News_NewspaperChairpersonMapping objChild = new tblJAN_News_NewspaperChairpersonMapping();
                                    objChild.ChairpersonCode = Convert.ToInt64(item);
                                    objChild.NewspaperTransId = objResult.Id;
                                    _uow.GenericRepository<tblJAN_News_NewspaperChairpersonMapping>().Add(objChild);
                                }
                            }
                        }
                        //Nodal Department List
                        if (model.NodalDepartmentCodes != null && model.NodalDepartmentCodes.Count > 0)
                        {
                            foreach (var item in model.NodalDepartmentCodes)
                            {
                                if (!string.IsNullOrEmpty(item))
                                {
                                    tblJAN_News_NewsTransactionNodalDepartmentMapping objChild = new tblJAN_News_NewsTransactionNodalDepartmentMapping();
                                    objChild.DepartmentCode = Convert.ToInt32(item);
                                    objChild.NewsTransactionId = objResult.Id;
                                    _uow.GenericRepository<tblJAN_News_NewsTransactionNodalDepartmentMapping>().Add(objChild);
                                }
                            }
                        }

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
        /// get newspaper by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<NewspaperModal> GetById(long id)
        {
            ServiceResponse<NewspaperModal> objReturn = new ServiceResponse<NewspaperModal>();
            try
            {
                tblJAN_News_NewspaperTransaction resultData = _uow.GenericRepository<tblJAN_News_NewspaperTransaction>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_News_NewspaperTransaction, NewspaperModal>()
                       .ForMember(des => des.ChairpersonList, src => src.MapFrom(y => y.tblJAN_News_NewspaperChairpersonMapping != null ? y.tblJAN_News_NewspaperChairpersonMapping.Select(z => Convert.ToString(z.ChairpersonCode)).ToList() : null))
                        .ForMember(des => des.NodalDepartmentCodes, src => src.MapFrom(y => y.tblJAN_News_NewsTransactionNodalDepartmentMapping != null ? y.tblJAN_News_NewsTransactionNodalDepartmentMapping.Select(z => Convert.ToString(z.DepartmentCode)).ToList() : null));
                    });
                    objReturn.Data = Mapper.Map<tblJAN_News_NewspaperTransaction, NewspaperModal>(resultData);
                    if (objReturn.Data.ChairpersonList != null && objReturn.Data.ChairpersonList.Count > 0)
                    {
                        objReturn.Data.ChairpersonCategoryCodes = _uow.GenericRepository<tblVCParticipantMaster>().GetAll(filter: x => objReturn.Data.ChairpersonList.Contains(x.Code.ToString())).Select(y => Convert.ToString(y.ParticipantCategoryId)).ToList();
                    }
                    if (objReturn.Data.NodalDepartmentCodes != null && objReturn.Data.NodalDepartmentCodes.Count > 0)
                    {
                        objReturn.Data.AdminDepartmentCodes = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter: x => objReturn.Data.NodalDepartmentCodes.Contains(x.DepartmentCode.ToString())).Select(y => Convert.ToString(y.Department_AdmDepartmentCode)).ToList();
                    }
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
                    tblJAN_News_NewspaperTransaction objResult = _uow.GenericRepository<tblJAN_News_NewspaperTransaction>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_News_NewspaperTransaction>().UpdateAsync(objResult);
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
        /// Get Newspaper Transaction Detail With Progress List by Transaction Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<NewspaperTransactionDetailViewModel> GetNewspaperTransactionDetailWithProgressList(long id, bool isBase64File = true)
        {
            try
            {
                NewspaperTransactionDetailViewModel responsedata = new NewspaperTransactionDetailViewModel();


                sp_JAN_News_NewspaperTransactionDetail_Result objTransaction = new sp_JAN_News_NewspaperTransactionDetail_Result();
                List<JAN_News_NewspaperTransactionProgressList_Result> objProgressList = new List<JAN_News_NewspaperTransactionProgressList_Result>();

                List<ObjectParameter> spParams = new List<ObjectParameter>();
                spParams.Add(new ObjectParameter("NewsTransactionId", id > 0 ? id : 0));


                ObjectResult<sp_JAN_News_NewspaperTransactionDetail_Result> spResult = _uow.ExeccuteStoreProcedureMultiResult<sp_JAN_News_NewspaperTransactionDetail_Result>("sp_JAN_News_NewspaperTransactionDetail", spParams.ToArray());

                objTransaction = spResult.FirstOrDefault();

                ObjectResult<JAN_News_NewspaperTransactionProgressList_Result> objProgressListResult = spResult.GetNextResult<JAN_News_NewspaperTransactionProgressList_Result>();
                objProgressList.AddRange(objProgressListResult.OrderByDescending(x => x.ModifiedDate
                ).ToList());

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<JAN_News_NewspaperTransactionProgressList_Result, NewspaperTransactionProgressListModel>().AfterMap((src, dest) =>
                    {
                        dest.PDF = !string.IsNullOrEmpty(src.PDF) ? isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(src.PDF.Trim())) : src.PDF.ToAbsolutePath() : string.Empty;
                        dest.AttachmentImages = !string.IsNullOrEmpty(src.AttachmentURLs) ? (src.AttachmentURLs.Split(',').Length > 0 ?
                    src.AttachmentURLs.Split(',')
                .Select(x => !string.IsNullOrEmpty(x) ? isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Trim())) : x.ToAbsolutePath() : "").ToList()
                            : null) : null;
                    });
                });

                IMapper mapper = config.CreateMapper();
                responsedata.ProgressList = mapper.Map(objProgressList, responsedata.ProgressList);

                config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_News_NewspaperTransactionDetail_Result, NewspaperTransactionDetailModel>();
                });
                mapper = config.CreateMapper();
                responsedata.TransactionModel = mapper.Map(objTransaction, responsedata.TransactionModel);

                return SetResultStatus(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<NewspaperTransactionDetailViewModel>(null, MessageStatus.Error, false, ex.InnerException.Message);
            }
        }

        #endregion

        #region Update Progress

        /// <summary>
        /// Update news progress
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateNewsProgress(NewspaperProgressMappingModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            List<tblJAN_News_NewspaperCoverageTypes> objCoverage = new List<tblJAN_News_NewspaperCoverageTypes>();
            List<tblJAN_News_NewspaperProgressAttachments> objAttchment = new List<tblJAN_News_NewspaperProgressAttachments>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<NewspaperProgressMappingModel, tblJAN_News_NewspaperProgressMapping>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_News_NewspaperProgressMapping data = Mapper.Map<NewspaperProgressMappingModel, tblJAN_News_NewspaperProgressMapping>(model);
                if (!string.IsNullOrEmpty(model.PDF))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.PDF, true, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        data.PDF = CommonUtility.GenerateNewsModuleFolderAndName(model.PDF, model.NewspaperTransId);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }
                await _uow.GenericRepository<tblJAN_News_NewspaperProgressMapping>().AddAsync(data);

                //Attached Images
                if (model.Images != null && model.Images.Count > 0)
                {

                    foreach (var item in model.Images)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_News_NewspaperProgressAttachments objChild = new tblJAN_News_NewspaperProgressAttachments();
                            if (!string.IsNullOrEmpty(item))
                            {
                                var isValid = CommonUtility.IsAllowedMimeType(item, false, _loginUserDetail.FileSize);
                                if (isValid.IsSuccess)
                                {
                                    objChild.Path = CommonUtility.GenerateNewsModuleFolderAndName(item, model.NewspaperTransId);
                                }
                            }
                            objChild.NewsProgressId = data.Id;
                            objAttchment.Add(objChild);
                        }
                    }
                    data.tblJAN_News_NewspaperProgressAttachments = objAttchment;
                }

                //Coverage Type
                if (model.CoverageTypes != null && model.CoverageTypes.Count > 0)
                {
                    foreach (var item in model.CoverageTypes)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_News_NewspaperCoverageTypes objChild = new tblJAN_News_NewspaperCoverageTypes();
                            objChild.CoverageTypeCode = Convert.ToInt32(item);
                            objChild.NewsProgressId = data.Id;
                            objCoverage.Add(objChild);
                        }
                    }
                    data.tblJAN_News_NewspaperCoverageTypes = objCoverage;
                }
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Edit existing news progress record by id
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> EditNewsProgress(NewspaperProgressMappingModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblJAN_News_NewspaperProgressMapping objResult = await _uow.GenericRepository<tblJAN_News_NewspaperProgressMapping>().GetByIdAsync(model.Id);

                if (!string.IsNullOrEmpty(model.PDF))
                {
                    var isValidPdf = CommonUtility.IsAllowedMimeType(model.PDF, true, _loginUserDetail.FileSize);
                    if (isValidPdf.IsSuccess)
                    {
                        model.PDF = CommonUtility.GenerateNewsModuleFolderAndName(model.PDF, model.NewspaperTransId, objResult.PDF);
                    }
                    else
                    {
                        return isValidPdf;
                    }
                }

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<NewspaperProgressMappingModel, tblJAN_News_NewspaperProgressMapping>()
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                IMapper mapper = config.CreateMapper();
                objResult = mapper.Map(model, objResult);
                await _uow.GenericRepository<tblJAN_News_NewspaperProgressMapping>().UpdateAsync(objResult);

                //  Delete existing coverage for this Id
                if (objResult.tblJAN_News_NewspaperCoverageTypes.Count > 0)
                {
                    _uow.GenericRepository<tblJAN_News_NewspaperCoverageTypes>().DeleteAllById(objResult.tblJAN_News_NewspaperCoverageTypes.ToList());
                }
                //  Delete existing Attachment for this Id
                if (objResult.tblJAN_News_NewspaperProgressAttachments.Count > 0)
                {
                    foreach (var item in objResult.tblJAN_News_NewspaperProgressAttachments)
                    {
                        CommonUtility.DeleteExistingFile(HttpContext.Current.Server.MapPath(item.Path));
                    }
                    _uow.GenericRepository<tblJAN_News_NewspaperProgressAttachments>().DeleteAllById(objResult.tblJAN_News_NewspaperProgressAttachments.ToList());
                }


                await _uow.GenericRepository<tblJAN_News_NewspaperProgressMapping>().UpdateAsync(objResult);

                //Attached Images
                if (model.Images != null && model.Images.Count > 0)
                {

                    foreach (var item in model.Images)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_News_NewspaperProgressAttachments objChild = new tblJAN_News_NewspaperProgressAttachments();
                            if (!string.IsNullOrEmpty(item))
                            {
                                var isValid = CommonUtility.IsAllowedMimeType(item, false, _loginUserDetail.FileSize);
                                if (isValid.IsSuccess)
                                {
                                    objChild.Path = CommonUtility.GenerateNewsModuleFolderAndName(item, model.NewspaperTransId);
                                }
                            }
                            objChild.NewsProgressId = objResult.Id;
                            await _uow.GenericRepository<tblJAN_News_NewspaperProgressAttachments>().AddAsync(objChild);
                        }
                    }
                }

                //Coverage Type
                if (model.CoverageTypes != null && model.CoverageTypes.Count > 0)
                {
                    foreach (var item in model.CoverageTypes)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblJAN_News_NewspaperCoverageTypes objChild = new tblJAN_News_NewspaperCoverageTypes();
                            objChild.CoverageTypeCode = Convert.ToInt32(item);
                            objChild.NewsProgressId = objResult.Id;
                            await _uow.GenericRepository<tblJAN_News_NewspaperCoverageTypes>().AddAsync(objChild);
                        }
                    }
                }
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get News Progress by Id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<NewspaperProgressMappingModel> GetNewsProgressById(long id)
        {
            ServiceResponse<NewspaperProgressMappingModel> objReturn = new ServiceResponse<NewspaperProgressMappingModel>();
            try
            {
                tblJAN_News_NewspaperProgressMapping resultData = _uow.GenericRepository<tblJAN_News_NewspaperProgressMapping>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_News_NewspaperProgressMapping, NewspaperProgressMappingModel>()
                       .ForMember(des => des.CoverageTypes, src => src.MapFrom(y => y.tblJAN_News_NewspaperCoverageTypes != null ? y.tblJAN_News_NewspaperCoverageTypes.Select(z => Convert.ToString(z.CoverageTypeCode)).ToList() : null))
                        .ForMember(des => des.PDF, src => src.MapFrom(y => !string.IsNullOrEmpty(y.PDF) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.PDF.Trim())) : string.Empty
                        ))
                       .ForMember(des => des.Images, src => src.MapFrom(y => y.tblJAN_News_NewspaperProgressAttachments != null ? y.tblJAN_News_NewspaperProgressAttachments.Select(z => !string.IsNullOrEmpty(z.Path) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(z.Path.Trim())) : "").ToList() : null));
                    });
                    objReturn.Data = Mapper.Map<tblJAN_News_NewspaperProgressMapping, NewspaperProgressMappingModel>(resultData);

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
        /// get newspaper short detail by Id for progress screen
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<NewspaperViewModal> GetNewspaperShortDetailById(long id)
        {
            ServiceResponse<NewspaperViewModal> objReturn = new ServiceResponse<NewspaperViewModal>();
            try
            {
                vw_JAN_News_NewspaperTransactionrDetails resultData = _uow.GenericRepository<vw_JAN_News_NewspaperTransactionrDetails>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vw_JAN_News_NewspaperTransactionrDetails, NewspaperViewModal>();
                    });
                    objReturn.Data = Mapper.Map<vw_JAN_News_NewspaperTransactionrDetails, NewspaperViewModal>(resultData);

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
        #region Front 
        public ServiceResponse<PagedData<NewsProgressListViewModel>> GetAllNewsProgressListByFilter(NewsProgressSearchModel model, bool isAllRecords = false, bool isBase64File = true)

        {
            ServiceResponse<PagedData<NewsProgressListViewModel>> objReturn = new ServiceResponse<PagedData<NewsProgressListViewModel>>();
            try
            {
                PagedData<NewsProgressListViewModel> responsedata = new PagedData<NewsProgressListViewModel>();
                object[] @sp_params = new object[16];
                @sp_params[0] = model.AdmDepartmentCode;
                @sp_params[1] = model.DepartmentCode;
                @sp_params[2] = model.SubjectCode;
                @sp_params[3] = string.IsNullOrEmpty(model.FromDate) ? string.Empty : Convert.ToDateTime(model.FromDate).ToString("MM-dd-yyyy");
                @sp_params[4] = string.IsNullOrEmpty(model.ToDate) ? string.Empty : Convert.ToDateTime(model.ToDate).ToString("MM-dd-yyyy");

                @sp_params[5] = model.PublicationTypeCode;
                @sp_params[6] = model.NewspaperCode;
                @sp_params[7] = model.CoverageTypeCode;
                @sp_params[8] = string.IsNullOrEmpty(model.KeywordSearch) ? string.Empty : model.KeywordSearch;
                @sp_params[9] = model.IsVisibleToPublic.HasValue ? model.IsVisibleToPublic : (object)null;
                @sp_params[10] = model.ProgressIsVisibleToPublic.HasValue ? model.ProgressIsVisibleToPublic : (object)null;
                @sp_params[11] = model.IsActive.HasValue ? model.IsActive : (object)null;

                @sp_params[12] = isAllRecords ? 1 : model != null && model.IndexModel != null && model.IndexModel.Page > 0 ? model.IndexModel.Page : 1;
                @sp_params[13] = isAllRecords ? 101 : model != null && model.IndexModel != null && model.IndexModel.PageSize > 0 ? model.IndexModel.PageSize : 101;
                @sp_params[14] = string.IsNullOrEmpty(model.IndexModel.OrderBy) ? string.Empty : model.IndexModel.OrderBy.Trim();
                @sp_params[15] = model.IndexModel.OrderByAsc > 0 ? true : false;


                PagedData<sp_NEWS_GetNewsProgressListByFilter_Result> objresult = GenericGridCall<sp_NEWS_GetNewsProgressListByFilter_Result>.SPListView(@sp_params, model.IndexModel.PageSize, x => !string.IsNullOrEmpty(model.IndexModel.OrderBy) ? null : x.Date, null, model.IndexModel.Search, model.IndexModel.OrderBy, model.IndexModel.OrderByAsc, model.IndexModel.Page, true, true);
                List<string> progressIds = objresult.Data.Select(item => item.ProgressID.ToString()).ToList();
                List<tblJAN_News_NewspaperProgressAttachments> attachfiles = _uow.GenericRepository<tblJAN_News_NewspaperProgressAttachments>().GetAll(filter: x => progressIds.Contains(x.NewsProgressId.ToString())).ToList();
                var mapper = new MapperConfiguration(cfg => cfg.CreateMap<sp_NEWS_GetNewsProgressListByFilter_Result, NewsProgressListViewModel>()

                  .AfterMap((src, dest) =>
                  {
                      dest.PDF = !string.IsNullOrEmpty(src.PDF) ? isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(src.PDF.Trim())) : src.PDF.Trim().ToAbsolutePath() : string.Empty;
                      dest.DateHindi = src.Date.HasValue ? src.Date.Value.ToHindiDate("dd-MMM-yyyy") : string.Empty;
                      dest.ProgressDateHindi = src.ProgressDate.HasValue ? src.ProgressDate.Value.ToHindiDate("dd-MMM-yyyy") : string.Empty;
                      //dest.Images = _uow.GenericRepository<tblJAN_News_NewspaperProgressAttachments>().GetAll(filter: x => x.NewsProgressId.Value == src.ProgressID).Select(x => isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Path)) : x.Path.ToAbsolutePath()).ToList();

                      dest.Images = attachfiles.Where(x => x.NewsProgressId == src.ProgressID).Select(x => isBase64File ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.Path)) : x.Path.ToAbsolutePath()).ToList();

                  })).CreateMapper();
                responsedata.Data = mapper.Map(objresult.Data, responsedata.Data);


                PagedData<NewsProgressListViewModel>.ReturnCustomizeData(responsedata, isAllRecords ? 101 : model.IndexModel.PageSize, (objresult != null && objresult.Data.Count() > 0 ? objresult.Data.FirstOrDefault().TotalRecords : 0), page: model.IndexModel.Page);


                objReturn = SetResultStatus(responsedata, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<NewsProgressListViewModel>>(null, MessageStatus.Error, false, ex.InnerException != null ? ex.InnerException.ToString() : ex.Message);
            }
            return objReturn;
        }

        #endregion
    }
}
