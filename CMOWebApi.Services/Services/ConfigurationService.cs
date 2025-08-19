using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity.Core.Objects;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class ConfigurationService : BaseService, IConfigurationService
    {

        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///
        public ConfigurationService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region /// Method  ///
        /// <summary>
        /// GetAllData For Configuaration
        /// Value : if ValueType =="UserId" then pass userid and If ValueType == "UserType"
        /// </summary>
        /// <param name="value"> </param>
        /// <param name="valueType"></param>
        /// <param name="deptCode"></param>
        /// <returns>ServiceResponse<ConfigViewModel></returns>
        public ServiceResponse<ConfigViewModel> GetAll(string userType, string configType, long department = 0, int userId = 0)
        {
            ServiceResponse<ConfigViewModel> objReturn = new ServiceResponse<ConfigViewModel>();
            objReturn.Data = new ConfigViewModel();
            try
            {
                List<sp_Configuration_Result> objConfigDeptartment = new List<sp_Configuration_Result>();
                List<sp_ConfigurationSCHEME_Result> objConfigScheme = new List<sp_ConfigurationSCHEME_Result>();
                List<sp_ConfigurationSERVICE_Result> objConfigService = new List<sp_ConfigurationSERVICE_Result>();

                List<ObjectParameter> spParams = new List<ObjectParameter>()
                {
                 new ObjectParameter("UserType",userType)
                ,new ObjectParameter("ConfigType",configType)
                ,new ObjectParameter("Department", department)
                ,new ObjectParameter("UserId", userId) };

             ObjectResult<sp_Configuration_Result> deptResult = _uow.ExeccuteStoreProcedureMultiResult<sp_Configuration_Result>("sp_Configuration", spParams.ToArray());
                objConfigDeptartment.AddRange(deptResult.ToList());
                var schemeResult = deptResult.GetNextResult<sp_ConfigurationSCHEME_Result>();
                objConfigScheme.AddRange(schemeResult.ToList());
                var serviceResult = schemeResult.GetNextResult<sp_ConfigurationSERVICE_Result>();
                objConfigService.AddRange(serviceResult.ToList());
                var config = new MapperConfiguration(x =>
                  {
                      x.CreateMap<sp_Configuration_Result, DepartmentConfigViewModel>();
                      x.CreateMap<sp_ConfigurationSCHEME_Result, SchemeConfigViewModel>();
                      x.CreateMap<sp_ConfigurationSERVICE_Result, ServiceConfigViewModel>();
                  });
                IMapper mapper = config.CreateMapper();
                objReturn.Data.departmentConfig = mapper.Map(objConfigDeptartment, objReturn.Data.departmentConfig);
                objReturn.Data.serviceConfig = mapper.Map(objConfigService, objReturn.Data.serviceConfig);
                objReturn.Data.schemeConfig = mapper.Map(objConfigScheme, objReturn.Data.schemeConfig);
                int? dptPId = 0, scmPId = 0, serPId = 0;
                if (configType.Equals(ConfigurationPermissionEnum.Self.GetStringValue()))
                {
                objReturn.Data.UserType = userType;


                    dptPId = objReturn.Data.departmentConfig != null && objReturn.Data.departmentConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Self.GetStringValue())) == null ? 0 : objReturn.Data.departmentConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Self.GetStringValue())).PermissionId;

                    scmPId = objReturn.Data.schemeConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Self.GetStringValue())) == null ? 0 : objReturn.Data.schemeConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Self.GetStringValue())).PermissionId;

                    serPId = objReturn.Data.serviceConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Self.GetStringValue())) == null ? 0 : objReturn.Data.serviceConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Self.GetStringValue())).PermissionId;
                }
                else if (configType.Equals(ConfigurationPermissionEnum.Assign.GetStringValue()))
                {
                objReturn.Data.UserId = Convert.ToInt32(userId);
                    dptPId = objReturn.Data.departmentConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Assign.GetStringValue())) == null ? 0 : objReturn.Data.departmentConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Assign.GetStringValue())).PermissionId;

                    scmPId = objReturn.Data.schemeConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Assign.GetStringValue())) == null ? 0 : objReturn.Data.schemeConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Assign.GetStringValue())).PermissionId;

                    serPId = objReturn.Data.serviceConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Assign.GetStringValue())) == null ? 0 : objReturn.Data.serviceConfig.FirstOrDefault(x => (string.IsNullOrEmpty(x.Type) ? string.Empty : x.Type).Equals(ConfigurationPermissionEnum.Assign.GetStringValue())).PermissionId;
                }
                objReturn.Data.Id = Convert.ToInt32(!string.IsNullOrEmpty(dptPId.ToString()) && dptPId > 0 ? dptPId : !string.IsNullOrEmpty(scmPId.ToString()) && scmPId > 0 ? scmPId : !string.IsNullOrEmpty(serPId.ToString()) && serPId > 0 ? serPId : 0);
            objReturn.Data.DepartmentCode = string.IsNullOrEmpty(department.ToString()) ? 0 : department;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Success, true);
            }
            catch(Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<string> Create(ConfigViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                List<SqlParameter> sqlParam = new List<SqlParameter>();
                sqlParam.Add(new SqlParameter("Id", SqlDbType.Int) { Value = model.Id });
                sqlParam.Add(new SqlParameter("UserId", SqlDbType.Int) { Value = !string.IsNullOrEmpty(model.UserId.ToString()) ? model.UserId : 0 });
                sqlParam.Add(new SqlParameter("UserType", SqlDbType.VarChar) { Value = !string.IsNullOrEmpty(model.UserType) ? model.UserType : string.Empty });
                sqlParam.Add(new SqlParameter("DepartmentCode", SqlDbType.Int) { Value = model.DepartmentCode });
                sqlParam.Add(new SqlParameter("CreatedBy", SqlDbType.Int) { Value = model.CreatedBy });
                sp_SaveConfigurePermission_Result Result = _uow.ExeccuteStoreProcedure<sp_SaveConfigurePermission_Result>("sp_SaveConfigurePermission @Id, @UserId, @UserType, @DepartmentCode, @CreatedBy", sqlParam.ToArray()).FirstOrDefault();
                foreach (var item in model.departmentConfig)
                {
                    //For self expect Assign Data
                    if (model.UserId > 0 && item.Type.Equals(ConfigurationPermissionEnum.Self.GetStringValue()))
                    {
                        item.PermissionId = string.IsNullOrEmpty(Convert.ToString(Result.ConfigurePermisionId)) ? 0 : Result.ConfigurePermisionId;
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<DepartmentConfigViewModel, tblCMD_ConfigurePermissionDeptLookup>()
                            .ForMember(dest => dest.ConfigurePermissionId, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.PermissionId.ToString()) ? null : src.PermissionId))
                            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => ConfigurationPermissionEnum.Self.GetStringValue()));

                        });
                        var dept = Mapper.Map<DepartmentConfigViewModel, tblCMD_ConfigurePermissionDeptLookup>(item);
                        _uow.GenericRepository<tblCMD_ConfigurePermissionDeptLookup>().Add(dept);
                    }
                    //For Assign Order
                    else if (model.UserId == 0)
                    {
                        item.PermissionId = string.IsNullOrEmpty(Convert.ToString(Result.ConfigurePermisionId)) ? 0 : Result.ConfigurePermisionId;
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<DepartmentConfigViewModel, tblCMD_ConfigurePermissionDeptLookup>()
                            .ForMember(dest => dest.ConfigurePermissionId, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.PermissionId.ToString()) ? null : src.PermissionId))
                            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => ConfigurationPermissionEnum.Assign.GetStringValue()));

                        });
                        var dept = Mapper.Map<DepartmentConfigViewModel, tblCMD_ConfigurePermissionDeptLookup>(item);
                        _uow.GenericRepository<tblCMD_ConfigurePermissionDeptLookup>().Add(dept);
                    }
                }
                foreach (var item in model.serviceConfig)
                {
                    //For self expect Assign Data
                    if (model.UserId > 0 && item.Type.Equals(ConfigurationPermissionEnum.Self.GetStringValue()))
                    {
                        item.PermissionId = string.IsNullOrEmpty(Convert.ToString(Result.ConfigurePermisionId)) ? 0 : Result.ConfigurePermisionId;
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<ServiceConfigViewModel, tblCMD_ConfigurePermissionServiceLookup>()
                            .ForMember(dest => dest.ConfigurePermissionId, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.PermissionId.ToString()) ? null : src.PermissionId))
                            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => ConfigurationPermissionEnum.Self.GetStringValue()));

                        });
                        tblCMD_ConfigurePermissionServiceLookup service = Mapper.Map<ServiceConfigViewModel, tblCMD_ConfigurePermissionServiceLookup>(item);
                        _uow.GenericRepository<tblCMD_ConfigurePermissionServiceLookup>().Add(service);
                    }
                    //For Assign Order
                    else if (model.UserId == 0)
                    {
                        item.PermissionId = string.IsNullOrEmpty(Convert.ToString(Result.ConfigurePermisionId)) ? 0 : Result.ConfigurePermisionId;
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<ServiceConfigViewModel, tblCMD_ConfigurePermissionServiceLookup>()
                            .ForMember(dest => dest.ConfigurePermissionId, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.PermissionId.ToString()) ? null : src.PermissionId))
                            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => ConfigurationPermissionEnum.Assign.GetStringValue()));
                        });
                        tblCMD_ConfigurePermissionServiceLookup service = Mapper.Map<ServiceConfigViewModel, tblCMD_ConfigurePermissionServiceLookup>(item);
                        _uow.GenericRepository<tblCMD_ConfigurePermissionServiceLookup>().Add(service);
                    }
                }
                foreach (var item in model.schemeConfig)
                {
                    //For self expect Assign Data
                    if (model.UserId > 0 && item.Type.Equals(ConfigurationPermissionEnum.Self.GetStringValue()))
                    {
                        item.PermissionId = string.IsNullOrEmpty(Convert.ToString(Result.ConfigurePermisionId)) ? 0 : Result.ConfigurePermisionId;
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<SchemeConfigViewModel, tblCMD_ConfigurePermissionSchemeLookup>()
                            .ForMember(dest => dest.ConfigurePermissionId, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.PermissionId.ToString()) ? null : src.PermissionId))
                            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => ConfigurationPermissionEnum.Self.GetStringValue()));

                        });
                        tblCMD_ConfigurePermissionSchemeLookup scheme = Mapper.Map<SchemeConfigViewModel, tblCMD_ConfigurePermissionSchemeLookup>(item);
                        _uow.GenericRepository<tblCMD_ConfigurePermissionSchemeLookup>().AddAsync(scheme);
                    }
                    //For Assign Order
                    else if (model.UserId == 0)
                    {
                        item.PermissionId = string.IsNullOrEmpty(Convert.ToString(Result.ConfigurePermisionId)) ? 0 : Result.ConfigurePermisionId;
                        Mapper.Initialize(x =>
                        {
                            x.CreateMap<SchemeConfigViewModel, tblCMD_ConfigurePermissionSchemeLookup>()
                            .ForMember(dest => dest.ConfigurePermissionId, opt => opt.MapFrom(src => string.IsNullOrEmpty(src.PermissionId.ToString()) ? null : src.PermissionId))
                            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => ConfigurationPermissionEnum.Assign.GetStringValue()));

                        });
                        tblCMD_ConfigurePermissionSchemeLookup scheme = Mapper.Map<SchemeConfigViewModel, tblCMD_ConfigurePermissionSchemeLookup>(item);
                        _uow.GenericRepository<tblCMD_ConfigurePermissionSchemeLookup>().AddAsync(scheme);
                    }
                }
                _uow.save();
                objReturn = SetResultStatus(Result.ConfigurePermisionId.Value.ToString(), MessageStatus.Save, true);
            }
            catch
            {
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }
        #endregion

    }
}
