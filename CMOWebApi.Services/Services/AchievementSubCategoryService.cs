using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;

namespace CMOWebApi.Services.Services
{
    public class AchievementSubCategoryService : BaseService, IAchievementSubCategoryService
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///
        public AchievementSubCategoryService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        public async Task<ServiceResponse<string>> Create(AdvAchievementSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<AdvAchievementSubCategoryMasterModel, tblADV_AchievementSubCategoryMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                    .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                    .ForMember(dest => dest.ImagePath, opt => opt.MapFrom(src => string.Empty));
                });
                tblADV_AchievementSubCategoryMaster data = Mapper.Map<AdvAchievementSubCategoryMasterModel, tblADV_AchievementSubCategoryMaster>(model);

                data = await _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().AddAsync(data);
                _uow.save();

                if (!string.IsNullOrEmpty(model.ImagePath))
                {
                    data.ImagePath = CommonUtility.UploadAchievementMaster(model.ImagePath, data.SubCategoryId, true, false);
                }

                data.SubCategoryCode = Convert.ToInt32(data.SubCategoryId);
                data = await _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().UpdateAsync(data);
                _uow.save();

                objReturn = SetResultStatus(data.SubCategoryId.ToString(), MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public async Task<ServiceResponse<string>> Edit(AdvAchievementSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.SubCategoryId > 0)
                {
                    tblADV_AchievementSubCategoryMaster objResult = await _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetByIdAsync(model.SubCategoryId);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<AdvAchievementSubCategoryMasterModel, tblADV_AchievementSubCategoryMaster>()
                            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedBy.ToString()) ? model.CreatedBy : objResult.CreatedBy))
                            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => string.IsNullOrEmpty(objResult.CreatedDate.ToString()) ? DateTime.Now : objResult.CreatedDate))
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => objResult.IsActive))
                            .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => objResult.IsDeleted))
                            .ForMember(dest => dest.ImagePath, opt => opt.MapFrom(src => string.IsNullOrEmpty(model.ImagePath) ? CommonUtility.RemoveExistingFile(objResult.ImagePath, true) ? "" : "" : CommonUtility.UploadAchievementMaster(model.ImagePath, model.SubCategoryId, false, false, objResult.ImagePath)));

                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().UpdateAsync(objResult);
                        _uow.save();

                        objReturn = SetResultStatus(objResult.SubCategoryId.ToString(), MessageStatus.Update, true);
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


        public ServiceResponse<PagedData<AdvAchievementSubCategoryMasterViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<AdvAchievementSubCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<AdvAchievementSubCategoryMasterViewModel>>();
            try
            {
                
                PagedData<AdvAchievementSubCategoryMasterViewModel> resulData = new PagedData<AdvAchievementSubCategoryMasterViewModel>();
                PagedData<vwADV_AchievementSubCategoryMaster> data = GenericGridCall<vwADV_AchievementSubCategoryMaster>.ListView(model.PageSize, x => x.Title, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwADV_AchievementSubCategoryMaster, AdvAchievementSubCategoryMasterViewModel>()
                    .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));

                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<AdvAchievementSubCategoryMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<AdvAchievementSubCategoryMasterViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<AdvAchievementSubCategoryMasterViewModel> GetById(long id)
        {
            ServiceResponse<AdvAchievementSubCategoryMasterViewModel> objReturn = new ServiceResponse<AdvAchievementSubCategoryMasterViewModel>();
            try
            {
                vwADV_AchievementSubCategoryMaster resultData = _uow.GenericRepository<vwADV_AchievementSubCategoryMaster>().GetAll(filter: x => x.SubCategoryId == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwADV_AchievementSubCategoryMaster, AdvAchievementSubCategoryMasterViewModel>()
                         .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));

                    });
                    objReturn.Data = Mapper.Map<vwADV_AchievementSubCategoryMaster, AdvAchievementSubCategoryMasterViewModel>(resultData);

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
                    tblADV_AchievementSubCategoryMaster objResult = await _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().UpdateAsync(objResult);
                        _uow.save();
                        objReturn = SetResultStatus(objResult.SubCategoryId.ToString(), MessageStatus.StatusUpdate, true);
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
                    tblADV_AchievementSubCategoryMaster objResult = await _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsDeleted = !objResult.IsDeleted;
                        await _uow.GenericRepository<tblADV_AchievementSubCategoryMaster>().UpdateAsync(objResult);
                        _uow.save();
                        objReturn = SetResultStatus(objResult.SubCategoryId.ToString(), MessageStatus.StatusUpdate, true);
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
