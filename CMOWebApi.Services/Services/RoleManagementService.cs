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
using System.Data.Entity.Validation;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class RoleManagementService : BaseService //, IRoleManagementService
    {
        IUnitofWork _uow;
        public RoleManagementService(IUnitofWork uow)
        {
            _uow = uow;
        }
        //public ServiceResponse<PagedData<AspNetRole>> GetAll(IndexModel model, int Rolelevel)
        //{
        //    ServiceResponse<PagedData<AspNetRole>> objReturn = new ServiceResponse<PagedData<AspNetRole>>();

        //    try
        //    {

        //        //var data = GenericGridCall<AspNetRole>.ListView(model.PageSize, x => x.Name, x => x.RoleLevel > Rolelevel, model.Search, model.orderBy, model.orderByAsc, model.page);
        //        var data = GenericGridCall<AspNetRole>.ListView(model.PageSize, x => x.Name, model.Search, model.orderBy, model.orderByAsc, model.page);
        //        PagedData<AspNetRole>.ReturnCustomizeData(data, model.PageSize, columnNames: new string[] { "Id", "Name", "Allowtologin" }, headersName: new string[] { "Id", "Name", "Allow to login" }, PageTitle: "Role Management", isEditable: false, IsHrefRequired: true, showAction: true, showDetailButton: true, showDeleteButton: false, showEditButton: false, DetailUrl: "/Admin/RoleManagement/Detail/", hrefForActiveDeactive: "Admin/RoleManagement/AllowRole/");
        //        objReturn = SetResultStatus(data, MessageStatus.Success, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<PagedData<AspNetRole>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
        //public async Task<ServiceResponse<AspNetRole>> Create(AspNetRoleViewModel model)
        //{
        //    ServiceResponse<AspNetRole> objReturn = new ServiceResponse<AspNetRole>();
        //    try
        //    {
        //        model.IsSysAdmin = false;

        //        Mapper.Initialize(x =>
        //        {
        //            x.CreateMap<AspNetRoleViewModel, AspNetRole>();
        //        });
        //        var obj = Mapper.Map<AspNetRoleViewModel, AspNetRole>(model);
                
        //        obj.Id = Guid.NewGuid().ToString();
        //        obj.Discriminator = "AspNetRoleExpend";
        //        await _uow.GenericRepository<AspNetRole>().AddAsync(obj);
        //        _uow.save();
        //        objReturn = SetResultStatus(obj, MessageStatus.Create, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<AspNetRole>(null, MessageStatus.Error, false);
               
        //    }
            
        //    return objReturn;
        //}
        //public async Task<ServiceResponse<AspNetRole>> GetById(string id)
        //{
        //    ServiceResponse<AspNetRole> objReturn = new ServiceResponse<AspNetRole>();
        //    try
        //    {
        //        AspNetRole user = await _uow.GenericRepository<AspNetRole>().GetByIdAsync(id);
        //        objReturn = user != null ? SetResultStatus(user, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<AspNetRole>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
        //public async Task<ServiceResponse<AspNetRole>> Edit(AspNetRole model)
        //{
        //    ServiceResponse<AspNetRole> objReturn = new ServiceResponse<AspNetRole>();
        //    try
        //    {
        //        await _uow.GenericRepository<AspNetRole>().UpdateAsync(model);
        //        _uow.save();
        //        objReturn = SetResultStatus(model, MessageStatus.Update, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<AspNetRole>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
        //public async Task<ServiceResponse<AspNetRole>> Delete(AspNetRole model)
        //{
        //    ServiceResponse<AspNetRole> objReturn = new ServiceResponse<AspNetRole>();
        //    AspNetRole cObj = await _uow.GenericRepository<AspNetRole>().GetByIdAsync(model.Id);
        //    try
        //    {
        //        await _uow.GenericRepository<AspNetRole>().DeleteAsync(cObj);
        //        _uow.save();
        //        objReturn = SetResultStatus(cObj, MessageStatus.Delete, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus(cObj, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
        //public ServiceResponse<AspNetRole> FindByName(string RoleName)
        //{
        //    ServiceResponse<AspNetRole> objReturn = new ServiceResponse<AspNetRole>();
        //    AspNetRole cObj = _uow.GenericRepository<AspNetRole>().GetAll().Where(x => x.Name.ToLower() == RoleName.Trim().ToLower()).FirstOrDefault();
        //    objReturn = SetResultStatus(cObj, MessageStatus.Delete, true);
        //    return objReturn;
        //}

        //public bool IsRoleAllowtoLogin(string[] RoleName)
        //{
        //    var roles = _uow.GenericRepository<AspNetRole>().GetAll().Where(x => RoleName.Contains(x.Name.ToLower()))
        //        .FirstOrDefault();
        //    return roles!=null?roles.Allowtologin.Value:false;

        //    //foreach (var item in RoleName.Split(','))
        //    //{
        //    //    var User = _RoleService.FindByName(item);
        //    //    if (User.Data != null)
        //    //    {
        //    //        if (User.Data.Allowtologin == true)
        //    //        {
        //    //            IsAllowed = true;
        //    //            return IsAllowed;
        //    //        }
        //    //        else if (User.Data.Allowtologin == false)
        //    //        {
        //    //            IsAllowed = false;
        //    //        }
        //    //        else
        //    //        {
        //    //            return IsAllowed = false;
        //    //        }
        //    //    }
        //    //}
        //}

        //public ServiceResponse<List<tblSystemFunctionality>> GetAssignedRoles(string RoleID)
        //{
        //    ServiceResponse<List<tblSystemFunctionality>> objReturn = new ServiceResponse<List<tblSystemFunctionality>>();
        //    try
        //    {
        //        var cObj = _uow.GenericRepository<tblRoleFunctionality>().GetAll().Where(c => c.RoleID == RoleID && c.tblSystemFunctionality.ActiveStatus == 1).Select(t => t.tblSystemFunctionality).Distinct().OrderBy(c => c.FunctionalityOrderID).ToList();
        //        objReturn = SetResultStatus(cObj, MessageStatus.Delete, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<List<tblSystemFunctionality>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public ServiceResponse<List<AspNetRole>> GetAlRoles()
        //{
        //    ServiceResponse<List<AspNetRole>> objReturn = new ServiceResponse<List<AspNetRole>>();
        //    try
        //    {
        //        var cObj = _uow.GenericRepository<AspNetRole>().GetAll().OrderBy(x => x.RoleLevel).ToList();
        //        objReturn = SetResultStatus(cObj, MessageStatus.Delete, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<List<AspNetRole>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
    }
}
