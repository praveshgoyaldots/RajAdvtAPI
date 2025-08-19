using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
	public class OrderSubTypeMasterService : BaseService, IOrderSubTypeMasterService
	{
        #region /// Variable ///
        private readonly UserManagementService _userManagementService;
        IUnitofWork _uow;

		#endregion

		#region ///constructor ///
		public OrderSubTypeMasterService(IUnitofWork uow, UserManagementService userManagementService)
		{
			_uow = uow;
            _userManagementService = userManagementService;

        }
		#endregion

		#region Method

		/// <summary>
		/// Get all CC Category with department name
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		
		public ServiceResponse<PagedData<OrderSubTypeMasterViewModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<OrderSubTypeMasterViewModel> resultData = new PagedData<OrderSubTypeMasterViewModel>();
                List <UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

				string fromDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("FromDate") ? (model.AdvanceSearchModel["FromDate"].ToString()) : string.Empty) : string.Empty;

				string toDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("ToDate") ? (model.AdvanceSearchModel["ToDate"]).ToString() : string.Empty) : string.Empty;


				PagedData<vwODR_SubTypeMaster> data = GenericGridCall<vwODR_SubTypeMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false && (!string.IsNullOrEmpty(fromDate)? Convert.ToDateTime(x.ModifiedDate).Date >= Convert.ToDateTime( fromDate).Date: true ) && (!string.IsNullOrEmpty(toDate) ? Convert.ToDateTime(x.ModifiedDate).Date <= Convert.ToDateTime(toDate).Date : true) && depIds.Contains(x.DepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vwODR_SubTypeMaster, OrderSubTypeMasterViewModel>()
						 .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"));
				});
				IMapper mapper = config.CreateMapper();
				resultData.Data = mapper.Map(data.Data, resultData.Data);

				PagedData<OrderSubTypeMasterViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

				return SetResultStatus(resultData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<OrderSubTypeMasterViewModel>>(null, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Add new CC Category
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(OrderSubTypeMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<OrderSubTypeMasterModel, tblODR_SubTypeMaster>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblODR_SubTypeMaster data = Mapper.Map<OrderSubTypeMasterModel, tblODR_SubTypeMaster>(model);

				data = await _uow.GenericRepository<tblODR_SubTypeMaster>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblODR_SubTypeMaster>().UpdateAsync(data);
				_uow.save();

				return SetResultStatus(string.Empty, MessageStatus.Save, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Update existing CC Category
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(OrderSubTypeMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.Id > 0)
				{
					tblODR_SubTypeMaster objResult = await _uow.GenericRepository<tblODR_SubTypeMaster>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<OrderSubTypeMasterModel, tblODR_SubTypeMaster>()
							.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblODR_SubTypeMaster>().UpdateAsync(objResult);
						_uow.save();
						return SetResultStatus(string.Empty, MessageStatus.Update, true);
					}
					else
					{
						return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
					}
				}
				else
				{
					return SetResultStatus(objReturn.Data, MessageStatus.InvalidData, false);
				}
			}
			catch (Exception ex)
			{
				return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// get CC Category by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<OrderSubTypeMasterModel> GetById(long id)
		{
			ServiceResponse<OrderSubTypeMasterModel> objReturn = new ServiceResponse<OrderSubTypeMasterModel>();
			try
			{
				tblODR_SubTypeMaster resultData = _uow.GenericRepository<tblODR_SubTypeMaster>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblODR_SubTypeMaster, OrderSubTypeMasterModel>();
					});
					objReturn.Data = Mapper.Map<tblODR_SubTypeMaster, OrderSubTypeMasterModel>(resultData);
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

		/// <summary>
		/// Set Actvive De-Actvive status by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> UpdateStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();

			try
			{
				if (id > 0)
				{
					tblODR_SubTypeMaster objResult = _uow.GenericRepository<tblODR_SubTypeMaster>().GetByID(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblODR_SubTypeMaster>().UpdateAsync(objResult);
						_uow.save();
						return SetResultStatus(string.Empty, MessageStatus.StatusUpdate, true);
					}
					else
					{
						return SetResultStatus(string.Empty, MessageStatus.NoRecord, false);
					}
				}
				else
				{
					return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
				}
			}
			catch (Exception)
			{
				return SetResultStatus(string.Empty, MessageStatus.InvalidData, false);
			}
		}

		#endregion


	}
}
