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
    public class DepartmentAuthoritySignatoryMasterService : BaseService, IDepartmentAuthoritySignatoryMasterService
    {
		IUnitofWork _uow;
		public DepartmentAuthoritySignatoryMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<DepartmentAuthoritySignatoryViewModel>> GetAll(IndexModel model)
		{
			try
			{
                PagedData<DepartmentAuthoritySignatoryViewModel> responseList = new PagedData<DepartmentAuthoritySignatoryViewModel>();
                PagedData<vwODR_GNRT_DepartmentAuthoritySignatory> objList = GenericGridCall<vwODR_GNRT_DepartmentAuthoritySignatory>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwODR_GNRT_DepartmentAuthoritySignatory, DepartmentAuthoritySignatoryViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList.Data = mapper.Map(objList.Data, responseList.Data);

                return SetResultStatus(responseList, MessageStatus.Success, true);
                
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<DepartmentAuthoritySignatoryViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<DepartmentAuthoritySignatoryModel>> GetById(long id)
		{
			try
			{
                tblODR_GNRT_DepartmentAuthoritySignatory advCategory = await _uow.GenericRepository<tblODR_GNRT_DepartmentAuthoritySignatory>().GetByIdAsync(id);

                DepartmentAuthoritySignatoryModel obj = new DepartmentAuthoritySignatoryModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblODR_GNRT_DepartmentAuthoritySignatory, DepartmentAuthoritySignatoryModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(advCategory, obj);

				return SetResultStatus(obj, MessageStatus.Success, true);
			}
			catch
			{
				return SetResultStatus<DepartmentAuthoritySignatoryModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(DepartmentAuthoritySignatoryModel model)
		{
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<DepartmentAuthoritySignatoryModel, tblODR_GNRT_DepartmentAuthoritySignatory>();
				});
                tblODR_GNRT_DepartmentAuthoritySignatory obj = Mapper.Map<DepartmentAuthoritySignatoryModel, tblODR_GNRT_DepartmentAuthoritySignatory>(model);
                obj.CreatedDate = DateTime.Now;
                await _uow.GenericRepository<tblODR_GNRT_DepartmentAuthoritySignatory>().AddAsync(obj);
				_uow.save();

                obj.Code = obj.Id;
				await _uow.GenericRepository<tblODR_GNRT_DepartmentAuthoritySignatory>().UpdateAsync(obj);
				_uow.save();

				return SetResultStatus(string.Empty, MessageStatus.Create, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(DepartmentAuthoritySignatoryModel model)
		{
			try
			{
                tblODR_GNRT_DepartmentAuthoritySignatory obj = await _uow.GenericRepository<tblODR_GNRT_DepartmentAuthoritySignatory>().GetByIdAsync(model.Id);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<DepartmentAuthoritySignatoryModel, tblODR_GNRT_DepartmentAuthoritySignatory>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;

				await _uow.GenericRepository<tblODR_GNRT_DepartmentAuthoritySignatory>().UpdateAsync(obj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();

			try
			{
				if (id > 0)
				{
					tblODR_GNRT_DepartmentAuthoritySignatory objResult = await _uow.GenericRepository<tblODR_GNRT_DepartmentAuthoritySignatory>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblODR_GNRT_DepartmentAuthoritySignatory>().UpdateAsync(objResult);
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
			catch (Exception ex)
			{
				objReturn.Data = null;
				objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
			return objReturn;
		}

	}
}
