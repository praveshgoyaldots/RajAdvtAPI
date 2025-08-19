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
    public class DepartmentReferenceMasterService : BaseService, IDepartmentReferenceMasterService
    {
		IUnitofWork _uow;
		public DepartmentReferenceMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<DepartmentReferenceViewModel>> GetAll(IndexModel model)
		{
			try
			{
                PagedData<DepartmentReferenceViewModel> responseList = new PagedData<DepartmentReferenceViewModel>();
                PagedData<vwODR_GNRT_DepartmentReference> objList = GenericGridCall<vwODR_GNRT_DepartmentReference>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwODR_GNRT_DepartmentReference, DepartmentReferenceViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responseList.Data = mapper.Map(objList.Data, responseList.Data);



                return SetResultStatus(responseList, MessageStatus.Success, true);
                
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<DepartmentReferenceViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<DepartmentReferenceModel>> GetById(long id)
		{
			try
			{
                tblODR_GNRT_DepartmentReference advCategory = await _uow.GenericRepository<tblODR_GNRT_DepartmentReference>().GetByIdAsync(id);

                DepartmentReferenceModel obj = new DepartmentReferenceModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblODR_GNRT_DepartmentReference, DepartmentReferenceModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(advCategory, obj);

				return SetResultStatus(obj, MessageStatus.Success, true);
			}
			catch
			{
				return SetResultStatus<DepartmentReferenceModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(DepartmentReferenceModel model)
		{
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<DepartmentReferenceModel, tblODR_GNRT_DepartmentReference>();
				});
                tblODR_GNRT_DepartmentReference obj = Mapper.Map<DepartmentReferenceModel, tblODR_GNRT_DepartmentReference>(model);
                obj.CreatedDate = DateTime.Now;
                await _uow.GenericRepository<tblODR_GNRT_DepartmentReference>().AddAsync(obj);
				_uow.save();

                obj.Code = obj.Id;
				await _uow.GenericRepository<tblODR_GNRT_DepartmentReference>().UpdateAsync(obj);
				_uow.save();

				return SetResultStatus(string.Empty, MessageStatus.Create, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(DepartmentReferenceModel model)
		{
			try
			{
                tblODR_GNRT_DepartmentReference obj = await _uow.GenericRepository<tblODR_GNRT_DepartmentReference>().GetByIdAsync(model.Id);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<DepartmentReferenceModel, tblODR_GNRT_DepartmentReference>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;

				await _uow.GenericRepository<tblODR_GNRT_DepartmentReference>().UpdateAsync(obj);
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
					tblODR_GNRT_DepartmentReference objResult = await _uow.GenericRepository<tblODR_GNRT_DepartmentReference>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblODR_GNRT_DepartmentReference>().UpdateAsync(objResult);
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
			catch (Exception)
			{
				objReturn.Data = null;
				objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
			return objReturn;
		}

	}
}
