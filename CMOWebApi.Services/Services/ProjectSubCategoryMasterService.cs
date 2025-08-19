using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Linq;
using System.Threading.Tasks;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
    public class ProjectSubCategoryMasterService : BaseService, IProjectSubCategoryMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///

        public ProjectSubCategoryMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region /// Methods ///

        /// <summary>
        /// Craete new project sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(ProjectSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ProjectSubCategoryMasterModel, tblJAN_PROJ_ProjectSub_CategoryMaster>()
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                     .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                      .ForMember(dest => dest.IsDeleted, opt => opt.MapFrom(src => false))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_PROJ_ProjectSub_CategoryMaster data = Mapper.Map<ProjectSubCategoryMasterModel, tblJAN_PROJ_ProjectSub_CategoryMaster>(model);

                data = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().UpdateAsync(data);
                _uow.save();

                objReturn = SetResultStatus(data.Id.ToString(), MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Update existing project sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(ProjectSubCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_PROJ_ProjectSub_CategoryMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<ProjectSubCategoryMasterModel, tblJAN_PROJ_ProjectSub_CategoryMaster>()
                             .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                             .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().UpdateAsync(objResult);
                        _uow.save();

                        objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.Update, true);
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

        /// <summary>
        /// Get all project sub category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<ProjectSubCategoryMasterViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<ProjectSubCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<ProjectSubCategoryMasterViewModel>>();
            try
            {
                PagedData<ProjectSubCategoryMasterViewModel> resulData = new PagedData<ProjectSubCategoryMasterViewModel>();
                PagedData<vwJAN_PROJ_ProjectSub_CategoryMaster> data = GenericGridCall<vwJAN_PROJ_ProjectSub_CategoryMaster>.ListView(model.PageSize, x => x.CategoryName, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_PROJ_ProjectSub_CategoryMaster, ProjectSubCategoryMasterViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<ProjectSubCategoryMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<ProjectSubCategoryMasterViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Project sub category  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ProjectSubCategoryMasterModel> GetById(long id)
        {
            ServiceResponse<ProjectSubCategoryMasterModel> objReturn = new ServiceResponse<ProjectSubCategoryMasterModel>();
            try
            {
                tblJAN_PROJ_ProjectSub_CategoryMaster resultData = _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_PROJ_ProjectSub_CategoryMaster, ProjectSubCategoryMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblJAN_PROJ_ProjectSub_CategoryMaster, ProjectSubCategoryMasterModel>(resultData);
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
        /// Update Status(Active/De-Active)
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
                    tblJAN_PROJ_ProjectSub_CategoryMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().UpdateAsync(objResult);
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
        /// Project sub category  by Category Code
        /// </summary>
        /// <param name="catCode"></param>
        /// <returns></returns>
        public ServiceResponse<ProjectSubCategoryMasterModel> GetProjectSubCategoryByCategoryCode(long catCode)
        {
            ServiceResponse<ProjectSubCategoryMasterModel> objReturn = new ServiceResponse<ProjectSubCategoryMasterModel>();
            try
            {
                tblJAN_PROJ_ProjectSub_CategoryMaster resultData = _uow.GenericRepository<tblJAN_PROJ_ProjectSub_CategoryMaster>().GetAll(filter: x => x.CategoryCode == catCode).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_PROJ_ProjectSub_CategoryMaster, ProjectSubCategoryMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblJAN_PROJ_ProjectSub_CategoryMaster, ProjectSubCategoryMasterModel>(resultData);
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
        /// For delete record by super admin only.
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> ProjectSubCategoryDelete(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            var userSADM = UserTypeEnum.SADM.GetStringValue();
            try
            {
                if (_loginUserDetail.UserType == userSADM)
                {
                    if (id > 0)
                    {
                        tblJAN_PROJ_ProjectSub_SubCategoryMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().GetByIdAsync(id);
                        if (objResult != null)
                        {
                            objResult.IsDeleted = true;
                            await _uow.GenericRepository<tblJAN_PROJ_ProjectSub_SubCategoryMaster>().UpdateAsync(objResult);
                            _uow.save();
                            objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.Delete, true);
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
                else
                {
                    objReturn.Data = null;
                    objReturn = SetResultStatus(objReturn.Data, MessageStatus.UnthothorizedForActivity, false);
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
