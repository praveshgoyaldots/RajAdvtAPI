using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class SchemeTypeService : BaseService, ISchemeTypeService
	{
		IUnitofWork _uow;
		public SchemeTypeService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<List<SchemeTypeViewModel>> GetAll()
		{
			try
			{
				List<SchemeTypeViewModel> responseList = new List<SchemeTypeViewModel>();
				List<tblSchemeTypeMaster> objList = _uow.GenericRepository<tblSchemeTypeMaster>().GetAll(filter: x => x.IsActive == true && x.IsDelete == false).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSchemeTypeMaster, SchemeTypeViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList = mapper.Map(objList, responseList);

				return SetResultStatus<List<SchemeTypeViewModel>>(responseList, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<SchemeTypeViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<SchemeTypeViewModel>> GetById(long id)
		{
			try
			{
				tblSchemeTypeMaster schemetype = await _uow.GenericRepository<tblSchemeTypeMaster>().GetByIdAsync(id);

				SchemeTypeViewModel obj = new SchemeTypeViewModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblSchemeTypeMaster, SchemeTypeViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(schemetype, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<SchemeTypeViewModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(SchemeTypeViewModel model)
		{
			ServiceResponse<tblSchemeTypeMaster> objReturn = new ServiceResponse<tblSchemeTypeMaster>();
			try
			{

				model.IsActive = true;
				Mapper.Initialize(x =>
				{
					x.CreateMap<SchemeTypeViewModel, tblSchemeTypeMaster>();
				});


				var schemetype = Mapper.Map<SchemeTypeViewModel, tblSchemeTypeMaster>(model);
				await _uow.GenericRepository<tblSchemeTypeMaster>().AddAsync(schemetype);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(SchemeTypeViewModel model)
		{
			ServiceResponse<tblSchemeTypeMaster> objReturn = new ServiceResponse<tblSchemeTypeMaster>();
			try
			{
				tblSchemeTypeMaster obj = new tblSchemeTypeMaster();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<SchemeTypeViewModel, tblSchemeTypeMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblSchemeTypeMaster>().UpdateAsync(obj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);
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
				tblSchemeTypeMaster cObj = await _uow.GenericRepository<tblSchemeTypeMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDelete = true;
				await _uow.GenericRepository<tblSchemeTypeMaster>().UpdateAsync(cObj);
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
