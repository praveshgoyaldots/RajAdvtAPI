using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
    {
  public  class ImportantDecisionSubCategoryService :BaseService, IImportantDecisionSubcategoryService
        
        {


        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///
        public ImportantDecisionSubCategoryService(IUnitofWork uow)
            {
            _uow = uow;
            }
        #endregion

        #region Method


        public ServiceResponse<PagedData<ImportantDecisionSubCategoryMasterViewModel>> GetAll(IndexModel model)
            {
            ServiceResponse<PagedData<ImportantDecisionSubCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<ImportantDecisionSubCategoryMasterViewModel>>();
            try
                {
                PagedData<ImportantDecisionSubCategoryMasterViewModel> resulData = new PagedData<ImportantDecisionSubCategoryMasterViewModel>();
                PagedData<vwCMO_importantDecisionSubCategoryMaster> data = GenericGridCall<vwCMO_importantDecisionSubCategoryMaster>.ListView(model.PageSize, x => x.Title, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwCMO_importantDecisionSubCategoryMaster, ImportantDecisionSubCategoryMasterViewModel>()
                    .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));

                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<ImportantDecisionSubCategoryMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
                }
            catch (Exception ex)
                {
                objReturn = SetResultStatus<PagedData<ImportantDecisionSubCategoryMasterViewModel>>(null, MessageStatus.Error, false);
                }
            return objReturn;
            }


        public async Task<ServiceResponse<string>> Create(ImportantDecisionSubCategoryModel model)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ImportantDecisionSubCategoryModel, tblCMO_ImportantDecisionSubcategorymaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                    .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                    .ForMember(dest => dest.ImagePath, opt => opt.MapFrom(src => string.Empty));
                });
                tblCMO_ImportantDecisionSubcategorymaster data = Mapper.Map<ImportantDecisionSubCategoryModel, tblCMO_ImportantDecisionSubcategorymaster>(model);

                data = await _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().AddAsync(data);
                _uow.save();

                if (!string.IsNullOrEmpty(model.ImagePath))
                    {
                    data.ImagePath = CommonUtility.UploadAchievementMaster(model.ImagePath, data.ImpSubCategoryId, true, false);
                    }

                data.SubCategoryCode = Convert.ToInt32(data.ImpSubCategoryId);
                data = await _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().UpdateAsync(data);
                _uow.save();

                objReturn = SetResultStatus(data.ImpSubCategoryId.ToString(), MessageStatus.Save, true);
                }
            catch (Exception ex)
                {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
                }
            return objReturn;
            }

        public async Task<ServiceResponse<string>> Edit(ImportantDecisionSubCategoryModel model)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
                {
                if (model.ImpSubCategoryId > 0)
                    {
                    tblCMO_ImportantDecisionSubcategorymaster objResult = await _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().GetByIdAsync(model.ImpSubCategoryId);
                    if (objResult != null)
                        {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<ImportantDecisionSubCategoryModel, tblCMO_ImportantDecisionSubcategorymaster>()
                            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedBy.ToString()) ? model.CreatedBy : objResult.CreatedBy))
                            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedDate.ToString()) ? DateTime.Now : objResult.CreatedDate))
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => objResult.IsActive))
                            .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => objResult.IsDeleted))
                            .ForMember(dest => dest.ImagePath, opt => opt.MapFrom(src => string.IsNullOrEmpty(model.ImagePath) ? CommonUtility.RemoveExistingFile(objResult.ImagePath, true) ? "" : "" : CommonUtility.UploadAchievementMaster(model.ImagePath, model.ImpSubCategoryId, false, false, objResult.ImagePath)));

                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().UpdateAsync(objResult);
                        _uow.save();

                        objReturn = SetResultStatus(objResult.ImpSubCategoryId.ToString(), MessageStatus.Update, true);
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
            catch (Exception ex)
                {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
                }
            return objReturn;
            }



        public ServiceResponse<ImportantDecisionSubCategoryMasterViewModel> GetById(long id)
            {
            ServiceResponse<ImportantDecisionSubCategoryMasterViewModel> objReturn = new ServiceResponse<ImportantDecisionSubCategoryMasterViewModel>();
            try
                {
				tblCMO_ImportantDecisionSubcategorymaster resultData = _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().GetAll(filter: x => x.ImpSubCategoryId == id).FirstOrDefault();
                if (resultData != null)
                    {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblCMO_ImportantDecisionSubcategorymaster, ImportantDecisionSubCategoryMasterViewModel>()
                         .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));

                    });
                    objReturn.Data = Mapper.Map<tblCMO_ImportantDecisionSubcategorymaster, ImportantDecisionSubCategoryMasterViewModel>(resultData);

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

        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
                {
                if (id > 0)
                    {
                    tblCMO_ImportantDecisionSubcategorymaster objResult = await _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().GetByIdAsync(id);
                    if (objResult != null)
                        {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().UpdateAsync(objResult);
                        _uow.save();
                        objReturn = SetResultStatus(objResult.ImpSubCategoryId.ToString(), MessageStatus.StatusUpdate, true);
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

        public async Task<ServiceResponse<string>> Delete(long id)
            {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
                {
                if (id > 0)
                    {
                    tblCMO_ImportantDecisionSubcategorymaster objResult = await _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().GetByIdAsync(id);
                    if (objResult != null)
                        {
                        objResult.IsDeleted = !objResult.IsDeleted;
                        await _uow.GenericRepository<tblCMO_ImportantDecisionSubcategorymaster>().UpdateAsync(objResult);
                        _uow.save();
                        objReturn = SetResultStatus(objResult.ImpSubCategoryId.ToString(), MessageStatus.StatusUpdate, true);
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
        #endregion
        }
    }
