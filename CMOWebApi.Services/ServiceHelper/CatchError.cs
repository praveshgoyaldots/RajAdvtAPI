using CMOWebApi.Data;
using CMOWebApi.Data.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace CMOWebApi.Services.ServiceHelper
{
    public class CatchError
    {
        //public void HandleError(Exception e, HttpException ex, HttpServerUtility Server)
        //{
        //    int errorCode = 0;
        //    errorCode = ex != null ? ex.GetHttpCode() : errorCode;
        //    try
        //    {
        //        switch (errorCode)
        //        {
        //            case 401:
        //                Server.ClearError();
        //                HttpContext.Current.Response.Redirect("~/Error/Unauthorized");
        //                break;
        //            case 403:
        //                Server.ClearError();
        //                HttpContext.Current.Response.Redirect("~/Error/Forbidden");
        //                break;
        //            case 404:
        //                Server.ClearError();
        //                HttpContext.Current.Response.Redirect("~/Error/NotFound");
        //                break;
        //            default:
        //                ExceptionLogger logger = new ExceptionLogger()
        //                {
        //                    ExceptionId = Guid.NewGuid(),
        //                    ExceptionMessage = e.InnerException != null ? e.InnerException.Message : e.Message,
        //                    ExceptionSource = e.Source,
        //                    ExceptionType = e.GetType().Name,
        //                    Url = HttpContext.Current.Request.Url.AbsoluteUri,
        //                    LogDate = DateTime.Now,
        //                    IsResolved = false
        //                };
        //                Server.ClearError();
        //                IUnitofWork _uow = new UnitOfWork(new CMOWebApiEntities());
        //                _uow.GenericRepository<ExceptionLogger>().Add(logger);
        //                _uow.save();
        //                HttpContext.Current.Response.Redirect("~/Error/ErrorPage?ID=" + logger.ExceptionId);
        //                break;
        //        }
        //    }
        //    catch
        //    {
        //        //Log error instead of database
        //    }
        //}
    }
}
