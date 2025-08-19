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

namespace CMOWebApi.Services.Services
{
	public class HelpDocumentTypeMasterService : BaseService , IHelpDocumentTypeMasterService
	{
		#region /// Variable ///

		IUnitofWork _uow;

		#endregion

		#region /// constructor  ///

		public HelpDocumentTypeMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		#endregion

		#region Method

		/// <summary>
		/// Get Help Document List
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<HelpDocumentTypeMasterModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<HelpDocumentTypeMasterModel> resulData = new PagedData<HelpDocumentTypeMasterModel>();
				PagedData<tblHelpDocumentType> data = GenericGridCall<tblHelpDocumentType>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblHelpDocumentType, HelpDocumentTypeMasterModel>()
						 .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"));
				});
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);

				PagedData<HelpDocumentTypeMasterModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				return SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<HelpDocumentTypeMasterModel>>(null, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Add Help Document
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(HelpDocumentTypeMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				Mapper.Initialize(x =>
				{
					x.CreateMap<HelpDocumentTypeMasterModel, tblHelpDocumentType>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblHelpDocumentType data = Mapper.Map<HelpDocumentTypeMasterModel, tblHelpDocumentType>(model);

				data = await _uow.GenericRepository<tblHelpDocumentType>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblHelpDocumentType>().UpdateAsync(data);
				_uow.save();

				return SetResultStatus(string.Empty, MessageStatus.Save, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Update existing Help Document
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(HelpDocumentTypeMasterModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
				if (model.Id > 0)
				{
					tblHelpDocumentType objResult = await _uow.GenericRepository<tblHelpDocumentType>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
							cfg.CreateMap<HelpDocumentTypeMasterModel, tblHelpDocumentType>()
							.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
							.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
						});
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblHelpDocumentType>().UpdateAsync(objResult);
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
		/// Get Help Document by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<HelpDocumentTypeMasterModel> GetById(long id)
		{
			ServiceResponse<HelpDocumentTypeMasterModel> objReturn = new ServiceResponse<HelpDocumentTypeMasterModel>();
			try
			{
				tblHelpDocumentType resultData = _uow.GenericRepository<tblHelpDocumentType>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
						x.CreateMap<tblHelpDocumentType, HelpDocumentTypeMasterModel>();
					});
					objReturn.Data = Mapper.Map<tblHelpDocumentType, HelpDocumentTypeMasterModel>(resultData);
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
					tblHelpDocumentType objResult = _uow.GenericRepository<tblHelpDocumentType>().GetByID(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblHelpDocumentType>().UpdateAsync(objResult);
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
