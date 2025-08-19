using System;
using System.Web.Mvc;
using CMOWebApi.Data;
using Microsoft.AspNet.Identity;
using CMOWebApi.Services.IServices;
using CMOWebApi.Data.UnitOfWork;
using CMOWebApi.Services.Services;
using System.Web;

namespace CMOWebApi.Services.ServiceHelper
{
    public class CustomActionFilter : ActionFilterAttribute, IActionFilter
    {
        private readonly bool _ignore;
        public UnitOfWork _uow;
        public IActivityLogService _iActivityLogService;
        public IExceptionLogService _iExceptionLogService;
        public ISettingsService _iSettingsService;
        //public CustomActionFilter(bool? ignore = true)
        //{
        //    _uow = new UnitOfWork(new CMOWebApiEntities());
        //    _iActivityLogService = new ActivityLogService(_uow);
        //    _iExceptionLogService = new ExceptionLog(_uow);
        //    _iSettingsService = new SettingsService(_uow);
        //     this._ignore = ignore.Value;
        //}
         
         
        //public override void OnActionExecuted(ActionExecutedContext filterContext)
        //{
        //    if (filterContext == null || filterContext.HttpContext == null)
        //        return;
        //    if (_ignore)
        //        return;
        //    string userID = filterContext.HttpContext.User.Identity.GetUserId();
        //    if (userID != null)
        //    {
        //        bool isLogSettingActive = _iSettingsService.IsExistActivitySetting(userID);
        //        if (isLogSettingActive)
        //        {
        //            string url = filterContext.HttpContext.Request.Url.ToString();
        //            string methodType = filterContext.HttpContext.Request.HttpMethod.ToString();
        //            string area = string.Empty;
        //            if (HttpContext.Current.Request.RequestContext.RouteData.DataTokens["area"] != null)
        //            {
        //                area = HttpContext.Current.Request.RequestContext.RouteData.DataTokens["area"].ToString() + "/";
        //            }
        //            string routeInfo = area + filterContext.ActionDescriptor.ControllerDescriptor.ControllerName + "/" + filterContext.ActionDescriptor.ActionName + "(" + methodType + ")";

        //            var log = InsertActivityLog(filterContext, routeInfo, url, userID);

        //            if (filterContext.Exception != null)
        //            {
        //                InsertExceptionLog(filterContext, log);
        //            }
        //        }
        //    }
        //    base.OnActionExecuted(filterContext);
        //}

        //public override void OnResultExecuted(ResultExecutedContext filterContext)
        //{
        //    string userID = filterContext.HttpContext.User.Identity.GetUserId();
        //    if (userID != null)
        //    {
        //        bool isLogSettingActive = _iSettingsService.IsExistActivitySetting(userID);
        //        if (isLogSettingActive)
        //        {
        //            string url = filterContext.HttpContext.Request.Url.ToString();
        //            string methodType = filterContext.HttpContext.Request.HttpMethod.ToString();
        //            string area = string.Empty;
        //            if (HttpContext.Current.Request.RequestContext.RouteData.DataTokens["area"] != null)
        //            {
        //                area = HttpContext.Current.Request.RequestContext.RouteData.DataTokens["area"].ToString() + "/";
        //            }
        //            string routeInfo = area + (string)filterContext.RouteData.Values["controller"] + "/" + (string)filterContext.RouteData.Values["action"] + "(" + methodType + ")";

        //            var log = InsertActivityLog(filterContext, routeInfo, url, userID);

        //            if (filterContext.Exception != null)
        //            {
        //                InsertExceptionLog(filterContext, log);
        //            }

        //        }
        //    }
        //    base.OnResultExecuted(filterContext);
        //}

        //private tblActivityLog InsertActivityLog(dynamic filterContext, string routeInfo, string url, string userID)
        //{
        //    tblActivityLog log = new tblActivityLog()
        //    {
        //        UserID = userID,
        //        AccessArea = routeInfo,
        //        AccessPath = url,
        //        DateAndTime = filterContext.HttpContext.Timestamp,
        //        IP = filterContext.HttpContext.Request.UserHostAddress,
        //        IsSuccess = filterContext.Exception == null ? true : false,
        //        ExceptionId = filterContext.Exception == null ? Guid.Empty : Guid.NewGuid(),
        //        Browser = filterContext.HttpContext.Request.Browser.Browser.ToString() + " " + filterContext.HttpContext.Request.Browser.Version.ToString()
        //    };
        //    _iActivityLogService.Create(log);
        //    return log;
        //}
        //private void InsertExceptionLog(dynamic filterContext, tblActivityLog log)
        //{
        //    ExceptionLogger exlog = new ExceptionLogger
        //    {
        //        ExceptionId = log.ExceptionId.GetValueOrDefault(),
        //        ExceptionMessage = filterContext.Exception.Message,
        //        ExceptionSource = filterContext.Exception.Source,
        //        Url = log.AccessPath,
        //        LogDate = log.DateAndTime,
        //        IsResolved = false,
        //        ExceptionType = filterContext.Exception.GetBaseException().GetType().ToString()
        //    };

        //    //Amendment required in this logic
        //    CMOWebApiEntities entity = new CMOWebApiEntities();
        //    entity.ExceptionLoggers.Add(exlog);
        //    entity.SaveChanges();
        //}
    }
}
