using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class ProjectSchemeCategoryMasterService : BaseService, IProjectSchemeCategoryMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;

        #endregion

        #region /// Cunstroctor  ///

        public ProjectSchemeCategoryMasterService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _uow = uow;
            _userManagementService = userManagementService;
        }

        #endregion

        #region /// Methods ///

        /// <summary>
        /// Craete new project scheme category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(ProjectSchemeCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ProjectSchemeCategoryMasterModel, tblJAN_PROJ_ProjectSchemeCategoryMaster>()
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblJAN_PROJ_ProjectSchemeCategoryMaster data = Mapper.Map<ProjectSchemeCategoryMasterModel, tblJAN_PROJ_ProjectSchemeCategoryMaster>(model);

                data = await _uow.GenericRepository<tblJAN_PROJ_ProjectSchemeCategoryMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblJAN_PROJ_ProjectSchemeCategoryMaster>().UpdateAsync(data);
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
        /// Update existing project scheme category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(ProjectSchemeCategoryMasterModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblJAN_PROJ_ProjectSchemeCategoryMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSchemeCategoryMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<ProjectSchemeCategoryMasterModel, tblJAN_PROJ_ProjectSchemeCategoryMaster>()
                             .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                             .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSchemeCategoryMaster>().UpdateAsync(objResult);
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
        /// Get all project scheme category 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<ProjectSchemeCategoryMasterViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<ProjectSchemeCategoryMasterViewModel>> objReturn = new ServiceResponse<PagedData<ProjectSchemeCategoryMasterViewModel>>();
            try
            {
                PagedData<ProjectSchemeCategoryMasterViewModel> resulData = new PagedData<ProjectSchemeCategoryMasterViewModel>();

                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vwJAN_PROJ_ProjectSchemeCategoryMaster> data = GenericGridCall<vwJAN_PROJ_ProjectSchemeCategoryMaster>.ListView(model.PageSize, x => x.DepartmentTitle, x => x.IsDeleted == false && depIds.Contains(x.NodalDepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_PROJ_ProjectSchemeCategoryMaster, ProjectSchemeCategoryMasterViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<ProjectSchemeCategoryMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<ProjectSchemeCategoryMasterViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Project scheme category  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<ProjectSchemeCategoryMasterModel> GetById(long id)
        {
            ServiceResponse<ProjectSchemeCategoryMasterModel> objReturn = new ServiceResponse<ProjectSchemeCategoryMasterModel>();
            try
            {
                tblJAN_PROJ_ProjectSchemeCategoryMaster resultData = _uow.GenericRepository<tblJAN_PROJ_ProjectSchemeCategoryMaster>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_PROJ_ProjectSchemeCategoryMaster, ProjectSchemeCategoryMasterModel>();
                    });
                    objReturn.Data = Mapper.Map<tblJAN_PROJ_ProjectSchemeCategoryMaster, ProjectSchemeCategoryMasterModel>(resultData);
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
                    tblJAN_PROJ_ProjectSchemeCategoryMaster objResult = await _uow.GenericRepository<tblJAN_PROJ_ProjectSchemeCategoryMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_PROJ_ProjectSchemeCategoryMaster>().UpdateAsync(objResult);
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
        /// Check project scheme category with department should be mandatory
        /// </summary>
        /// <param name="name"></param>
        /// <param name="dptCode"></param>
        /// <param name="id"></param>
        /// <returns></returns>
        public Boolean IsProjectSchemeExist(string name, int? dptCode, long id = 0)
        {
            try
            {
                List<tblJAN_PROJ_ProjectSchemeCategoryMaster> obj = _uow.GenericRepository<tblJAN_PROJ_ProjectSchemeCategoryMaster>().GetAll(filter: x => x.ProgramSchemeName.Trim().ToLower().Replace(" ", string.Empty) == name.Trim().ToLower().Replace(" ", string.Empty) && x.IsDeleted == false && x.NodalDepartmentCode==dptCode && (id > 0 ? x.Id != id : true)).ToList();
                return obj.Count > 0 ? true : false;
            }
            catch
            {
                return true;
            }
        }

        #endregion
    }
}
