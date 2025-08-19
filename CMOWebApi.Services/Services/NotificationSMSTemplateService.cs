using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class NotificationSMSTemplateService : BaseService, INotificationSMSTemplateService
    {
        IUnitofWork _uow;
        public NotificationSMSTemplateService(IUnitofWork uow)
        {
            _uow = uow;
        }

        public ServiceResponse<PagedData<NotificationSMSTemplateViewModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<NotificationSMSTemplateViewModel> responsedata = new PagedData<NotificationSMSTemplateViewModel>();

                PagedData<vwNotificationSMSTemplate> resultdata = GenericGridCall<vwNotificationSMSTemplate>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwNotificationSMSTemplate, NotificationSMSTemplateViewModel>()
                    .ForMember(des => des.TemplateType, src => src.MapFrom(x => !string.IsNullOrEmpty(x.TemplateType) ? x.TemplateType : "--"))
                    .ForMember(des => des.SMSContent, src => src.MapFrom(x => !string.IsNullOrEmpty(x.SMSContent) ? x.SMSContent : "--"));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<NotificationSMSTemplateViewModel>>(responsedata, MessageStatus.Success, true);


            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<NotificationSMSTemplateViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> Create(NotificationSMSTemplatesModel model)
        {
            ServiceResponse<tblNotificationSMSTemplate> objReturn = new ServiceResponse<tblNotificationSMSTemplate>();
            try
            {
                if (IsTypeAvailable(model.TypeCode))
                {
                    Mapper.Initialize(x =>
                {
                    x.CreateMap<NotificationSMSTemplatesModel, tblNotificationSMSTemplate>();
                });

                    var obj = Mapper.Map<NotificationSMSTemplatesModel, tblNotificationSMSTemplate>(model);
                    await _uow.GenericRepository<tblNotificationSMSTemplate>().AddAsync(obj);
                    _uow.save();

                    obj.Code = obj.Id;
                    await _uow.GenericRepository<tblNotificationSMSTemplate>().UpdateAsync(obj);
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.Create, true);
                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.ExistType, false);
                }
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<NotificationSMSTemplatesModel>> GetById(long id)
        {
            try
            {
                tblNotificationSMSTemplate obj = await _uow.GenericRepository<tblNotificationSMSTemplate>().GetByIdAsync(id);

                NotificationSMSTemplatesModel objResurl = new NotificationSMSTemplatesModel();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblNotificationSMSTemplate, NotificationSMSTemplatesModel>();
                });
                IMapper mapper = config.CreateMapper();
                objResurl = mapper.Map(obj, objResurl);

                return SetResultStatus(objResurl, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<NotificationSMSTemplatesModel>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> Edit(NotificationSMSTemplatesModel model)
        {
            try
            {
                if (IsTypeAvailable(model.TypeCode,model.Id))
                {
                    tblNotificationSMSTemplate obj = await _uow.GenericRepository<tblNotificationSMSTemplate>().GetByIdAsync(model.Id);

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<NotificationSMSTemplatesModel, tblNotificationSMSTemplate>();
                    });
                    IMapper mapper = config.CreateMapper();
                    obj = mapper.Map(model, obj);

                    await _uow.GenericRepository<tblNotificationSMSTemplate>().UpdateAsync(obj);
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.Update, true);

                }
                else
                {
                    return SetResultStatus(string.Empty, MessageStatus.ExistType, false);
                }
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
                tblNotificationSMSTemplate cObj = await _uow.GenericRepository<tblNotificationSMSTemplate>().GetByIdAsync(id);
                cObj.IsDelete = true;
                await _uow.GenericRepository<tblNotificationSMSTemplate>().UpdateAsync(cObj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Delete, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

        }

        private Boolean IsTypeAvailable(long? code,long id=0)
        {
            try
            {
                List<tblNotificationSMSTemplate> obj = _uow.GenericRepository<tblNotificationSMSTemplate>().GetAll(filter: x => x.TypeCode == code && x.IsDelete == false && (id>0? x.Id!= id:true)).ToList();
                return obj.Count > 0 ? false : true;
            }
            catch
            {
                return false;
            }
        }
    }
}
