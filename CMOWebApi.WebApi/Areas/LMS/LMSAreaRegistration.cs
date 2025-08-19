using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.LMS
{
    public class LMSAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "LMS";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            //context.MapRoute(
            //    "LMS_default",
            //    "LMS/{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional }
            //);

            GlobalConfiguration.Configuration.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
            context.Routes.MapHttpRoute(
               name: "LMS_default",
               routeTemplate: "LMS/{controller}/{action}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );
        }

    }
}