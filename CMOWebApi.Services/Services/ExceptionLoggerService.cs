using CMOWebApi.Core;
using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Models.GeneralModel;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CMOWebApi.Services.Services
{
    public class ExceptionLoggerService : BaseService, IExceptionLoggerService
    {
        IUnitofWork _uow;
        public ExceptionLoggerService(IUnitofWork uow)
        {
            _uow = uow;
        }
        //public ServiceResponse<PagedData<ExceptionLogger>> GetAll(IndexModel model)
        //{
        //    ServiceResponse<PagedData<ExceptionLogger>> objReturn = new ServiceResponse<PagedData<ExceptionLogger>>();
        //    try
        //    {
        //        var data = GenericGridCall<ExceptionLogger>.ListView(model.PageSize, x => x.Id, null, model.Search, model.orderBy, model.orderByAsc, model.page);
        //        //PagedData<ExceptionLogger>.ReturnCustomizeData(data, model.PageSize, columnNames: new string[] { "Id", "ExceptionId", "ExceptionType", "LogDate", "IsResolved" }, PageTitle: "Exception", headersName: new string[] { "Id", "Reference Number", "Exception Type", "Exception Date", "Resolved" }, showDeleteButton: false, showAddButton: false);
        //        PagedData<ExceptionLogger>.ReturnCustomizeData(data, model.PageSize, columnNames: new string[] { "Id", "ExceptionId", "ExceptionType","ExceptionSource", "LogDate", "IsResolved" }, PageTitle: "Manage Exception", headersName: new string[] { "Id", "Reference Number", "Exception Type","Exception Source", "Exception Date", "Resolved" }, showDeleteButton: false, showAddButton: false);
        //        objReturn = SetResultStatus(data, MessageStatus.Success, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<PagedData<ExceptionLogger>>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}

        //public async Task<ServiceResponse<ExceptionLogger>> GetById(Int64 id)
        //{
        //    ServiceResponse<ExceptionLogger> objReturn = new ServiceResponse<ExceptionLogger>();
        //    try
        //    {
        //        ExceptionLogger user = await _uow.GenericRepository<ExceptionLogger>().GetByIdAsync(id);
        //        objReturn = user != null ? SetResultStatus(user, MessageStatus.Success, true) : null;
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<ExceptionLogger>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;

        //}

        //public async Task<ServiceResponse<ExceptionLogger>> Edit(ExceptionLogger model)
        //{
        //    ServiceResponse<ExceptionLogger> objReturn = new ServiceResponse<ExceptionLogger>();
        //    try
        //    {
        //        var updateModel = _uow.GenericRepository<ExceptionLogger>().GetByID(model.Id);
        //        updateModel.IsResolved = model.IsResolved;
        //        await _uow.GenericRepository<ExceptionLogger>().UpdateAsync(updateModel);
        //        _uow.save();
        //        objReturn = SetResultStatus(model, MessageStatus.Update, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<ExceptionLogger>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
    }
}
