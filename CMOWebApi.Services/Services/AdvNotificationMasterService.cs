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
using System.Threading.Tasks;
using System.Web.Mvc;
using static CMOWebApi.Core.Enums.AdvUserTypeEnum;

namespace CMOWebApi.Services.Services
{
    public class AdvNotificationMasterService : BaseService, IAdvNotificationMasterService
	{
		IUnitofWork _uow;
		public AdvNotificationMasterService(IUnitofWork uow)
		{
			_uow = uow;
		}

		public ServiceResponse<PagedData<AdvNotificationMasterViewModel>> GetAll(IndexModel model)
		{
			try
			{
				PagedData<AdvNotificationMasterViewModel> responsedata = new PagedData<AdvNotificationMasterViewModel>();

				PagedData<tblADV_NotificationMaster> resultdata = GenericGridCall<tblADV_NotificationMaster>.ListView(model.PageSize, x => x.Name, x => x.IsDelete == false , model.Search, model.OrderBy, model.OrderByAsc, model.Page);

				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblADV_NotificationMaster, AdvNotificationMasterViewModel>();
				});
				IMapper mapper = config.CreateMapper();
				responsedata.Data = mapper.Map(resultdata.Data, responsedata.Data);

				responsedata.TotalRecords = resultdata.TotalRecords;
				responsedata.PageSize = model.PageSize;

				return SetResultStatus<PagedData<AdvNotificationMasterViewModel>>(responsedata, MessageStatus.Success, true);
			}
			catch (Exception ex)
			{
				return SetResultStatus<PagedData<AdvNotificationMasterViewModel>>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<AdvNotificationMasterModel>> GetById(long id)
		{
			try
			{
				tblADV_NotificationMaster advDetail = await _uow.GenericRepository<tblADV_NotificationMaster>().GetByIdAsync(id);

				AdvNotificationMasterModel obj = new AdvNotificationMasterModel();
				var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<tblADV_NotificationMaster, AdvNotificationMasterModel>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(advDetail, obj);

				return SetResultStatus(obj, MessageStatus.Update, true);
			}
			catch(Exception ex)
			{
				return SetResultStatus<AdvNotificationMasterModel>(null, MessageStatus.Error, false);
			}

		}

		public async Task<ServiceResponse<string>> Create(AdvNotificationMasterModel model)
		{
			ServiceResponse<tblADV_NotificationMaster> objReturn = new ServiceResponse<tblADV_NotificationMaster>();
			try
			{

				model.IsActive = true;
				model.IsDelete = false;
				Mapper.Initialize(x =>
				{
					x.CreateMap<AdvNotificationMasterModel, tblADV_NotificationMaster>();
				});

				var platform = Mapper.Map<AdvNotificationMasterModel,tblADV_NotificationMaster>(model);

                if (model.IsPullOrPushCode>0)
                {
                    if (model.IsPullOrPushCode == Convert.ToInt32(AdvNotificationPullPush.Pull))
                    {
                        model.PushPassword = null;
                        model.PushURL = null;
                        model.PushUserId = null;
                    }
                    else
                    {
                        model.PullPassword = null;
                        model.PullUserId = null;
                    }
                }
                else
                {
                    model.PushPassword = null;
                    model.PushURL = null;
                    model.PushUserId = null;
                    model.PullPassword = null;
                    model.PullUserId = null;
                }
                model.CreatedDate = DateTime.Now;
				await _uow.GenericRepository<tblADV_NotificationMaster>().AddAsync(platform);
				_uow.save();

				platform.Code = platform.Id;
				await _uow.GenericRepository<tblADV_NotificationMaster>().UpdateAsync(platform);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Success, true);

			}
			catch (Exception ex)
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}
		}

		public async Task<ServiceResponse<string>> Edit(AdvNotificationMasterModel model)
		{
			ServiceResponse<tblADV_NotificationMaster> objReturn = new ServiceResponse<tblADV_NotificationMaster>();
			try
			{
				tblADV_NotificationMaster obj = await _uow.GenericRepository<tblADV_NotificationMaster>().GetByIdAsync(model.Id);

                if (model.IsPullOrPushCode > 0)
                {
                    if (model.IsPullOrPushCode == Convert.ToInt32(AdvNotificationPullPush.Pull))
                    {
                        model.PushPassword = null;
                        model.PushURL = null;
                        model.PushUserId = null;
                    }
                    else
                    {
                        model.PullPassword = null;
                        model.PullUserId = null;
                    }
                }
                else
                {
                    model.PushPassword = null;
                    model.PushURL = null;
                    model.PushUserId = null;
                    model.PullPassword = null;
                    model.PullUserId = null;
                }
                model.ModifiedDate = DateTime.Now;

                var config = new MapperConfiguration(cfg =>
				{
					cfg.CreateMap<AdvNotificationMasterModel, tblADV_NotificationMaster>();
				});
				IMapper mapper = config.CreateMapper();
				obj = mapper.Map(model, obj);

				await _uow.GenericRepository<tblADV_NotificationMaster>().UpdateAsync(obj);
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
				tblADV_NotificationMaster cObj = await _uow.GenericRepository<tblADV_NotificationMaster>().GetByIdAsync(id);
				cObj.IsActive = false;
				cObj.IsDelete = true;
				await _uow.GenericRepository<tblADV_NotificationMaster>().UpdateAsync(cObj);
				_uow.save();
				return SetResultStatus(string.Empty, MessageStatus.Delete, true);
			}
			catch
			{
				return SetResultStatus(string.Empty, MessageStatus.Error, false);
			}

		}

		public  ServiceResponse<List<SelectListItem>> GetAdvertisementDepartmentMasterType(long id) 
		{
			try
			{
                if (id > 0)
                {
                    List<SelectListItem> result = _uow.GenericRepository<tblDepartmentMaster>().GetAll(orderBy: o => o.OrderBy(x => x.DepartmentTitle), filter: x => x.DepartmentIsActive == true && x.Department_AdmDepartmentCode == id).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();  ///TODO

                     return SetResultStatus(result, MessageStatus.Success, true);
                }
                else
                {
                    List<SelectListItem> result = _uow.GenericRepository<tblDepartmentMaster>().GetAll(orderBy: o => o.OrderBy(x => x.DepartmentTitle), filter: x => x.DepartmentIsActive == true).Select(x => new SelectListItem { Value = x.DepartmentCode.ToString(), Text = x.DepartmentTitle }).ToList();

                    return SetResultStatus(result, MessageStatus.Update, true);
                }


            }
            catch
			{
				return null;
			}
		}

		public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
		{
			ServiceResponse<string> objReturn = new ServiceResponse<string>();

			try
			{
				if (id > 0)
				{
					tblADV_NotificationMaster objResult = await _uow.GenericRepository<tblADV_NotificationMaster>().GetByIdAsync(id);
					if (objResult != null)
					{
						objResult.IsActive = !objResult.IsActive;
						await _uow.GenericRepository<tblADV_NotificationMaster>().UpdateAsync(objResult);
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
