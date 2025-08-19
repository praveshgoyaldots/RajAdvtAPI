using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;


namespace CMOWebApi.Services.Services
{
	public class AdvApprovalDetailMasterService :BaseService, IAdvApprovalDetailMasterService
	{
		IUnitofWork _uow;
		public AdvApprovalDetailMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<AdvApprovalDetailMasterViewModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<AdvApprovalDetailMasterViewModel> responsedata = new PagedData<AdvApprovalDetailMasterViewModel>();

				PagedData<tblADV_ApprovalDetailMaster> resultdata = GenericGridCall<tblADV_ApprovalDetailMaster>.ListView(model.PageSize, x => x.IsActive, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblADV_ApprovalDetailMaster, AdvApprovalDetailMasterViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<AdvApprovalDetailMasterViewModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<AdvApprovalDetailMasterViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<AdvApprovalDetailMasterModel>> GetById(long id)
		{
			try
			{
				tblADV_ApprovalDetailMaster advDetail = await _uow.GenericRepository<tblADV_ApprovalDetailMaster>().GetByIdAsync(id);

				AdvApprovalDetailMasterModel obj = new AdvApprovalDetailMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblADV_ApprovalDetailMaster, AdvApprovalDetailMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(advDetail, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch
			{
				return SetResultStatus<AdvApprovalDetailMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(AdvApprovalDetailMasterModel model)
		{
			ServiceResponse<tblADV_ApprovalDetailMaster> objReturn = new ServiceResponse<tblADV_ApprovalDetailMaster>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<AdvApprovalDetailMasterModel, tblADV_ApprovalDetailMaster>();
				});

				var approval = Mapper.Map<AdvApprovalDetailMasterModel, tblADV_ApprovalDetailMaster>(model);
				await _uow.GenericRepository<tblADV_ApprovalDetailMaster>().AddAsync(approval);
				_uow.save();

				approval.Code = approval.Id;
				await _uow.GenericRepository<tblADV_ApprovalDetailMaster>().UpdateAsync(approval);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(AdvApprovalDetailMasterModel model)
		{
			ServiceResponse<tblADV_ApprovalDetailMaster> objReturn = new ServiceResponse<tblADV_ApprovalDetailMaster>();
			try
			{
				tblADV_ApprovalDetailMaster obj = await _uow.GenericRepository<tblADV_ApprovalDetailMaster>().GetByIdAsync(model.Id);
               

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<AdvApprovalDetailMasterModel, tblADV_ApprovalDetailMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblADV_ApprovalDetailMaster>().UpdateAsync(obj);
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
				tblADV_ApprovalDetailMaster cObj = await _uow.GenericRepository<tblADV_ApprovalDetailMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDelete = true;
				await _uow.GenericRepository<tblADV_ApprovalDetailMaster>().UpdateAsync(cObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Delete, true);
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
					tblADV_ApprovalDetailMaster objResult = await _uow.GenericRepository<tblADV_ApprovalDetailMaster>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblADV_ApprovalDetailMaster>().UpdateAsync(objResult);
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
