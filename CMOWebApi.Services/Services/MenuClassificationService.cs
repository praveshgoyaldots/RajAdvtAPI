using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
	public class MenuClassificationService : BaseService, IMenuClassificationService
	{
		#region /// Variable ///

		IUnitofWork _uow;

		#endregion

		#region /// constructor  ///

		public MenuClassificationService(IUnitofWork uow)
		{
			_uow = uow;
		}

		#endregion

		#region Method

		/// <summary>
		/// Get Menu Classification List
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<MenuClassificationModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<MenuClassificationModel> resulData = new PagedData<MenuClassificationModel>();
				PagedData<tblDept_MenuClassification> data = GenericGridCall<tblDept_MenuClassification>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblDept_MenuClassification, MenuClassificationModel>()
						 .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"));
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);

				PagedData<MenuClassificationModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				return SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<MenuClassificationModel>>(null, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Add Menu Classification
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(MenuClassificationModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<MenuClassificationModel, tblDept_MenuClassification>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblDept_MenuClassification data = Mapper.Map<MenuClassificationModel, tblDept_MenuClassification>(model);

				data = await _uow.GenericRepository<tblDept_MenuClassification>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblDept_MenuClassification>().UpdateAsync(data);
				
				/// this condition for saving record from child table of checkbox value
				if (model.MenuTypeMappingList != null && model.MenuTypeMappingList.Count > 0)
				{
					foreach (var item in model.MenuTypeMappingList)
					{
						if (!string.IsNullOrEmpty(item))
						{
							tblDept_MenuClassificationMappingLookUp obj = new tblDept_MenuClassificationMappingLookUp();
							obj.MenuClassificationId = data.Id;
							obj.ClassificationTypeCode = Convert.ToInt32(item);
							await _uow.GenericRepository<tblDept_MenuClassificationMappingLookUp>().AddAsync(obj);
						}
					}

				}
				_uow.save();

				return SetResultStatus(string.Empty, MessageStatus.Save, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Update existing Menu Classification
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(MenuClassificationModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.Id > 0)
				{
					tblDept_MenuClassification objResult = await _uow.GenericRepository<tblDept_MenuClassification>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<MenuClassificationModel, tblDept_MenuClassification>()
							.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblDept_MenuClassification>().UpdateAsync(objResult);
					
						/// this condition for saving record from child table of checkbox value
						if (model.MenuTypeMappingList != null && model.MenuTypeMappingList.Count > 0)
						{
							foreach (var item in model.MenuTypeMappingList)
							{
								if (!string.IsNullOrEmpty(item))
								{
									tblDept_MenuClassificationMappingLookUp obj = new tblDept_MenuClassificationMappingLookUp();
									obj.MenuClassificationId = objResult.Id;
									obj.ClassificationTypeCode = Convert.ToInt32(item);
									await _uow.GenericRepository<tblDept_MenuClassificationMappingLookUp>().AddAsync(obj);
								}
							}

						}
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
		/// Get Menu Classification by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<MenuClassificationModel> GetById(long id)
		{
			ServiceResponse<MenuClassificationModel> objReturn = new ServiceResponse<MenuClassificationModel>();
			try
			{
				tblDept_MenuClassification resultData = _uow.GenericRepository<tblDept_MenuClassification>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblDept_MenuClassification, MenuClassificationModel>();
					});
					objReturn.Data = Mapper.Map<tblDept_MenuClassification, MenuClassificationModel>(resultData);

					objReturn.Data.MenuTypeMappingList = resultData.tblDept_MenuClassificationMappingLookUp.Select(x => Convert.ToString(x.ClassificationTypeCode)).ToList();

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
					tblDept_MenuClassification objResult = _uow.GenericRepository<tblDept_MenuClassification>().GetByID(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblDept_MenuClassification>().UpdateAsync(objResult);
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
