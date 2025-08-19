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
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
    public class HelpDocumentService : BaseService, IHelpDocumentService
    {
        IUnitofWork _uow;
        private static string _helpDocLocation = HttpContext.Current.Server.MapPath(FilePath.HelpDocLocation.GetStringValue());

        public HelpDocumentService(IUnitofWork uow)
        {
            _uow = uow;
        }

        public ServiceResponse<PagedData<HelpDocumentViewModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<HelpDocumentViewModel> responseList = new PagedData<HelpDocumentViewModel>();
                PagedData<vwHelpDocument> objList = new PagedData<vwHelpDocument>();
                if ((_loginUserDetail.UserType == UserTypeEnum.ADM.GetStringValue()) || (_loginUserDetail.UserType == UserTypeEnum.SADM.GetStringValue()))
                {

                    objList = GenericGridCall<vwHelpDocument>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                }
                else
                {
                    tblUserType objUserType = _uow.GenericRepository<tblUserType>().GetAll(filter: x => x.UserType.Trim().ToLower() == _loginUserDetail.UserType.Trim().ToLower()).FirstOrDefault();
                    if (objUserType != null && objUserType.ParrentUserType == UserTypeEnum.ADM.GetStringValue())
                    {
                        objList = GenericGridCall<vwHelpDocument>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                    }
                    else
                    {
                        objList = GenericGridCall<vwHelpDocument>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false && (x.SSOID.Trim().ToLower() == _loginUserDetail.SSOID.Trim().ToLower()), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                    }

                }


                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwHelpDocument, HelpDocumentViewModel>()
                       .ForMember(des => des.Url, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Url) ? FilePath.HelpDocLocation.GetStringValue() + x.Url : string.Empty))
                    .ForMember(des => des.BlankDocUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BlankDocUrl) ? FilePath.HelpDocLocation.GetStringValue() + x.BlankDocUrl : string.Empty));
                    //               .ForMember(des => des.Url, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Url) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + x.Url)) : string.Empty))
                    //.ForMember(des => des.BlankDocUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BlankDocUrl) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + x.BlankDocUrl)) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);
                responseList.TotalRecords = objList.TotalRecords;

                return SetResultStatus<PagedData<HelpDocumentViewModel>>(responseList, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                CreateLogHelper.CreateLogFile("HelpDocumentService ex.Message :" + ex.Message + " \n");
                CreateLogHelper.CreateLogFile("HelpDocumentService ex.InnerException.Message :" + ex.InnerException.Message + " \n");
                CreateLogHelper.CreateLogFile("HelpDocumentService ex.InnerException.InnerException.Message :" + ex.InnerException.InnerException.Message + " \n");
                return SetResultStatus<PagedData<HelpDocumentViewModel>>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<HelpDocumentModel>> GetById(long id)
        {
            try
            {
                tblHelpDocument obj = await _uow.GenericRepository<tblHelpDocument>().GetByIdAsync(id);

                HelpDocumentModel model = new HelpDocumentModel();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblHelpDocument, HelpDocumentModel>()
                     .ForMember(des => des.Url, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Url) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + x.Url)) : string.Empty))
                    .ForMember(des => des.BlankDocUrl, src => src.MapFrom(x => !string.IsNullOrEmpty(x.BlankDocUrl) ? (CommonUtility.GetBase64strFromFilePath(_helpDocLocation + x.BlankDocUrl)) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                model = mapper.Map(obj, model);

                return SetResultStatus(model, MessageStatus.Update, true);
            }
            catch
            {
                return SetResultStatus<HelpDocumentModel>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> Create(HelpDocumentModel model)
        {
            ServiceResponse<tblHelpDocument> objReturn = new ServiceResponse<tblHelpDocument>();
            try
            {


                Mapper.Initialize(x =>
                {
                    x.CreateMap<HelpDocumentModel, tblHelpDocument>()
                     .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                     .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                     .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });

                var obj = Mapper.Map<HelpDocumentModel, tblHelpDocument>(model);
                await _uow.GenericRepository<tblHelpDocument>().AddAsync(obj);
                _uow.save();

                obj.Code = obj.Id;
                await _uow.GenericRepository<tblHelpDocument>().UpdateAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Save, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> Edit(HelpDocumentModel model)
        {
            ServiceResponse<tblHelpDocument> objReturn = new ServiceResponse<tblHelpDocument>();
            try
            {
                tblHelpDocument obj = await _uow.GenericRepository<tblHelpDocument>().GetByIdAsync(model.Id);

                if (!model.IsImageChange)
                {
                    model.Url = obj.Url;
                }
                if (!model.IsBlankDocChanges)
                {
                    model.BlankDocUrl = obj.BlankDocUrl;
                }
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<HelpDocumentModel, tblHelpDocument>()
                     .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId)); ;
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                await _uow.GenericRepository<tblHelpDocument>().UpdateAsync(obj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> Delete(long id)
        {
            try
            {
                tblHelpDocument cObj = await _uow.GenericRepository<tblHelpDocument>().GetByIdAsync(id);
                cObj.IsActive = false;
                cObj.IsDelete = true;
                await _uow.GenericRepository<tblHelpDocument>().UpdateAsync(cObj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Delete, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

        }

        public Boolean IsTypeNotAvailable(long typeCode, long id = 0)
        {
            try
            {
                List<tblHelpDocument> obj = _uow.GenericRepository<tblHelpDocument>().GetAll(filter: x => x.TypeCode == typeCode && x.IsDelete == false && (id > 0 ? x.Id != id : true)).ToList();
                return obj.Count > 0 ? false : true;
            }
            catch
            {
                return false;
            }
        }


    }
}
