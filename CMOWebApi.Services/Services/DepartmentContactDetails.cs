using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
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
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.UserEnum;

namespace CMOWebApi.Services.Services
{
    public class DepartmentContactDetails : BaseService, IDepartmentContactDetails
    {
        #region /// Variable ///

        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;

        #endregion

        #region /// Cunstroctor  ///

        public DepartmentContactDetails(IUnitofWork uow, UserManagementService userManagementService)
        {
            _uow = uow;
            _userManagementService = userManagementService;
        }

        #endregion

        #region Method

        /// <summary>
        /// Get department contact details List according to their login department
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<DepartmentContactDetailsViewModel>> GetAll(IndexModel model)
        {
            try
            {
                model.PageSize = 101;
                PagedData<DepartmentContactDetailsViewModel> resultData = new PagedData<DepartmentContactDetailsViewModel>();

                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vwJAN_DepartmentContactDetails> data = GenericGridCall<vwJAN_DepartmentContactDetails>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false && depIds.Contains(x.DepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwJAN_DepartmentContactDetails, DepartmentContactDetailsViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData.Data = mapper.Map(data.Data, resultData.Data);

                PagedData<DepartmentContactDetailsViewModel>.ReturnCustomizeData(resultData, model.PageSize, data.TotalRecords);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<DepartmentContactDetailsViewModel>>(null, MessageStatus.Error, false);
            }
        }

		/// <summary>
		/// Get department contact details by Id
		/// </summary>
		/// <param name="id"></param>
		/// <returns></returns>
		public ServiceResponse<DepartmentContactDetailsModel> GetById(long id)
        {
            ServiceResponse<DepartmentContactDetailsModel> objReturn = new ServiceResponse<DepartmentContactDetailsModel>();
            try
            {
                tblJAN_DepartmentContactDetails resultData = _uow.GenericRepository<tblJAN_DepartmentContactDetails>().GetByID(id);
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblJAN_DepartmentContactDetails, DepartmentContactDetailsModel>()
                         .ForMember(des => des.AttachmentUrl, src => src.MapFrom(y => !string.IsNullOrEmpty(y.AttachmentUrl) ? CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(y.AttachmentUrl.Trim())) : string.Empty)); ;
                    });
                    objReturn.Data = Mapper.Map<tblJAN_DepartmentContactDetails, DepartmentContactDetailsModel>(resultData);

                    return SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    return SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Department contact details add and update
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> AddUpdate(DepartmentContactDetailsModel model)
        {
            try
            {
                //if (!string.IsNullOrEmpty(model.AttachmentUrl))
                //{
                //    var isValid = CommonUtility.IsAllowedMimeType(model.AttachmentUrl, false, _loginUserDetail.FileSize);
                //    if (isValid.IsSuccess)
                //    {
                //        model.AttachmentUrl = CommonUtility.DepartmentProfileFolderStructure(model.AttachmentUrl, "DEPTContactDetail");
                //    }
                //    else
                //    {
                //        return isValid;
                //    }
                //}
                ServiceResponse<string> objReturn = new ServiceResponse<string>();
                tblJAN_DepartmentContactDetails obj = new tblJAN_DepartmentContactDetails();

                if (model.Id > 0)
                {
                    obj = _uow.GenericRepository<tblJAN_DepartmentContactDetails>().GetByID(model.Id);
                }
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<DepartmentContactDetailsModel, tblJAN_DepartmentContactDetails>()
                     .ForMember(dest => dest.MobileNo, opt => opt.MapFrom(src => src.MobileNo.TrimEnd(',')))
                     .ForMember(dest => dest.AttachmentUrl, opt => opt.MapFrom(src => string.IsNullOrEmpty(model.AttachmentUrl) ? CommonUtility.RemoveExistingFile(obj.AttachmentUrl, true) ? "" : "" : CommonUtility.DepartmentProfileFolderStructure(model.AttachmentUrl, "DEPTContactDetail",true, obj.AttachmentUrl))); ;
                });

                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);

                if (model.Id > 0)
                {
                    obj.ModifiedDate = DateTime.Now;
                    obj.ModifiedBy = _loginUserDetail.UserId;
                    await _uow.GenericRepository<tblJAN_DepartmentContactDetails>().UpdateAsync(obj);
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.Update, true);
                }
                else
                {
                    obj.CreatedDate = DateTime.Now;
                    obj.CreatedBy = _loginUserDetail.UserId;
                    obj.ModifiedDate = DateTime.Now;
                    obj.ModifiedBy = _loginUserDetail.UserId;
                    await _uow.GenericRepository<tblJAN_DepartmentContactDetails>().AddAsync(obj);
                    _uow.save();
                    obj.Code = obj.Id;
                    _uow.save();
                    return SetResultStatus(string.Empty, MessageStatus.Save, true);
                }
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Update department contact details status
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateStatus(int id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (id > 0)
                {
                    tblJAN_DepartmentContactDetails objResult = _uow.GenericRepository<tblJAN_DepartmentContactDetails>().GetByID(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblJAN_DepartmentContactDetails>().UpdateAsync(objResult);
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

        /// <summary>
		/// Get department website details by code
		/// </summary>
		/// <param name="code"></param>
		/// <returns></returns>
		public ServiceResponse<DepartmentWebsiteDetailsModel> GetDepartmentByCode(int code)
        {
            ServiceResponse<DepartmentWebsiteDetailsModel> objReturn = new ServiceResponse<DepartmentWebsiteDetailsModel>();
            try
            {
                tblDepartmentMaster resultData = _uow.GenericRepository<tblDepartmentMaster>().GetAll(filter:x=>x.DepartmentCode==code).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblDepartmentMaster, DepartmentWebsiteDetailsModel>();
                    });
                    objReturn.Data = Mapper.Map<tblDepartmentMaster, DepartmentWebsiteDetailsModel>(resultData);

                    return SetResultStatus(objReturn.Data, MessageStatus.Success, true);
                }
                else
                {
                    objReturn.Data = null;
                    return SetResultStatus(objReturn.Data, MessageStatus.NoRecord, false);
                }
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                return SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
        }

        /// <summary>
        /// Get department officer contact details by department code for scheme module
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<List<DepartmentContactOfficerModel>> GetDepartmentOfficerByDepartment(int departmentCode)
        {
            try
            {
                var type = UserTypeEnum.DPTO.GetStringValue();
                List<DepartmentContactOfficerModel> resultData = new List<DepartmentContactOfficerModel>();

                List<vwUserDetail> data = _uow.GenericRepository<vwUserDetail>().GetAll(filter: x => x.DepartmentCodes==departmentCode.ToString() && x.UserType.Equals(type)).ToList();

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwUserDetail, DepartmentContactOfficerModel>();
                });
                IMapper mapper = config.CreateMapper();
                resultData = mapper.Map(data, resultData);

                return SetResultStatus(resultData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<List<DepartmentContactOfficerModel>>(null, MessageStatus.Error, false);
            }
        }

        #endregion
    }
}
