using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
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
    public class DepartmentProfile : BaseService, IDepartmentProfile
    {
        #region /// Variable ///
        IUnitofWork _uow;

        #endregion

        #region /// Cunstroctor  ///
        public DepartmentProfile(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion

        #region Method


        public ServiceResponse<PagedData<DepartmentProfileViewModel>> GetAll(DepartmentProfileFilterModel model, int excludeEntryType = 0, bool isBase64File = true)
        {
            ServiceResponse<PagedData<DepartmentProfileViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentProfileViewModel>>();
            try
            {
                PagedData<DepartmentProfileViewModel> resulData = new PagedData<DepartmentProfileViewModel>();
                PagedData<vw_DepartmentProfile> data = GenericGridCall<vw_DepartmentProfile>.ListView(model.indexModel.PageSize, x => x.EntryTypeDisplayOrder, x => x.IsActive == true && x.IsDeleted == false && (excludeEntryType > 0 ? x.EntryTypeCode != excludeEntryType : true) && (model.EntryTypeCode > 0 ? x.EntryTypeCode == model.EntryTypeCode : true) && (model.DepartmentCode == 0 || x.DepartmentCode == model.DepartmentCode )
                && (model.JankalyanCategoryCode > 0 ? x.JankalyanCategoryCode == model.JankalyanCategoryCode : true)
                , model.indexModel.Search, model.indexModel.OrderBy, model.indexModel.OrderByAsc, model.indexModel.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_DepartmentProfile, DepartmentProfileViewModel>()
                     .ForMember(des => des.PDFURL, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.PDFURL) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.PDFURL))) : mdlSrc.PDFURL.ToAbsolutePath() : string.Empty))

                      .ForMember(des => des.ImageURL, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImageURL) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImageURL))) : mdlSrc.ImageURL.ToAbsolutePath() : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<DepartmentProfileViewModel>.ReturnCustomizeData(resulData, model.indexModel.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<DepartmentProfileViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<DepartmentProfileViewModel> GetById(long id, bool isBase64File = true)
        {
            ServiceResponse<DepartmentProfileViewModel> objReturn = new ServiceResponse<DepartmentProfileViewModel>();
            try
            {


                vw_DepartmentProfile resultData = _uow.GenericRepository<vw_DepartmentProfile>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vw_DepartmentProfile, DepartmentProfileViewModel>()
                         .ForMember(des => des.PDFURL, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.PDFURL) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.PDFURL))) : mdlSrc.PDFURL.ToAbsolutePath() : string.Empty))

                      .ForMember(des => des.ImageURL, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImageURL) ? isBase64File ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImageURL))) : mdlSrc.ImageURL.ToAbsolutePath() : string.Empty));

                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(resultData, objReturn.Data);

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

        public ServiceResponse<PagedData<DepartmentContactViewModel>> GetAllDepartmentContacts(DepartmentContactFilterModel model)
        {
            ServiceResponse<PagedData<DepartmentContactViewModel>> objReturn = new ServiceResponse<PagedData<DepartmentContactViewModel>>();
            try
            {
                PagedData<DepartmentContactViewModel> resulData = new PagedData<DepartmentContactViewModel>();
                PagedData<vw_DepartmentContactDetails> data = GenericGridCall<vw_DepartmentContactDetails>.ListView(model.indexModel.PageSize, x => x.DepartmentTitle, x => x.IsActive == true && x.IsDeleted == false  && (model.DesignationCode > 0 ? x.DesignationCode == model.DesignationCode : true) && (model.DepartmentCode > 0 ? x.DepartmentCode == model.DepartmentCode : true), model.indexModel.Search, model.indexModel.OrderBy, model.indexModel.OrderByAsc, model.indexModel.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vw_DepartmentContactDetails, DepartmentContactViewModel>();

                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<DepartmentContactViewModel>.ReturnCustomizeData(resulData, model.indexModel.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<DepartmentContactViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        public ServiceResponse<DepartmentContactViewModel> GetDepartmentContactById(long id)
        {
            ServiceResponse<DepartmentContactViewModel> objReturn = new ServiceResponse<DepartmentContactViewModel>();
            try
            {


                vw_DepartmentContactDetails resultData = _uow.GenericRepository<vw_DepartmentContactDetails>().GetAll(filter: x => x.Id == id).FirstOrDefault();
                if (resultData != null)
                {

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<vw_DepartmentContactDetails, DepartmentContactViewModel>();

                    });
                    IMapper mapper = config.CreateMapper();
                    objReturn.Data = mapper.Map(resultData, objReturn.Data);

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
    }
}
