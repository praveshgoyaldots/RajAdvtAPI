using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Services.IServices;
using CMOWebApi.Services.ServiceHelper;

namespace CMOWebApi.Services.Services
{
    public class ExceptionLog:BaseService,IExceptionLogService
    {
        IUnitofWork _uow;
        public ExceptionLog(IUnitofWork uow)
        {
            _uow = uow;
        }

        //public ServiceResponse<ExceptionLogger> Create(ExceptionLogger log)
        //{
        //    ServiceResponse<ExceptionLogger> objReturn = new ServiceResponse<ExceptionLogger>();
        //    try
        //    {
        //        _uow.GenericRepository<ExceptionLogger>().Add(log);
        //        _uow.save();
        //        objReturn = SetResultStatus(log, MessageStatus.Create, true);
        //    }
        //    catch
        //    {
        //        objReturn = SetResultStatus<ExceptionLogger>(null, MessageStatus.Error, false);
        //    }
        //    return objReturn;
        //}
    }
}
