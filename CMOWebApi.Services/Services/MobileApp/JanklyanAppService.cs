using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.MobileApp;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CMOWebApi.Services.Services.MobileApp
{
    public class JanklyanAppService : BaseService, IJanklyanAppService
    {
        #region Variable

        IUnitofWork _uow;

        #endregion

        #region Constructor

        public JanklyanAppService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method

        /// <summary>
        /// Get Module Icons
        /// </summary>
        /// <returns></returns>
        public ServiceResponse<List<JankalyanAppModulesModel>> GetJanklayanAppModules()
        {
            try
            {
                List<JankalyanAppModulesModel> objReturn = new List<JankalyanAppModulesModel>();
                List<sp_JAN_App_Modules_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_App_Modules_Result>("sp_JAN_App_Modules"
                  ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_App_Modules_Result, JankalyanAppModulesModel>();
                    //.ForMember(des => des.IconImage, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.IconImage) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.IconImage))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetJanklayanAppModules ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJanklayanAppModules ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetJanklayanAppModules ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<JankalyanAppModulesModel>>(null, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get Department Wise count for CMIS module for jankalyan App
        /// </summary>
        /// <param name="moduleId"></param>
        /// <returns></returns>
        public ServiceResponse<List<OptionViewModel>> GetDepartmentWiseCountForCMISModules(decimal moduleId)
        {
            try
            {
                List<OptionViewModel> objReturn = new List<OptionViewModel>();
                var data = _uow.ExeccuteStoreProcedure<sp_JAN_App_DepartmentWiseCountForCMIS_Result>("sp_JAN_App_DepartmentWiseCountForCMIS @ModuleID"
                        , new SqlParameter("ModuleID", SqlDbType.Decimal) { Value = moduleId > 0 ? moduleId : 0 }
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_App_DepartmentWiseCountForCMIS_Result, OptionViewModel>()
                   .ForMember(des => des.Code, src => src.MapFrom(x => x.JanDepartmentCode))
                   .ForMember(des => des.Title, src => src.MapFrom(x => x.DepartmentTitle))
                   .ForMember(des => des.TotalCount, src => src.MapFrom(x => x.TotalCount));
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetDepartmentWiseCountForCMISModules ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDepartmentWiseCountForCMISModules ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDepartmentWiseCountForCMISModules ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<OptionViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<OptionViewModel>> GetDepartmentStatusWiseCountForCMIS(decimal moduleId)
        {
            try
            {
                List<OptionViewModel> objReturn = new List<OptionViewModel>();
                var data = _uow.ExeccuteStoreProcedure<sp_JAN_App_DepartmentStatusWiseCountForCMIS_Result>("sp_JAN_App_DepartmentStatusWiseCountForCMIS @ModuleID"
                        , new SqlParameter("ModuleID", SqlDbType.Decimal) { Value = moduleId > 0 ? moduleId : 0 }
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_App_DepartmentStatusWiseCountForCMIS_Result, OptionViewModel>()
                       .ForMember(des => des.Code, src => src.MapFrom(x => 0))
                   .ForMember(des => des.Title, src => src.MapFrom(x => x.DepartmentStatus))
                   .ForMember(des => des.TotalCount, src => src.MapFrom(x => x.TotalCount));
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetDepartmentStatusWiseCountForCMIS ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDepartmentStatusWiseCountForCMIS ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetDepartmentStatusWiseCountForCMIS ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<OptionViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<OptionViewModel>> GetCMOStatusWiseCountForCMIS(decimal moduleId)
        {
            try
            {
                List<OptionViewModel> objReturn = new List<OptionViewModel>();
                var data = _uow.ExeccuteStoreProcedure<sp_JAN_App_CMOStatusWiseCountForCMIS_Result>("sp_JAN_App_CMOStatusWiseCountForCMIS @ModuleID"
                        , new SqlParameter("ModuleID", SqlDbType.Decimal) { Value = moduleId > 0 ? moduleId : 0 }
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_App_CMOStatusWiseCountForCMIS_Result, OptionViewModel>()
                     .ForMember(des => des.Code, src => src.MapFrom(x => 0))
                   .ForMember(des => des.Title, src => src.MapFrom(x => x.CMOStatus))
                   .ForMember(des => des.TotalCount, src => src.MapFrom(x => x.TotalCount));
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetCMOStatusWiseCountForCMIS ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMOStatusWiseCountForCMIS ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetCMOStatusWiseCountForCMIS ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<OptionViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<OptionViewModel>> GetProjectStatusCount()
        {
            try
            {
                List<OptionViewModel> objReturn = new List<OptionViewModel>();
                var data = _uow.ExeccuteStoreProcedure<sp_JAN_App_ProjectStatusCount_Result>("sp_JAN_App_ProjectStatusCount"
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_App_ProjectStatusCount_Result, OptionViewModel>()
                     .ForMember(des => des.Code, src => src.MapFrom(x => x.ProjectStatusCode))
                   .ForMember(des => des.Title, src => src.MapFrom(x => x.ProjectStatus))
                   .ForMember(des => des.TotalCount, src => src.MapFrom(x => x.ProjectCount));
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetProjectStatusCount ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetProjectStatusCount ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetProjectStatusCount ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<OptionViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<List<OptionViewModel>> GetProjectDepartmentCount()
        {
            try
            {
                List<OptionViewModel> objReturn = new List<OptionViewModel>();
                var data = _uow.ExeccuteStoreProcedure<sp_JAN_App_ProjectDepartmentCount_Result>("sp_JAN_App_ProjectDepartmentCount"
                   ).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_JAN_App_ProjectDepartmentCount_Result, OptionViewModel>()
                      .ForMember(des => des.Code, src => src.MapFrom(x => x.NodalDepartmentCode))
                   .ForMember(des => des.Title, src => src.MapFrom(x => x.DepartmentTitle))
                   .ForMember(des => des.TotalCount, src => src.MapFrom(x => x.ProjectCount));
                });
                IMapper mapper = config.CreateMapper();
                objReturn = mapper.Map(data, objReturn);

                return SetResultStatus(objReturn, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("GetProjectDepartmentCount ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("GetProjectDepartmentCount ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("GetProjectDepartmentCount ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<List<OptionViewModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion




    }
}
