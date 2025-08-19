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
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class OfficeMasterService : BaseService, IOfficeMasterService
    {
        #region ///   variable  //
        private readonly UserManagementService _userManagementService;
        IUnitofWork _uow;
        #endregion

        #region ///   constructor   ///
        public OfficeMasterService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _userManagementService = userManagementService;
            _uow = uow;
        }
        #endregion

        #region ///   Method   ///
        /// <summary>
        /// Get All Office data in list Format
        /// </summary>
        /// <param name="model"> default value: Page=1; PageSize = 10;OrderByAsc = 1;</param>
        /// <returns>PagedData<OfficeMasterViewModel></returns>
        public ServiceResponse<PagedData<OfficeMasterViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<OfficeMasterViewModel>> objReturn = new ServiceResponse<PagedData<OfficeMasterViewModel>>();
            try
            {
                //PagedData<OfficeMasterViewModel> resulData = new PagedData<OfficeMasterViewModel>();

                //List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                //var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                //PagedData<vwOfficeMaster> data = GenericGridCall<vwOfficeMaster>.ListView(model.PageSize, x => x.OfficeShortName, x => x.IsDelete == false && depIds.Contains(x.DepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                //var config = new MapperConfiguration(cfg =>
                //{
                //    cfg.CreateMap<vwOfficeMaster, OfficeMasterViewModel>();
                //});
                //IMapper mapper = config.CreateMapper();
                //resulData.Data = mapper.Map(data.Data, resulData.Data);
                //PagedData<OfficeMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                //objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
                string fromDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("CreatedFrom") ? (model.AdvanceSearchModel["CreatedFrom"].ToString()) : string.Empty) : string.Empty;

                string toDate = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("CreatedTo") ? (model.AdvanceSearchModel["CreatedTo"].ToString()) : string.Empty) : string.Empty;

                PagedData<OfficeMasterViewModel> resulData = new PagedData<OfficeMasterViewModel>();
                object[] spParam = new object[9];
                spParam[0] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("Userid") ? Convert.ToInt32(model.AdvanceSearchModel["Userid"].ToString()) : 0) : 0;
                spParam[1] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("DepartmentCode") ? Convert.ToInt32(model.AdvanceSearchModel["DepartmentCode"].ToString()) : 0) : 0;
                spParam[2] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("OfficeCode") ? Convert.ToInt32(model.AdvanceSearchModel["OfficeCode"].ToString()) : 0) : 0;
                spParam[3] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("OfficeNameHindi") ? Convert.ToString(model.AdvanceSearchModel["OfficeNameHindi"].ToString()) : string.Empty) : string.Empty;
                spParam[4] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("OfficeShortName") ? Convert.ToString(model.AdvanceSearchModel["OfficeShortName"].ToString()) : string.Empty) : string.Empty;
                spParam[5] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("KeywordSearch") ? Convert.ToString(model.AdvanceSearchModel["KeywordSearch"].ToString()) : string.Empty) : string.Empty;
                spParam[6] = model.AdvanceSearchModel != null && model.AdvanceSearchModel.Count > 0 ? (model.AdvanceSearchModel.ContainsKey("ActiveView") ? Convert.ToBoolean(model.AdvanceSearchModel["ActiveView"].ToString()) : true) : true;
                spParam[7] = Convert.ToDateTime(fromDate).ToString("MM-dd-yyyy");
                spParam[8] = Convert.ToDateTime(toDate).ToString("MM-dd-yyyy");
                model.OrderByAsc = 1;
                PagedData<sp_GetOfficeList_Result> data = GenericGridCall<sp_GetOfficeList_Result>.ListView(spParam, model.PageSize, x => x.OfficeName, model.Search, model.OrderBy, model.OrderByAsc, model.Page);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<sp_GetOfficeList_Result, OfficeMasterViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<OfficeMasterViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);
                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<OfficeMasterViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Add Office 
        /// </summary>
        /// <param name="model">OfficeMasterViewModel </param>
        /// <returns>Id</returns>
        public async Task<ServiceResponse<string>> Add(OfficeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<OfficeMasterViewModel, tblOfficeMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                    .ForMember(dest => dest.IsDelete, opt => opt.MapFrom(src => false));
                });
                tblOfficeMaster data = Mapper.Map<OfficeMasterViewModel, tblOfficeMaster>(model);

                data = await _uow.GenericRepository<tblOfficeMaster>().AddAsync(data);
                _uow.save();

                data.OfficeCode = Convert.ToInt32(data.OfficeId);
                data = await _uow.GenericRepository<tblOfficeMaster>().UpdateAsync(data);
                _uow.save();

                objReturn = SetResultStatus(data.OfficeId.ToString(), MessageStatus.Save, true);
            }
            catch (Exception ex)
            {
                objReturn.Data = null;
                objReturn = SetResultStatus(objReturn.Data, MessageStatus.Error, false);
            }
            return objReturn;
        }
        /// <summary>
        /// Get Detail of Office master
        /// </summary>
        /// <param name="id">office Id</param>
        public async Task<ServiceResponse<OfficeMasterViewModel>> GetById(long id)
        {
            ServiceResponse<OfficeMasterViewModel> objReturn = new ServiceResponse<OfficeMasterViewModel>();
            try
            {
                vwOfficeMaster objOfficeMaster = _uow.GenericRepository<vwOfficeMaster>().GetAll(filter: x => x.OfficeId == id).FirstOrDefault();
                if (objOfficeMaster != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwOfficeMaster, OfficeMasterViewModel>();
                    });
                    objReturn.Data = Mapper.Map<vwOfficeMaster, OfficeMasterViewModel>(objOfficeMaster);
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
        /// Edit Office Detail
        /// </summary>
        /// <param name="model">OfficeMasterViewModel </param>
        /// <returns>Office Id</returns>
        public async Task<ServiceResponse<string>> Edit(OfficeMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.OfficeId > 0)
                {
                    tblOfficeMaster objOfficeMaster = await _uow.GenericRepository<tblOfficeMaster>().GetByIdAsync(model.OfficeId);
                    if (objOfficeMaster != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<OfficeMasterViewModel, tblOfficeMaster>()
                            .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => string.IsNullOrEmpty(objOfficeMaster.CreatedBy.ToString()) ? model.CreatedBy : objOfficeMaster.CreatedBy))
                            .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => string.IsNullOrEmpty(objOfficeMaster.CreatedDate.ToString()) ? DateTime.Now : objOfficeMaster.CreatedDate))
                            .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                            .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => objOfficeMaster.IsActive))
                            .ForMember(dest => dest.IsDelete, opt => opt.MapFrom(src => objOfficeMaster.IsDelete));
                        });
                        IMapper mapper = config.CreateMapper();
                        objOfficeMaster = mapper.Map(model, objOfficeMaster);
                        objOfficeMaster = await _uow.GenericRepository<tblOfficeMaster>().UpdateAsync(objOfficeMaster);
                        _uow.save();
                        objReturn = SetResultStatus(objOfficeMaster.OfficeId.ToString(), MessageStatus.Update, true);
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
        /// Update Active Status
        /// </summary>
        /// <param name="id">office Id </param>
        /// <returns>office id</returns>
        public async Task<ServiceResponse<string>> UpdateActiveStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblOfficeMaster objOfficeMaster = await _uow.GenericRepository<tblOfficeMaster>().GetByIdAsync(id);
                    if (objOfficeMaster != null)
                    {
                        objOfficeMaster.IsActive = !objOfficeMaster.IsActive;
                        await _uow.GenericRepository<tblOfficeMaster>().UpdateAsync(objOfficeMaster);
                        _uow.save();
                        objReturn = SetResultStatus(objOfficeMaster.OfficeId.ToString(), MessageStatus.StatusUpdate, true);
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

        /// <summary>
        /// Update Delete Status
        /// </summary>
        /// <param name="id">office Id </param>
        /// <returns>office id</returns>
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(long id)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();

            try
            {
                if (id > 0)
                {
                    tblOfficeMaster objOfficeMaster = await _uow.GenericRepository<tblOfficeMaster>().GetByIdAsync(id);
                    if (objOfficeMaster != null)
                    {
                        objOfficeMaster.IsDelete = !objOfficeMaster.IsDelete;
                        await _uow.GenericRepository<tblOfficeMaster>().UpdateAsync(objOfficeMaster);
                        _uow.save();
                        objReturn = SetResultStatus(objOfficeMaster.OfficeId.ToString(), MessageStatus.StatusUpdate, true);
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

        public ServiceResponse<object> IsOfficeShortNameExist(string officeShortName)
        {
            ServiceResponse<object> objReturn = new ServiceResponse<object>();
            try
            {
                var office = _uow.GenericRepository<tblOfficeMaster>().GetAll(filter: x => x.IsDelete == false && x.OfficeShortName.ToLower() == officeShortName.ToLower()).FirstOrDefault();
                if (office != null)
                {
                    objReturn = SetResultStatus((object)true, MessageStatus.Exist, true);
                }
                else
                {
                    objReturn = SetResultStatus((object)false, MessageStatus.NotExist, true);
                }
            }
            catch
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;
        }
        #endregion

    }
}
