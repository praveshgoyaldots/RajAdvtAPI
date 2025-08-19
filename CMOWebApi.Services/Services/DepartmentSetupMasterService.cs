using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel.MasterModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using static CMOWebApi.Core.Enums.FixedValues;

namespace CMOWebApi.Services.Services
{
    public class DepartmentSetupMasterService : BaseService, IDepartmentSetupMasterService
    {
        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;
        private readonly string _dptPath = FilePath.DptSetupLocation.GetStringValue();
        public DepartmentSetupMasterService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _uow = uow;
            _userManagementService = userManagementService;
        }

        public ServiceResponse<PagedData<DepartmentSetupViewModel>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<DepartmentSetupViewModel> responseList = new PagedData<DepartmentSetupViewModel>();
                PagedData<vwODR_GNRT_DepartmentSetupMaster> objList = GenericGridCall<vwODR_GNRT_DepartmentSetupMaster>.ListView(model.PageSize, x => x.CreatedDate, x => x.IsDeleted == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwODR_GNRT_DepartmentSetupMaster, DepartmentSetupViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);



                return SetResultStatus(responseList, MessageStatus.Success, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<DepartmentSetupViewModel>>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<DepartmentSetupModel>> GetById(long id)
        {
            try
            {
                tblODR_GNRT_DepartmentSetupMaster advCategory = await _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().GetByIdAsync(id);

                DepartmentSetupModel result = new DepartmentSetupModel();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblODR_GNRT_DepartmentSetupMaster, DepartmentSetupModel>()
                    .ForMember(des => des.Logo1, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo1) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(_dptPath + x.Logo1))) : string.Empty))
                    .ForMember(des => des.Logo2, src => src.MapFrom(x => !string.IsNullOrEmpty(x.Logo2) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(_dptPath + x.Logo2))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(advCategory, result);

                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<DepartmentSetupModel>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<string>> Create(DepartmentSetupModel model)
        {
            try
            {
                if (!string.IsNullOrEmpty(model.Logo1))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Logo1, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        string path = HttpContext.Current.Server.MapPath(_dptPath);
                        model.Logo1 = CommonUtility.SaveFileFromBase64str(model.Logo1, path);
                    }
                    else
                    {
                        return isValid;
                    }

                }
                if (!string.IsNullOrEmpty(model.Logo2))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Logo2, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        string path = HttpContext.Current.Server.MapPath(_dptPath);
                        model.Logo2 = CommonUtility.SaveFileFromBase64str(model.Logo2, path);
                    }
                    else
                    {
                        return isValid;
                    }

                }

                Mapper.Initialize(x =>
                {
                    x.CreateMap<DepartmentSetupModel, tblODR_GNRT_DepartmentSetupMaster>();
                });
                tblODR_GNRT_DepartmentSetupMaster obj = Mapper.Map<DepartmentSetupModel, tblODR_GNRT_DepartmentSetupMaster>(model);
                obj.CreatedDate = DateTime.Now;
                await _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().AddAsync(obj);
                _uow.save();

                obj.Code = obj.Id;
                await _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().UpdateAsync(obj);
                _uow.save();

                return SetResultStatus(string.Empty, MessageStatus.Create, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> Edit(DepartmentSetupModel model)
        {
            try
            {
                tblODR_GNRT_DepartmentSetupMaster obj = await _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().GetByIdAsync(model.Id);
                if (!string.IsNullOrEmpty(model.Logo1))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Logo1, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        string path = HttpContext.Current.Server.MapPath(_dptPath);
                        model.Logo1 = CommonUtility.SaveFileFromBase64str(model.Logo1, path);
                    }
                    else
                    {
                        return isValid;
                    }

                }
                if (!string.IsNullOrEmpty(model.Logo2))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.Logo2, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        string path = HttpContext.Current.Server.MapPath(_dptPath);
                        model.Logo2 = CommonUtility.SaveFileFromBase64str(model.Logo2, path);
                    }
                    else
                    {
                        return isValid;
                    }

                }
                var logo1Prev = obj.Logo1;
                var logo2Prev = obj.Logo2;
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<DepartmentSetupModel, tblODR_GNRT_DepartmentSetupMaster>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;

                await _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().UpdateAsync(obj);
                _uow.save();

                if (!string.IsNullOrEmpty(logo1Prev))
                {
                    CommonUtility.DeleteExistingFile(System.Web.HttpContext.Current.Server.MapPath(_dptPath) + logo1Prev);
                }
                if (!string.IsNullOrEmpty(logo2Prev))
                {
                    CommonUtility.DeleteExistingFile(System.Web.HttpContext.Current.Server.MapPath(_dptPath) + logo2Prev);
                }
                return SetResultStatus(string.Empty, MessageStatus.Update, true);
            }
            catch
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

        }

        public Boolean IsDepartmentNotAvailable(int? dpt = 0, long id = 0)
        {
            try
            {
                if (dpt > 0)
                {
                    List<tblODR_GNRT_DepartmentSetupMaster> obj = _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().GetAll(filter: x => x.DepartmentCode == dpt && x.IsDeleted == false && (id > 0 ? x.Id != id : true)).ToList();
                    return obj.Count > 0 ? false : true;
                }
                else
                {
                    return false;
                }

            }
            catch
            {
                return false;
            }
        }

        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblODR_GNRT_DepartmentSetupMaster objResult = await _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().UpdateAsync(objResult);
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

        public ServiceResponse<DepartmentSetupCancellationModel> GetByLoggedInDepartment()
        {
            try
            {
                //Get Logged In user department
                var department = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data.FirstOrDefault();

                tblODR_GNRT_DepartmentSetupMaster dptSetup = _uow.GenericRepository<tblODR_GNRT_DepartmentSetupMaster>().GetAll(filter: x => x.DepartmentCode == department.DepartmentCode).FirstOrDefault();

                DepartmentSetupCancellationModel result = new DepartmentSetupCancellationModel();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblODR_GNRT_DepartmentSetupMaster, DepartmentSetupCancellationModel>();
                });
                IMapper mapper = config.CreateMapper();
                result = mapper.Map(dptSetup, result);

                return SetResultStatus(result, MessageStatus.Success, true);
            }
            catch
            {
                return SetResultStatus<DepartmentSetupCancellationModel>(null, MessageStatus.Error, false);
            }

        }
    }
}
