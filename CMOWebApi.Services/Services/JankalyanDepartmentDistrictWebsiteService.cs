using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.PublicPortalModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class JankalyanDepartmentDistrictWebsiteService : BaseService, IJankalyanDepartmentDistrictWebsiteService
    {
        IUnitofWork _uow;

        public JankalyanDepartmentDistrictWebsiteService(IUnitofWork uow )
        {
            _uow = uow;
        }

        public ServiceResponse<List<WebsiteDipartmentDistrictListModel>> GetDipartmentDistrict(WebsiteDipartmentDistrictFilterModel model)
        {
            try
            {

                List<WebsiteDipartmentDistrictListModel> responsedata = new List<WebsiteDipartmentDistrictListModel>();

                List<sp_JAN_Front_Website_DipartmentDistrict_Result> data = _uow.ExeccuteStoreProcedure<sp_JAN_Front_Website_DipartmentDistrict_Result>("sp_JAN_Front_Website_DipartmentDistrict @DepartmentDistrictCode"
                       , new SqlParameter("DepartmentDistrictCode", SqlDbType.BigInt) { Value = model.DepartmentDistrictCode > 0 ? model.DepartmentDistrictCode : 0 }).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                cfg.CreateMap<sp_JAN_Front_Website_DipartmentDistrict_Result, WebsiteDipartmentDistrictListModel>()
                .ForMember(des => des.LogoUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.LogoUrl) ? model.IsLogoURLBase64 ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(x.LogoUrl))) : x.LogoUrl.ToAbsolutePath() : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                responsedata = mapper.Map(data, responsedata);

                return SetResultStatus(responsedata, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<List<WebsiteDipartmentDistrictListModel>>(null, MessageStatus.Error, false, !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message: ex.Message));
            }
        }
    }
}
