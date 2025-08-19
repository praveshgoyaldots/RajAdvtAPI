

using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Core.Enums;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.AdminModel;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class PageMasterService : BaseService, IPageMasterService
    {
        #region ///   variable  //
        IUnitofWork _uow;
        #endregion

        #region ///   constructor   ///
        public PageMasterService(IUnitofWork uow)
        {
            _uow = uow;
        }
        #endregion
        #region ///   Method   ///

        public ServiceResponse<PagedData<PageMasterListViewModel>> GetAll(IndexModel model)
        {
            ServiceResponse<PagedData<PageMasterListViewModel>> objReturn = new ServiceResponse<PagedData<PageMasterListViewModel>>();
            try
            {
                PagedData<PageMasterListViewModel> resulData = new PagedData<PageMasterListViewModel>();
                PagedData<vwPageMaster> data = GenericGridCall<vwPageMaster>.ListView(model.PageSize, x => x.PageCode, x => x.IsDelete == false, model.Search, model.OrderBy, model.OrderByAsc, model.Page);
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwPageMaster, PageMasterListViewModel>();
                });
                IMapper mapper = config.CreateMapper();
                resulData.Data = mapper.Map(data.Data, resulData.Data);
                PagedData<PageMasterListViewModel>.ReturnCustomizeData(resulData, model.PageSize, data.TotalRecords);
                objReturn = SetResultStatus(resulData, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                objReturn = SetResultStatus<PagedData<PageMasterListViewModel>>(null, MessageStatus.Error, false);
            }
            return objReturn;
        }
        /// <summary>
        /// Add Update Page Master
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> AddUpdate(PageMasterViewModel model)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                string mappingparamStr = string.Empty;
                List<SqlParameter> param = new List<SqlParameter>();
                mappingparamStr += "@PageCode";
                param.Add(new SqlParameter("PageCode", SqlDbType.Int) { Value = model.PageCode });
                mappingparamStr += ",@ApplicationCode";
                param.Add(new SqlParameter("ApplicationCode", SqlDbType.NVarChar) { Value = model.ApplicationCode });
                mappingparamStr += ",@MenuCode";
                param.Add(new SqlParameter("MenuCode", SqlDbType.Int) { Value = model.MenuCode });
                mappingparamStr += ",@PageTypeCode";
                param.Add(new SqlParameter("PageTypeCode", SqlDbType.Int) { Value = model.PageTypeCode });
                mappingparamStr += ",@PageTitle";
                param.Add(new SqlParameter("PageTitle", SqlDbType.NVarChar) { Value = model.PageTitle });
                mappingparamStr += ",@IsActive";
                param.Add(new SqlParameter("@IsActive", SqlDbType.Bit) { Value = true });
                mappingparamStr += ",@IsDelete";
                param.Add(new SqlParameter("IsDelete", SqlDbType.Bit) { Value = false });
                mappingparamStr += ",@Action";
                param.Add(new SqlParameter("Action", SqlDbType.NVarChar) { Value = model.PageCode > 0 ? DbOperations.Update.GetStringValue() : DbOperations.Insert.GetStringValue() });
				mappingparamStr += ",@IsConnectWithCMIS";
				param.Add(new SqlParameter("@IsConnectWithCMIS", SqlDbType.Bit) { Value = model.IsConnectWithCMIS });
                mappingparamStr += ",@IsVisibleForPermission";
                param.Add(new SqlParameter("@IsVisibleForPermission", SqlDbType.Bit) { Value = model.IsVisibleForPermission });
                spCMO_AddUpdatePageMaster_Result Result = _uow.ExeccuteStoreProcedure<spCMO_AddUpdatePageMaster_Result>("spCMO_AddUpdatePageMaster " + mappingparamStr, param.ToArray()).FirstOrDefault();
                _uow.save();
                if (Result.PageCode > 0)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<PageUrlViewModel, tblPageUrlLookup>()
                        .ForMember(dest => dest.PageCode, opt => opt.MapFrom(src => Result.PageCode));
                    });

                    List<tblPageUrlLookup> lookup = Mapper.Map<List<PageUrlViewModel>, List<tblPageUrlLookup>>(model.UrlList.ToList());
                    foreach (var item in lookup)
                    {
                        await _uow.GenericRepository<tblPageUrlLookup>().AddAsync(item);
                    }
                    _uow.save();

                    if (Result.PageCode > 0)
                    {
                        objReturn = model.PageCode == 0 ? SetResultStatus(Result.PageCode.ToString(), MessageStatus.Create, true) : SetResultStatus(Result.PageCode.ToString(), MessageStatus.Update, true);
                    }
                    else
                    {
                        objReturn = SetResultStatus<string>(null, MessageStatus.Error, false);
                    }
                }
                else
                {
                    objReturn = SetResultStatus<string>(null, MessageStatus.Error, false);
                }
            }
            catch(Exception ex)
            {
                objReturn = SetResultStatus(string.Empty, MessageStatus.Error, false);
            }

            return objReturn;
        }
        /// <summary>
        /// Get Detail of Page Master
        /// </summary>
        /// <param name="id">office Id</param>
        public ServiceResponse<PageMasterViewModel> GetById(long id)
        {
            ServiceResponse<PageMasterViewModel> objReturn = new ServiceResponse<PageMasterViewModel>();
            try
            {
                vwPageMaster objData = _uow.GenericRepository<vwPageMaster>().GetAll(filter: x => x.PageCode == id).FirstOrDefault();
                List<tblPageUrlLookup> objUrls = _uow.GenericRepository<tblPageUrlLookup>().GetAll(filter: x => x.PageCode == objData.PageCode).ToList();

                if (objData != null)
                {
                    Mapper.Initialize(x =>
                    {
                        x.CreateMap<vwPageMaster, PageMasterViewModel>();
                        x.CreateMap<tblPageUrlLookup, PageUrlViewModel>();
                    });
                    objReturn.Data = Mapper.Map<vwPageMaster, PageMasterViewModel>(objData);
                    objReturn.Data.UrlList = Mapper.Map<List<tblPageUrlLookup>, List<PageUrlViewModel>>(objUrls);

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
        /// Update Delete Status
        /// If RECORD Is deleted=true then false else true
        /// </summary>
        /// <param name="userId">user Id</param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateDeleteStatus(int pageCode)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblPageMaster objData = _uow.GenericRepository<tblPageMaster>().GetAll(filter: x => x.PageCode == pageCode).FirstOrDefault();
                if (objData != null)
                {
                    objData.IsDelete = !objData.IsDelete;
                    await _uow.GenericRepository<tblPageMaster>().UpdateAsync(objData);
                    _uow.save();
                    objReturn = SetResultStatus(objData.PageCode.ToString(), MessageStatus.Update, true);
                }
                else
                {
                    objReturn = SetResultStatus(string.Empty, MessageStatus.NotExist, true);
                    objReturn.Data = null;
                }
            }
            catch (Exception ex)
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;

        }
        /// <summary>
        /// Update Active Status
        /// If user Is Activated=true then false else true
        /// </summary>
        /// <param name="pageCode">user Id</param>
        /// <returns></returns>
        public async Task<ServiceResponse<string>> UpdateActiveStatus(int pageCode)
        {
            ServiceResponse<string> objReturn = new ServiceResponse<string>();
            try
            {
                tblPageMaster objData = _uow.GenericRepository<tblPageMaster>().GetAll().FirstOrDefault(x => x.PageCode == pageCode);
                if (objData != null)
                {
                    objData.IsActive = !objData.IsActive;
                    await _uow.GenericRepository<tblPageMaster>().UpdateAsync(objData);
                    _uow.save();
                    objReturn = SetResultStatus(objData.PageCode.ToString(), MessageStatus.StatusUpdate, true);
                }
                else
                {
                    objReturn = SetResultStatus(string.Empty, MessageStatus.NotExist, true);
                    objReturn.Data = null;
                }
            }
            catch (Exception ex)
            {
                objReturn.Message = MessageStatus.Error;
                objReturn.IsSuccess = false;
            }
            return objReturn;

        }



        #endregion
    }
}
