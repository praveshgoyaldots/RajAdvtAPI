using MultipartDataMediaFormatter;
using MultipartDataMediaFormatter.Infrastructure;
using System.Web.Http;
using System.Web.Mvc;

namespace CMOWebApi.WebAPI.Areas.VIPLMS
{
    public class VIPLMSAreaRegistration : AreaRegistration 
    {
        public override string AreaName 
        {
            get 
            {
                return "VIPLMS";
            }
        }

        public override void RegisterArea(AreaRegistrationContext context) 
        {
            //context.MapRoute(
            //    "VIPLMS_default",
            //    "VIPLMS/{controller}/{action}/{id}",
            //    new { action = "Index", id = UrlParameter.Optional }
            //);

            GlobalConfiguration.Configuration.Formatters.Add(new FormMultipartEncodedMediaTypeFormatter(new MultipartFormatterSettings()));
            context.Routes.MapHttpRoute(
               name: "VIPLMS_default",
               routeTemplate: "VIPLMS/{controller}/{action}/{id}",
               defaults: new { id = RouteParameter.Optional }
           );
        }
    }
}