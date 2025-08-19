using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Core;
using CMOWebApi.Models.AdminModel;
using AutoMapper;

namespace CMOWebApi.Services.Services
{
    public class SettingsService : BaseService //, ISettingsService
    {
        IUnitofWork _uow;

        public SettingsService(IUnitofWork uow)
        {
            _uow = uow;
        }

        //public ServiceResponse<List<tblSetting>> GetAll()
        //{
        //    ServiceResponse<List<tblSetting>> objReturn = new ServiceResponse<List<tblSetting>>();

        //    var data = _uow.GenericRepository<tblSetting>().GetAll().OrderByDescending(t => t.Id).ToList();
        //    objReturn = SetResultStatus(data, MessageStatus.Success, true);

        //    return objReturn;
        //}
        //public async Task<ServiceResponse<tblSetting>> Create(tblSetting model)
        //{
        //    ServiceResponse<tblSetting> objReturn = new ServiceResponse<tblSetting>();
        //    try
        //    {
        //        await _uow.GenericRepository<tblSetting>().AddAsync(model);
        //        _uow.save();
        //        objReturn = SetResultStatus(model, MessageStatus.Create, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblSetting>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<tblSetting>> Create(SettingViewModel model)
        //{
        //    ServiceResponse<tblSetting> objReturn = new ServiceResponse<tblSetting>();
        //    try
        //    {

        //        Mapper.Initialize(x =>
        //        {
        //            x.CreateMap<MenuViewModel, tblSetting>();
        //        });
        //        var menu = Mapper.Map<SettingViewModel, tblSetting>(model);
        //        await _uow.GenericRepository<tblSetting>().AddAsync(menu);
        //        _uow.save();
        //        objReturn = SetResultStatus(menu, MessageStatus.Create, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblSetting>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}


        //public async Task<ServiceResponse<tblSetting>> Insert(SettingViewModel model)
        //{
        //    ServiceResponse<tblSetting> objReturn = new ServiceResponse<tblSetting>();
        //    try
        //    {

        //        Mapper.Initialize(x =>
        //        {
        //            x.CreateMap<SettingViewModel, tblSetting>();
        //        });
        //        var setting = Mapper.Map<SettingViewModel, tblSetting>(model);
        //        await _uow.GenericRepository<tblSetting>().AddAsync(setting);
        //        _uow.save();
        //        objReturn = SetResultStatus(setting, MessageStatus.Create, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblSetting>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}


        //public async Task<ServiceResponse<tblSetting>> Update(tblSetting model)
        //{
        //    ServiceResponse<tblSetting> objReturn = new ServiceResponse<tblSetting>();
        //    try
        //    {
        //        await _uow.GenericRepository<tblSetting>().UpdateAsync(model);
        //        _uow.save();
        //        objReturn = SetResultStatus(model, MessageStatus.Update, true);

        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblSetting>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}


        //public ServiceResponse<tblSetting> GetById(int id)
        //{
        //    ServiceResponse<tblSetting> objReturn = new ServiceResponse<tblSetting>();
        //    try
        //    {
        //        tblSetting set = _uow.GenericRepository<tblSetting>().GetByID(id);
        //        objReturn = set != null ? SetResultStatus(set, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblSetting>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;

        //}

        //public async Task<ServiceResponse<tblSetting>> Edit(tblSetting model)
        //{
        //    ServiceResponse<tblSetting> objReturn = new ServiceResponse<tblSetting>();
        //    try
        //    {
        //        await _uow.GenericRepository<tblSetting>().UpdateAsync(model);
        //        _uow.save();
        //        objReturn = SetResultStatus(model, MessageStatus.Update, true);

        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<tblSetting>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
        public bool IsExistActivitySetting(string userID)
        {
            //TODO:
            // CMOWebApiEntities _context = new CMOWebApiEntities();
            // var userSet = _context.tblSettings.Where(a => a.UserId == userID).FirstOrDefault();
            //var userSet = _uow.GenericRepository<tblSetting>().GetAll().Where(a => a.UserId == userID).FirstOrDefault();
            //if (userSet != null && userSet.IsMaintainLog)
            //{
            //    return true;
            //}
            //else
            //{
            return false;
            //}
        }
    }
}
