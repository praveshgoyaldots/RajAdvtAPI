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
    public class ClientWebService : BaseService, IClientWebService
    {
        #region ///   Variable   ///
        IUnitofWork _uow;
        private readonly UserManagementService _userManagementService;
        #endregion

        public ClientWebService(IUnitofWork uow, UserManagementService userManagementService)
        {
            _uow = uow;
            _userManagementService = userManagementService;
        }
        public async Task<ServiceResponse<string>> Create(ClientWebServiceModel model)
        {
            ServiceResponse<tblClientIdForService> objReturn = new ServiceResponse<tblClientIdForService>();
            try
            {
                Mapper.Initialize(x =>
                {
                    x.CreateMap<ClientWebServiceModel, tblClientIdForService>();
                });
                model.ClientId = CommonUtility.GenerateRandomString();
                model.SSOID = _loginUserDetail.SSOID;
                model.CreatedDate = DateTime.Now;
                var Service = Mapper.Map<ClientWebServiceModel, tblClientIdForService>(model);
                await _uow.GenericRepository<tblClientIdForService>().AddAsync(Service);
                _uow.save();
                if (model.ModuleName != null && model.ModuleName.Count > 0)
                {
                    foreach (var item in model.ModuleName)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblClientIdModuleMapping objModule= new tblClientIdModuleMapping();
                            objModule.ClientIdForService = Service.Id;
                            objModule.ModuleCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblClientIdModuleMapping>().AddAsync(objModule);
                        }
                    }
                }
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Create, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public async Task<ServiceResponse<string>> Edit(ClientWebServiceModel model)
        {
            ServiceResponse<tblClientIdForService> objReturn = new ServiceResponse<tblClientIdForService>();
            try
            {
                tblClientIdForService obj = await _uow.GenericRepository<tblClientIdForService>().GetByIdAsync(model.Id);

                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<ClientWebServiceModel, tblClientIdForService>();
                });
                IMapper mapper = config.CreateMapper();
                obj = mapper.Map(model, obj);
                obj.ModifiedDate = DateTime.Now;
              
                await _uow.GenericRepository<tblClientIdForService>().UpdateAsync(obj);
                _uow.save();
                if (obj.tblClientIdModuleMappings.Count() > 0)
                {
                    _uow.GenericRepository<tblClientIdModuleMapping>().DeleteAllById(obj.tblClientIdModuleMappings.ToList());
                }

                if (model.ModuleName != null && model.ModuleName.Count > 0)
                {
                    foreach (var item in model.ModuleName)
                    {
                        if (!string.IsNullOrEmpty(item))
                        {
                            tblClientIdModuleMapping objModule = new tblClientIdModuleMapping();
                            objModule.ClientIdForService = obj.Id;
                            objModule.ModuleCode = Convert.ToInt64(item);
                            await _uow.GenericRepository<tblClientIdModuleMapping>().AddAsync(objModule);
                        }
                    }
                }
                _uow.save();
                return SetResultStatus(string.Empty, MessageStatus.Update, true);

            }
            catch (Exception ex)
            {
                return SetResultStatus(string.Empty, MessageStatus.Error, false);
            }
        }

        public ServiceResponse<PagedData<ClientModuleViewDetail>> GetAll(IndexModel model)
        {
            try
            {
                PagedData<ClientModuleViewDetail> responseList = new PagedData<ClientModuleViewDetail>();
                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                PagedData<vwClientModuleDetail> objList = GenericGridCall<vwClientModuleDetail>.ListView(model.PageSize, x => x.Id,x=> depIds.Contains(x.DepartmentCode), model.Search, model.OrderBy, model.OrderByAsc, model.Page);

              
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwClientModuleDetail, ClientModuleViewDetail>();
                });
                IMapper mapper = config.CreateMapper();
                responseList.Data = mapper.Map(objList.Data, responseList.Data);
                responseList.TotalRecords = objList.TotalRecords;

                return SetResultStatus<PagedData<ClientModuleViewDetail>>(responseList, MessageStatus.Success, true);
            }
            catch (Exception ex)
            {
                return SetResultStatus<PagedData<ClientModuleViewDetail>>(null, MessageStatus.Error, false);
            }

        }

        public async Task<ServiceResponse<ClientModuleViewDetail>> GetById(long id)
        {
            try
            {
                vwClientModuleDetail obj = await _uow.GenericRepository<vwClientModuleDetail>().GetByIdAsync(id);
                ClientModuleViewDetail model = new ClientModuleViewDetail();
                var config = new MapperConfiguration(cfg =>
                {
                    cfg.CreateMap<vwClientModuleDetail, ClientModuleViewDetail>();
                });
                IMapper mapper = config.CreateMapper();
                model = mapper.Map(obj, model);

                return SetResultStatus(model, MessageStatus.Success, true);
            }
            catch(Exception ex)
            {
                return SetResultStatus<ClientModuleViewDetail>(null, MessageStatus.Error, false);
            }

        }

        public Boolean IsModuleAvailableForDepartment(List<string> moduleName, int dptCode, long clientIdForServiceid = 0)
        {
            try
            {
                List<UserDepartmentViewModel> dep = _userManagementService.GetDepartmentByUserId(_loginUserDetail.UserId).Data;
                var depIds = new List<int?>(dep.Select(x => x.DepartmentCode).ToList());

                foreach (var item in moduleName)
                {
                    if (moduleName != null && moduleName.Count > 0)
                    {
                        List<vwClientModuleDetail> obj = _uow.GenericRepository<vwClientModuleDetail>().GetAll(filter: x => x.DepartmentCode== dptCode && (x.moduleIds.Contains(item)) && (clientIdForServiceid > 0 ? x.Id != clientIdForServiceid : true)).ToList();
                        if (obj.Count > 0)
                        {
                            return false;
                        }
                    }
                    
                    //var mName = Convert.ToInt64(item);
                    //List<tblClientIdModuleMapping> obj = _uow.GenericRepository<tblClientIdModuleMapping>().GetAll(filter: x => x.ModuleCode == mName && (clientIdForServiceid > 0 ? x.ClientIdForService != clientIdForServiceid : true)).ToList();
                    //if (obj.Count > 0)
                    //{
                    //    return false;
                    //}
                }
                return true;
            }
            catch(Exception ex)
            {
                return false;
            }
        }

    }
}
