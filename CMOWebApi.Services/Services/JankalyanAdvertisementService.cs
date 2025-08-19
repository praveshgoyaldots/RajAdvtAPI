using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.ExtensionMethods;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.Services
{
	public class JankalyanAdvertisementService : BaseService , IJankalyanAdvertisementService
	{
		#region /// Variable ///

		IUnitofWork _uow;

		#endregion

		#region /// Constructor  ///

		public JankalyanAdvertisementService(IUnitofWork uow)
		{
			_uow = uow;
		}

		#endregion

		#region /// Methods ///

		/// <summary>
		/// Craete new jankalyan adervertisement 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(ADVTJankalyanAdvertisementModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (!string.IsNullOrEmpty(model.ImageIcon))
				{
					var isValid = CommonUtility.IsAllowedMimeType(model.ImageIcon, false, _loginUserDetail.FileSize);
					if (isValid.IsSuccess)
					{
						model.ImageIcon = CommonUtility.UploadAdvertisement(model.ImageIcon, model.Id);
					}
					else
					{
						return isValid;
					}
				}

				Mapper.Initialize(x =>
				{
					x.CreateMap<ADVTJankalyanAdvertisementModel, tblJAN_ADVT_Jankalyan_Advertisement>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblJAN_ADVT_Jankalyan_Advertisement data = Mapper.Map<ADVTJankalyanAdvertisementModel, tblJAN_ADVT_Jankalyan_Advertisement>(model);

				data = await _uow.GenericRepository<tblJAN_ADVT_Jankalyan_Advertisement>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblJAN_ADVT_Jankalyan_Advertisement>().UpdateAsync(data);
				_uow.save();

				objReturn = SetResultStatus(data.Id.ToString(), MessageStatus.Save, true);
			}
			catch (Exception ex)
			{
				objReturn.Data = null;
				objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// Update existing jankalyan adervertisement 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(ADVTJankalyanAdvertisementModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.Id > 0)
				{

					tblJAN_ADVT_Jankalyan_Advertisement objResult = await _uow.GenericRepository<tblJAN_ADVT_Jankalyan_Advertisement>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						
						if (!string.IsNullOrEmpty(model.ImageIcon))
						{
							var isValid = CommonUtility.IsAllowedMimeType(model.ImageIcon, false, _loginUserDetail.FileSize);
							if (isValid.IsSuccess)
							{
								model.ImageIcon = CommonUtility.UploadAdvertisement(model.ImageIcon, model.Id);
							}
							else
							{
								return isValid;
							}
						}

						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<ADVTJankalyanAdvertisementModel, tblJAN_ADVT_Jankalyan_Advertisement>()
							 .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							 .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblJAN_ADVT_Jankalyan_Advertisement>().UpdateAsync(objResult);
						_uow.save();

						objReturn = SetResultStatus(objResult.Id.ToString(), MessageStatus.Update, true);
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

		/// <summary>
		/// Get all jankalyan adervertisement 
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<ADVTJankalyanAdvertisementModel>> GetAll(IndexModel model)
		{
			ServiceResponse<PagedData<ADVTJankalyanAdvertisementModel>> objReturn = new ServiceResponse<PagedData<ADVTJankalyanAdvertisementModel>>();
			try
			{
				PagedData<ADVTJankalyanAdvertisementModel> resulData = new PagedData<ADVTJankalyanAdvertisementModel>();
				PagedData<tblJAN_ADVT_Jankalyan_Advertisement> data = GenericGridCall<tblJAN_ADVT_Jankalyan_Advertisement>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblJAN_ADVT_Jankalyan_Advertisement, ADVTJankalyanAdvertisementModel>();
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);
				PagedData<ADVTJankalyanAdvertisementModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				objReturn = SetResultStatus<PagedData<ADVTJankalyanAdvertisementModel>>(null, MessageStatus.Error, false);
			}
			return objReturn;
		}

		/// <summary>
		/// jankalyan adervertisement  by Id(Primary key)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<ADVTJankalyanAdvertisementModel> GetById(long id)
		{
			ServiceResponse<ADVTJankalyanAdvertisementModel> objReturn = new ServiceResponse<ADVTJankalyanAdvertisementModel>();
			try
			{
				tblJAN_ADVT_Jankalyan_Advertisement resultData = _uow.GenericRepository<tblJAN_ADVT_Jankalyan_Advertisement>().GetAll(filter: x => x.Id == id).FirstOrDefault();
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblJAN_ADVT_Jankalyan_Advertisement, ADVTJankalyanAdvertisementModel>()
						.ForMember(des => des.ImageIcon, src => src.MapFrom(f => !string.IsNullOrEmpty(f.ImageIcon) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.ImageIcon))) : string.Empty));
					});
					objReturn.Data = Mapper.Map<tblJAN_ADVT_Jankalyan_Advertisement, ADVTJankalyanAdvertisementModel>(resultData);
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
		/// Update Status(Active/De-Active)
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (id > 0)
				{
					tblJAN_ADVT_Jankalyan_Advertisement objResult = await _uow.GenericRepository<tblJAN_ADVT_Jankalyan_Advertisement>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblJAN_ADVT_Jankalyan_Advertisement>().UpdateAsync(objResult);
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


		public ServiceResponse<List<ADVTJankalyanAdvertisementModel>> GetAllJankalyanAdvertisement(long catCode=0,bool isBase64 =false)
		{
			ServiceResponse<List<ADVTJankalyanAdvertisementModel>> objReturn = new ServiceResponse<List<ADVTJankalyanAdvertisementModel>>();
			try
			{
				List<ADVTJankalyanAdvertisementModel> resultData = new List<ADVTJankalyanAdvertisementModel>();

				List<vw_JAN_Jankalyan_Advertisement> objdata = _uow.GenericRepository<vw_JAN_Jankalyan_Advertisement>().GetAll(filter: x => x.IsDeleted == false && x.IsActive == true && (catCode>0? x.AdvertisementPopupCode==catCode:x.DisplayOrder<=1),orderBy:z=>z.OrderBy(o=>o.sortOrder)).ToList();

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<vw_JAN_Jankalyan_Advertisement, ADVTJankalyanAdvertisementModel>()
					 .ForMember(des => des.ImageIcon, src => src.MapFrom(f => !string.IsNullOrEmpty(f.ImageIcon) ? (isBase64 ?(CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.ImageIcon))) : f.ImageIcon.ToAbsolutePath())  : string.Empty));
				});
				IMapper mapper = config.CreateMapper();
				resultData = mapper.Map(objdata, resultData);

				return SetResultStatus<List<ADVTJankalyanAdvertisementModel>>(resultData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<List<ADVTJankalyanAdvertisementModel>>(null, MessageStatus.Error, false); ;
			}

		}


		#endregion
	}
}
