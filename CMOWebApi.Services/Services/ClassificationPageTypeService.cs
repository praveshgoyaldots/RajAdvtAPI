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
using System.Web;

namespace CMOWebApi.Services.Services
{
	public class ClassificationPageTypeService : BaseService , IClassificationPageTypeService
	{
		#region /// Variable ///

		IUnitofWork _uow;

		#endregion

		#region /// constructor  ///

		public ClassificationPageTypeService(IUnitofWork uow)
		{
			_uow = uow;
		}

		#endregion

		#region Method

		/// <summary>
		/// Get Menu Classification page type List
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public ServiceResponse<PagedData<ClassificationPageTypeModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<ClassificationPageTypeModel> resulData = new PagedData<ClassificationPageTypeModel>();
				PagedData<tblDept_ClassificationPageType> data = GenericGridCall<tblDept_ClassificationPageType>.ListView(model.PageSize, x => x.ModifiedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblDept_ClassificationPageType, ClassificationPageTypeModel>()
						 .ForMember(des => des.NameHindi, src => src.MapFrom(x => !string.IsNullOrEmpty(x.NameHindi) ? x.NameHindi : "--"))
                         .ForMember(des => des.AttachmentURl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.AttachmentURl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.AttachmentURl.Trim())) : string.Empty));
                });
				IMapper mapper = config.CreateMapper();
				resulData.Data = mapper.Map(data.Data, resulData.Data);

				PagedData<ClassificationPageTypeModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

				return SetResultStatus(resulData, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<ClassificationPageTypeModel>>(null, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Add Menu Classification page type
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Create(ClassificationPageTypeModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
                if (!string.IsNullOrEmpty(model.AttachmentURl))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.AttachmentURl, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        model.AttachmentURl = CommonUtility.UploadOrderType(model.AttachmentURl, model.NameEnglish);
                    }
                    else
                    {
                        return isValid;
                    }
                }
                Mapper.Initialize(x =>
				{
					x.CreateMap<ClassificationPageTypeModel, tblDept_ClassificationPageType>()
					.ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
					.ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
					.ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
				});
				tblDept_ClassificationPageType data = Mapper.Map<ClassificationPageTypeModel, tblDept_ClassificationPageType>(model);

				data = await _uow.GenericRepository<tblDept_ClassificationPageType>().AddAsync(data);
				_uow.save();

				data.Code = Convert.ToInt32(data.Id);
				data = await _uow.GenericRepository<tblDept_ClassificationPageType>().UpdateAsync(data);
				_uow.save();

				return SetResultStatus(string.Empty, MessageStatus.Save, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		/// <summary>
		/// Update existing Menu Classification page type
		/// </summary>
		/// <param name="model"></param>
		/// <returns></returns>
		public async Task<ServiceResponse<string>> Edit(ClassificationPageTypeModel model)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();
			try
			{
                model.Id = Convert.ToInt32(model.PageId);

                if (model.Id > 0)
				{
					tblDept_ClassificationPageType objResult = await _uow.GenericRepository<tblDept_ClassificationPageType>().GetByIdAsync(model.Id);
					if (objResult != null)
					{
						var config = new MapperConfiguration(cfg =>
						{
                            cfg.CreateMap<ClassificationPageTypeModel, tblDept_ClassificationPageType>()
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                            .ForMember(dest => dest.AttachmentURl, opt => opt.MapFrom(src => string.IsNullOrEmpty(model.AttachmentURl) ? CommonUtility.RemoveExistingFile(objResult.AttachmentURl, true) ? "" : "" : CommonUtility.UploadOrderType(model.AttachmentURl, model.NameEnglish, objResult.AttachmentURl)));
                        });
						IMapper mapper = config.CreateMapper();
						objResult = mapper.Map(model, objResult);
						objResult = await _uow.GenericRepository<tblDept_ClassificationPageType>().UpdateAsync(objResult);
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
				return SetResultStatus(objReturn.Data, objReturn.Message = !string.IsNullOrEmpty(ex.InnerException.InnerException.Message) ? ex.InnerException.InnerException.Message : (!string.IsNullOrEmpty(ex.InnerException.Message) ? ex.InnerException.Message : ex.Message), false);
			}
		}

		/// <summary>
		/// Get Menu Classification page type by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<ClassificationPageTypeViewModel> GetById(long id)
		{
			ServiceResponse<ClassificationPageTypeViewModel> objReturn = new ServiceResponse<ClassificationPageTypeViewModel>();
			try
			{
				tblDept_ClassificationPageType resultData = _uow.GenericRepository<tblDept_ClassificationPageType>().GetByID(id);
				if (resultData != null)
				{
					Mapper.Initialize(x =>
					{
                        x.CreateMap<tblDept_ClassificationPageType, ClassificationPageTypeViewModel>()
                        .ForMember(dest => dest.PageId, opt => opt.MapFrom(src => src.Id))
                         .ForMember(dest => dest.Id, opt => opt.MapFrom(src => 0))
                        .ForMember(dest => dest.Attachment, opt => opt.MapFrom(src => src.AttachmentURl))
                        .ForMember(des => des.AttachmentURl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.AttachmentURl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.AttachmentURl.Trim())) : string.Empty));
					});
					objReturn.Data = Mapper.Map<tblDept_ClassificationPageType, ClassificationPageTypeViewModel>(resultData);
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
					tblDept_ClassificationPageType objResult = _uow.GenericRepository<tblDept_ClassificationPageType>().GetByID(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblDept_ClassificationPageType>().UpdateAsync(objResult);
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
