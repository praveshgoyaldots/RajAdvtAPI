using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class NotificationTemplateTypeService : BaseService, INotificationTemplateTypeService
    {
		IUnitofWork _uow;
		public NotificationTemplateTypeService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<NotificationTemplateTypeModel>> GetAll(IndexModel model)
		{
			try
			{
                PagedData<NotificationTemplateTypeModel> responseList = new PagedData<NotificationTemplateTypeModel>();
                PagedData<tblNotificationTemplateType> objList = GenericGridCall<tblNotificationTemplateType>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblNotificationTemplateType, NotificationTemplateTypeModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList.Data = mapper.Map(objList.Data, responseList.Data);



                return SetResultStatus<PagedData<NotificationTemplateTypeModel>>(responseList, MessageStatus.Success, true);
                
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<NotificationTemplateTypeModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<NotificationTemplateTypeModel>> GetById(long id)
		{
			try
			{
                tblNotificationTemplateType objById = await _uow.GenericRepository<tblNotificationTemplateType>().GetByIdAsync(id);

                NotificationTemplateTypeModel obj = new NotificationTemplateTypeModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblNotificationTemplateType, NotificationTemplateTypeModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(objById, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<NotificationTemplateTypeModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(NotificationTemplateTypeModel model)
		{
			ServiceResponse<tblNotificationTemplateType> objReturn = new ServiceResponse<tblNotificationTemplateType>();
			try
			{

				
				Mapper.Initialize(x =>
				{
					x.CreateMap<NotificationTemplateTypeModel, tblNotificationTemplateType>();
				});

				var obj = Mapper.Map<NotificationTemplateTypeModel, tblNotificationTemplateType>(model);
				await _uow.GenericRepository<tblNotificationTemplateType>().AddAsync(obj);
				_uow.save();

				obj.Code = obj.Id;
				await _uow.GenericRepository<tblNotificationTemplateType>().UpdateAsync(obj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Create, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(NotificationTemplateTypeModel model)
		{
			ServiceResponse<tblNotificationTemplateType> objReturn = new ServiceResponse<tblNotificationTemplateType>();
			try
			{
                tblNotificationTemplateType obj = await _uow.GenericRepository<tblNotificationTemplateType>().GetByIdAsync(model.Id);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<NotificationTemplateTypeModel, tblNotificationTemplateType>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblNotificationTemplateType>().UpdateAsync(obj);
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
                tblNotificationTemplateType cObj = await _uow.GenericRepository<tblNotificationTemplateType>().GetByIdAsync(id);
				cObj.IsDelete = true;
				await _uow.GenericRepository<tblNotificationTemplateType>().UpdateAsync(cObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Delete, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}
	}
}
