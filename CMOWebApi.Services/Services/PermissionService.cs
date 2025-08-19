using AutoMapper;
using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Models.LoginModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class PermissionService : BaseService, IPermissionService
    {

        IUnitofWork _uow;
        public PermissionService(IUnitofWork uow)
        {
            _uow = uow;
        }

        //public ServiceResponse<PagedData<GetRolePermissions_Result>> GetAll(IndexModel model, object[] @sp_params)
        //{
        //    ServiceResponse<PagedData<GetRolePermissions_Result>> objReturn = new ServiceResponse<PagedData<GetRolePermissions_Result>>();
        //    try
        //    {
        //        var data = CMOWebApi.Services.ServiceHelper.GenericGridCall<GetRolePermissions_Result>.ListView(@sp_params, model.PageSize, x => x.LastModifiedDate, model.Search, model.orderBy, model.orderByAsc, model.page);
        //        PagedData<GetRolePermissions_Result>.ReturnCustomizeData(data, model.PageSize, columnNames: new string[] { "SystemFunctionalityID", "FunctionalityName", "IsAdd", "IsEdit", "IsDelete", "IsView" }, headersName: new string[] { "Id", "Functionality Name", "Add", "Edit", "Delete", "View" }, PageTitle: "Permission Managment", showAction: false, IsHrefRequired: false);
        //        objReturn = SetResultStatus(data, MessageStatus.Success, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<PagedData<GetRolePermissions_Result>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public ServiceResponse<tblRoleFunctionality> GetById(string Roleid, int id)
        //{
        //    ServiceResponse<tblRoleFunctionality> objReturn = new ServiceResponse<tblRoleFunctionality>();
        //    try
        //    {
        //        tblRoleFunctionality Assignerole = _uow.GenericRepository<tblRoleFunctionality>().GetAll().Where(x => x.RoleID == Roleid && x.SystemFunctionalityID == id).FirstOrDefault();
        //        objReturn = Assignerole != null ? SetResultStatus(Assignerole, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblRoleFunctionality>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<tblRoleFunctionality>> Create(tblRoleFunctionality model)
        //{
        //    ServiceResponse<tblRoleFunctionality> objReturn = new ServiceResponse<tblRoleFunctionality>();
        //    try
        //    {
        //        model.IsImport = false;
        //        model.IsExport = false;
        //        model.LastModifiedDate = DateTime.UtcNow;
        //        Mapper.Initialize(x =>
        //        {
        //            x.CreateMap<tblRoleFunctionality, tblRoleFunctionality>();
        //        });

        //        var Assignerole = Mapper.Map<tblRoleFunctionality, tblRoleFunctionality>(model);
        //        await _uow.GenericRepository<tblRoleFunctionality>().AddAsync(Assignerole);

        //        _uow.save();
        //        objReturn = SetResultStatus(Assignerole, MessageStatus.Create, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblRoleFunctionality>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<tblRoleFunctionality>> Edit(tblRoleFunctionality model)
        //{
        //    ServiceResponse<tblRoleFunctionality> objReturn = new ServiceResponse<tblRoleFunctionality>();
        //    try
        //    {

        //        await _uow.GenericRepository<tblRoleFunctionality>().UpdateAsync(model);
        //        _uow.save();
        //        objReturn = SetResultStatus(model, MessageStatus.Update, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblRoleFunctionality>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public ServiceResponse<tblPermission> GetPermissionByName(string PermissionDescription)
        //{
        //    ServiceResponse<tblPermission> objReturn = new ServiceResponse<tblPermission>();
        //    try
        //    {
        //        tblPermission Assignerole = _uow.GenericRepository<tblPermission>().GetAll().Where(x => x.PermissionDescription == PermissionDescription).FirstOrDefault();
        //        objReturn = Assignerole != null ? SetResultStatus(Assignerole, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblPermission>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<tblPermission>> AddPermission(tblPermission model)
        //{
        //    ServiceResponse<tblPermission> objReturn = new ServiceResponse<tblPermission>();
        //    try
        //    {

        //        Mapper.Initialize(x =>
        //        {
        //            x.CreateMap<tblPermission, tblPermission>();
        //        });

        //        var Assignerole = Mapper.Map<tblPermission, tblPermission>(model);
        //        await _uow.GenericRepository<tblPermission>().AddAsync(Assignerole);

        //        _uow.save();
        //        objReturn = SetResultStatus(Assignerole, MessageStatus.Create, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblPermission>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public ServiceResponse<PagedData<tblPermission>> GetAllPermission(IndexModel model)
        //{
        //    ServiceResponse<PagedData<tblPermission>> objReturn = new ServiceResponse<PagedData<tblPermission>>();
        //    try
        //    {
        //        var data = CMOWebApi.Services.ServiceHelper.GenericGridCall<tblPermission>.ListView(model.PageSize, x => x.PermissionDescription, null, model.Search, model.orderBy, model.orderByAsc, model.page);
        //        PagedData<tblPermission>.ReturnCustomizeData(data, model.PageSize, columnNames: new string[] { "Permission_id", "PermissionDescription" }, headersName: new string[] { "Id", "Permission Description" }, PageTitle: "Permission Managment", showAction: true, showDetailButton: true, showEditButton: true, showDeleteButton: false, IsHrefRequired: false, AddButtonText: "Sync Permission");
        //        objReturn = SetResultStatus(data, MessageStatus.Success, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<PagedData<tblPermission>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<tblPermission>> GetPermissionById(int id)
        //{
        //    ServiceResponse<tblPermission> objReturn = new ServiceResponse<tblPermission>();
        //    try
        //    {
        //        tblPermission Permission = await _uow.GenericRepository<tblPermission>().GetByIdAsync(id);
        //        objReturn = Permission != null ? SetResultStatus(Permission, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblPermission>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<tblPermission>> Edit(tblPermission model)
        //{
        //    ServiceResponse<tblPermission> objReturn = new ServiceResponse<tblPermission>();
        //    try
        //    {

        //        await _uow.GenericRepository<tblPermission>().UpdateAsync(model);
        //        _uow.save();
        //        objReturn = SetResultStatus(model, MessageStatus.Update, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblPermission>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
    }
}
