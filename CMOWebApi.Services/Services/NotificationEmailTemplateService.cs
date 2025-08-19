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
    public class NotificationEmailTemplateService : BaseService , INotificationEmailTemplateService
    {
        IUnitofWork _uow;
        public NotificationEmailTemplateService(IUnitofWork uow)
        {
            _uow = uow;
        }


        public ServiceResponse<PagedData<NotificationEmailTemplateViewModel>> GetAll(IndexModel model)
        {
            try
            {

                PagedData<NotificationEmailTemplateViewModel> responsedata = new PagedData<NotificationEmailTemplateViewModel>();

                PagedData<vwNotificationEmailTemplate> resultdata = GenericGridCall<vwNotificationEmailTemplate>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwNotificationEmailTemplate, NotificationEmailTemplateViewModel>()
                    .ForMember(des => des.TemplateType, src => src.MapFrom(x => !string.IsNullOrEmpty(x.TemplateType) ? x.TemplateType : "--"))
                    .ForMember(des => des.Subject, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Subject) ? x.Subject : "--"))
                    .ForMember(des => des.EmailContent, src => src.MapFrom(x => !string.IsNullOrEmpty(x.EmailContent) ? x.EmailContent : "--"));
                });
                IMapper mapper = config.CreateMapper();
                responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

                responsedata.TotalRecords = resultdata.TotalRecords;
                responsedata.PageSize = model.PageSize;

                return SetResultStatus<PagedData<NotificationEmailTemplateViewModel>>(responsedata, MessageStatus.Success, true);


            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<NotificationEmailTemplateViewModel>>(null, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> Create(NotificationEmailTemplatesModel model)
        {
            ServiceResponse<tblNotificationEmailTemplate> objReturn = new ServiceResponse<tblNotificationEmailTemplate>();
            try
            {
                if (IsTypeAvailable(model.TypeCode))
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<NotificationEmailTemplatesModel, tblNotificationEmailTemplate>();
                    });

                    var obj = Mapper.Map<NotificationEmailTemplatesModel, tblNotificationEmailTemplate>(model);
                    await _uow.GenericRepository<tblNotificationEmailTemplate>().AddAsync(obj);
                    _uow.save();

                    obj.Code = obj.Id;
                    await _uow.GenericRepository<tblNotificationEmailTemplate>().UpdateAsync(obj);
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

        public async Task<ServiceResponse<NotificationEmailTemplatesModel>> GetById(long id)
        {
            try
            {
                tblNotificationEmailTemplate obj = await _uow.GenericRepository<tblNotificationEmailTemplate>().GetByIdAsync(id);

                NotificationEmailTemplatesModel objResurl = new NotificationEmailTemplatesModel();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblNotificationEmailTemplate, NotificationEmailTemplatesModel>();
                });
                IMapper mapper = config.CreateMapper();
                objResurl = mapper.Map(obj, objResurl);

                return SetResultStatus(objResurl, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<NotificationEmailTemplatesModel>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> Edit(NotificationEmailTemplatesModel model)
        {
            try
            {
                if (IsTypeAvailable(model.TypeCode,model.Id))
                {
                   
                    tblNotificationEmailTemplate obj = await _uow.GenericRepository<tblNotificationEmailTemplate>().GetByIdAsync(model.Id);

                    var config = new MapperConfiguration(cfg =>
                    {
                        cfg.CreateMap<NotificationEmailTemplatesModel, tblNotificationEmailTemplate>();
                    });
                    IMapper mapper = config.CreateMapper();
                    obj = mapper.Map(model, obj);

                    await _uow.GenericRepository<tblNotificationEmailTemplate>().UpdateAsync(obj);
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
                tblNotificationEmailTemplate cObj = await _uow.GenericRepository<tblNotificationEmailTemplate>().GetByIdAsync(id);
                cObj.IsDelete = true;
                await _uow.GenericRepository<tblNotificationEmailTemplate>().UpdateAsync(cObj);
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Delete, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

        }

        private Boolean IsTypeAvailable(long? code, long id = 0)
        {
            try
            {
               
                List<tblNotificationEmailTemplate> obj = _uow.GenericRepository<tblNotificationEmailTemplate>().GetAll(filter: x => x.TypeCode == code && x.IsDelete == false && (id > 0 ? x.Id != id : true)).ToList();
               return obj.Count>0? false : true;
            }
            catch
            {
                return false;
            }
        }

    }
}
