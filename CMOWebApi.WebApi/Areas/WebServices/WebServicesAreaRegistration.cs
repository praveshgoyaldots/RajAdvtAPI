using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.WebServices
{
    public class WebServicesAreaRegistration : AreaRegistration
    {
        public override string AreaName
        {
            get
            {
                return "WebServices";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context)
        {
            GlobalConfiguration.Configuration.Formatters.Add
(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
            context.Routes.MapHttpRoute(
               name: "WebServices_default",
               routeTemplate: "WebServices/{controller}/{action}/{id}",
               defaults: new
               {
                   id = RouteParameter.Optional
               });
        }
    }
}