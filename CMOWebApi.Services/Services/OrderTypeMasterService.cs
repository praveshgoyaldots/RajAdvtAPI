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
using System.Web;

namespace CMOWebApi.Services.Services
{
    public class OrderTypeMasterService : BaseService, IOrderTypeMasterService
    {
        #region /// Variable ///

        IUnitofWork _uow;

        #endregion

        #region /// Constructor  ///

        public OrderTypeMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }

        #endregion

        #region /// Methods ///

        /// <summary>
        /// Craete new Order Type Master 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Create(OrderTypeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {

                if (!string.IsNullOrEmpty(model.ImagePath))
                {
                    var isValid = CommonUtility.IsAllowedMimeType(model.ImagePath, false, _loginUserDetail.FileSize);
                    if (isValid.IsSuccess)
                    {
                        model.ImagePath = CommonUtility.UploadOrderType(model.ImagePath, model.Name);
                    }
                    else
                    {
                        return isValid;
                    }
                }

                Mapper.Initialize(x =>
                {
                    x.CreateMap<OrderTypeModel, tblOrderTypeMaster>()
                    .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                    .ForMember(dest => dest.CreatedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                    .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId));
                });
                tblOrderTypeMaster data = Mapper.Map<OrderTypeModel, tblOrderTypeMaster>(model);

                data = await _uow.GenericRepository<tblOrderTypeMaster>().AddAsync(data);
                _uow.save();

                data.Code = Convert.ToInt32(data.Id);
                data = await _uow.GenericRepository<tblOrderTypeMaster>().UpdateAsync(data);
                _uow.save();
                ///save record of department, district from lookup table.
                if (model.GeneralDepartmentDistrictMappingList != null && model.GeneralDepartmentDistrictMappingList.Count > 0)
                {
                    foreach (var item in model.GeneralDepartmentDistrictMappingList)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblOrderTypeMasterDistrictDepartmentMappingLookUp obj = new tblOrderTypeMasterDistrictDepartmentMappingLookUp();
                            obj.OrderTypeId = data.Id;
                            obj.DepartmentCode = Convert.ToInt32(item);
                            await _uow.GenericRepository<tblOrderTypeMasterDistrictDepartmentMappingLookUp>().AddAsync(obj);
                        }
                    }

                }
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
        /// Update existing Order Type Master 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> Edit(OrderTypeModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                if (model.Id > 0)
                {
                    tblOrderTypeMaster objResult = await _uow.GenericRepository<tblOrderTypeMaster>().GetByIdAsync(model.Id);
                    if (objResult != null)
                    {
                        var config = new MapperConfiguration(cfg =>
                        {
                            cfg.CreateMap<OrderTypeModel, tblOrderTypeMaster>()
                             .ForMember(dest => dest.ModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                             .ForMember(dest => dest.ModifiedBy, opt => opt.MapFrom(src => _loginUserDetail.UserId))
                             .ForMember(dest => dest.ImagePath, opt => opt.MapFrom(src => string.IsNullOrEmpty(model.ImagePath) ? CommonUtility.RemoveExistingFile(objResult.ImagePath, true) ? "" : "" : CommonUtility.UploadOrderType(model.ImagePath, model.Name, objResult.ImagePath)));
                        });
                        IMapper mapper = config.CreateMapper();
                        objResult = mapper.Map(model, objResult);
                        objResult = await _uow.GenericRepository<tblOrderTypeMaster>().UpdateAsync(objResult);
                        _uow.save();
                        ///First record delete from child table.
                        if (objResult.tblOrderTypeMasterDistrictDepartmentMappingLookUps.Count() > 0)
                        {
                            _uow.GenericRepository<tblOrderTypeMasterDistrictDepartmentMappingLookUp>().DeleteAllById(objResult.tblOrderTypeMasterDistrictDepartmentMappingLookUps.ToList());
                        }
                        ///save record of department, district from lookup table.
                        if (model.GeneralDepartmentDistrictMappingList != null && model.GeneralDepartmentDistrictMappingList.Count > 0)
                        {
                            foreach (var item in model.GeneralDepartmentDistrictMappingList)
                            {
                                if (!string.IsNullOrEmpty(item))
                                {
                                    tblOrderTypeMasterDistrictDepartmentMappingLookUp obj = new tblOrderTypeMasterDistrictDepartmentMappingLookUp();
                                    obj.OrderTypeId = objResult.Id;
                                    obj.DepartmentCode = Convert.ToInt32(item);
                                    await _uow.GenericRepository<tblOrderTypeMasterDistrictDepartmentMappingLookUp>().AddAsync(obj);
                                }
                            }

                        }
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
        /// Get all Order Type Master 
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public ServiceResponse<PagedData<OrderTypeModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<OrderTypeModel>> objReturn = new ServiceResponse<PagedData<OrderTypeModel>>();
            try
            {
                PagedData<OrderTypeModel> resulData = new PagedData<OrderTypeModel>();
                PagedData<tblOrderTypeMaster> data = GenericGridCall<tblOrderTypeMaster>.ListView(model.PageSize, x => x.Name, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<tblOrderTypeMaster, OrderTypeModel>()
                    .ForMember(des => des.ImagePath, src => src.MapFrom(mdlSrc => !string.IsNullOrEmpty(mdlSrc.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(mdlSrc.ImagePath))) : string.Empty));
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<OrderTypeModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);

                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<OrderTypeModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }

        /// <summary>
        /// Order Type Master  by Id(Primary key)
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        public ServiceResponse<OrderTypeModel> GetById(long id)
        {
            ServiceResponse<OrderTypeModel> objReturn = new ServiceResponse<OrderTypeModel>();
            try
            {
                tblOrderTypeMaster resultData = _uow.GenericRepository<tblOrderTypeMaster>().GetAll(filter: x => x.Code == id).FirstOrDefault();
                if (resultData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<tblOrderTypeMaster, OrderTypeModel>()
                        .ForMember(des => des.ImagePath, src => src.MapFrom(f => !string.IsNullOrEmpty(f.ImagePath) ? (CommonUtility.GetBase64strFromFilePath(HttpContext.Current.Server.MapPath(f.ImagePath))) : string.Empty));
                    });
                    objReturn.Data = Mapper.Map<tblOrderTypeMaster, OrderTypeModel>(resultData);

                    objReturn.Data.GeneralDepartmentDistrictMappingList = resultData.tblOrderTypeMasterDistrictDepartmentMappingLookUps.Select(x => Convert.ToString(x.DepartmentCode)).ToList();

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
                    tblOrderTypeMaster objResult = await _uow.GenericRepository<tblOrderTypeMaster>().GetByIdAsync(id);
                    if (objResult != null)
                    {
                        objResult.IsActive = !objResult.IsActive;
                        await _uow.GenericRepository<tblOrderTypeMaster>().UpdateAsync(objResult);
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
        #endregion
    }
}
